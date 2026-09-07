const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'user_id';
const USER_NICKNAME_KEY = 'user_nickname';
const USER_ROLE_KEY = 'user_role';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID_KEY);
export const getUserNickname = () => localStorage.getItem(USER_NICKNAME_KEY);
export const getUserRole = () => localStorage.getItem(USER_ROLE_KEY);

export const setTokens = ({
  accessToken,
  refreshToken,
  userId,
  nickname,
  userRole,
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (userRole !== undefined) localStorage.setItem(USER_ROLE_KEY, userRole);
  if (userId !== undefined) localStorage.setItem(USER_ID_KEY, userId);
  if (nickname !== undefined) localStorage.setItem(USER_NICKNAME_KEY, nickname);
};
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NICKNAME_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
};
