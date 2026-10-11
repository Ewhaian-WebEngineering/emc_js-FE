import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './tokenStorage';
import { ApiError } from './errors';
import { modalStore } from './store/modalStore';
import { queryClient } from './query/queryClient';
import { PHASE_LOCKED_MODAL } from '@/constants/phase';

// 요청 인터셉터: 토큰 주입
export function attachRequestInterceptor(instance) {
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

// 재발급 중복 호출 방지
let isRefreshing = false;
let pendingQueue = [];

function resolveQueue(newToken) {
  pendingQueue.forEach((resolve) => resolve(newToken));
  pendingQueue = [];
}

// 응답 인터셉터: unwrap + 에러 공통 처리 + 401 재발급
export function attachResponseInterceptor(instance) {
  instance.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
      const { config, response } = error;

      const isTokenUnauthorized =
        response?.status === 401 &&
        response?.data?.error?.code === 'UNAUTHORIZED';

      if (isTokenUnauthorized && !config._retry) {
        config._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            pendingQueue.push((newToken) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(instance(config));
            });
          });
        }

        isRefreshing = true;
        try {
          const newToken = await reissueAccessToken();
          resolveQueue(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
          return instance(config);
        } catch (reissueError) {
          clearTokens();
          return Promise.reject(reissueError);
        } finally {
          isRefreshing = false;
        }
      }

      const apiError = ApiError.from(error);

      if (apiError.status === 403 && apiError.code === 'PHASE_LOCKED') {
        queryClient.invalidateQueries({ queryKey: ['phase'] });
        modalStore.show(PHASE_LOCKED_MODAL);
        return Promise.reject(apiError);
      }

      const MODAL_TARGET_METHODS = ['post', 'patch', 'put'];

      const shouldShowModal =
        config?.showErrorModal ??
        (MODAL_TARGET_METHODS.includes(config?.method?.toLowerCase()) &&
          !config?.skipErrorModal);

      if (shouldShowModal) {
        const customOptions =
          typeof config?.errorModal === 'function'
            ? config.errorModal(apiError)
            : config?.errorModal;

        modalStore.show({
          variant: 'alert',
          title: '등록에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          cancelText: '확인',
          onCancel: () => {},
          ...customOptions,
        });
      }

      return Promise.reject(apiError);
    },
  );
}

// 재귀 호출 방지
async function reissueAccessToken() {
  const refreshToken = getRefreshToken();

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
    { refreshToken },
  );

  const { accessToken, refreshToken: newRefreshToken } = data.data;
  setTokens({ accessToken, refreshToken: newRefreshToken });

  return accessToken;
}
