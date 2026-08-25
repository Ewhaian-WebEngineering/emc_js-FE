import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { mockApi } from './mockApi';

// 목록 조회
export function useMockList(params) {
  return useSuspenseQuery({
    queryKey: ['mocks', params],
    queryFn: () => mockApi.getList(params),
  });
}

// 상세 조회
export function useMockDetail(mockId) {
  return useSuspenseQuery({
    queryKey: ['mocks', mockId],
    queryFn: () => mockApi.getDetail(mockId),
  });
}

// 생성
export function useCreateMock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mocks'] });
    },
  });
}

// 수정
export function useUpdateMock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mockId, payload }) => mockApi.update(mockId, payload),
    onSuccess: (_, { mockId }) => {
      queryClient.invalidateQueries({ queryKey: ['mocks'] });
      queryClient.invalidateQueries({ queryKey: ['mocks', mockId] });
    },
  });
}

// 삭제
export function useDeleteMock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mocks'] });
    },
  });
}
