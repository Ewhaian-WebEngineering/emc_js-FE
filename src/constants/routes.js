export const TAB_ROUTES = {
  HOME: '/',
  EVENT: '/event',
  BOOTH: '/booth',
  SCRAP: '/scrap',
  MY: '/my',
};

export const EVENT_ROUTES = {
  LIST: '/event',
  DETAIL: (id) => `/event/${id}`,
};

export const BOOTH_ROUTES = {
  DETAIL: (boothId) => `/booth/${boothId}`,
  NOTICE: (boothId) => `/booth/${boothId}/notice`,
};

export const MAP_ROUTE = '/map';

export const SEARCH_ROUTES = {
  SEARCH: '/search',
  SEARCH_RESULT: '/search/result',
};

export const ADMIN_ROUTES = {
  CODE: '/admin',
  BANNER: '/admin/banner',
  BANNEREDIT: (bannerId) => `/admin/banner/${bannerId}/edit`,
  DASHBOARD: '/admin/dashboard',
};

export const NOTICE_ROUTE = '/notice';

export const SPONSOR_ROUTES = {
  LIST: '/sponsor',
  DETAIL: (sponsorId) => `/sponsor/${sponsorId}`,
};

export const MAKERS_ROUTES = {
  LIST: '/makers',
};

export const MANAGE_ROUTES = {
  BOOTH_PREVIEW: (boothId) => `/booth/${boothId}/preview`,
  BOOTH_EDIT: (boothId) => `/booth/${boothId}/edit`,
};

export const EMC_INTRODUCTION_ROUTE = '/emc';

export const SELLER_ROUTES = {
  CODE: '/seller',
};
