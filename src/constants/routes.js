export const TAB_ROUTES = {
  HOME: '/',
  EVENT: '/event',
  BOOTH: '/booth',
  SCRAP: '/scrap',
  MY: '/my',
};

export const MY_ROUTES = {
  // 임시용
  LOGIN: '/mylogin',
  LOGOUT: '/mylogout',
  SELLER: '/myseller',
  ADMIN: '/myadmin',
};

export const EVENT_ROUTES = {
  LIST: '/event',
  DETAIL: (id) => `/event/${id}`,
};
export const BOOTH_ROUTE = (boothId) => `/booth/${boothId}`;

export const SEARCH_ROUTES = {
  SEARCH: '/search',
  SEARCH_RESULT: '/search/result',
};

export const ADMIN_ROUTES = {
  CODE: '/admin',
};

export const NOTICE_ROUTE = '/notice';

export const SPONSOR_ROUTES = {
  LIST: '/sponsor',
  DETAIL: (id) => `/sponsor/${id}`,
};
