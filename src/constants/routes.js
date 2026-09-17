export const LOGIN_ROUTE = '/login/load';

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
  REGISTER: (boothId) => `/booth/${boothId}/notice/register`,
  EDIT: (boothId, noticeId) => `/booth/${boothId}/notice/${noticeId}/edit`,
};

export const MAP_ROUTE = '/map';

export const SEARCH_ROUTES = {
  SEARCH: '/search',
  SEARCH_RESULT: '/search/result',
};

export const ADMIN_ROUTES = {
  CODE: '/admin',
  DASHBOARD: '/admin/dashboard',
  FAQ: '/admin/faq',
  FAQ_EDIT: (faqId) => `/admin/faq/${faqId}/edit`,
  BANNER: '/admin/banner',
  BANNER_EDIT: (bannerId) => `/admin/banner/${bannerId}/edit`,
  EVENT: '/admin/event',
  EVENT_EDIT: (eventId) => `/admin/event/${eventId}/edit`,
  SPONSOR_EDIT: (sponsorId) => `/admin/sponsor/${sponsorId}/edit`,
  SPONSOR_ITEM_CREATE: (sponsorId) =>
    `/admin/sponsor/${sponsorId}/item/register`,
  SPONSOR_ITEM_EDIT: (sponsorId, itemId) =>
    `/admin/sponsor/${sponsorId}/item/${itemId}/edit`,
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
  PRODUCT_CREATE: (boothId) => `/booth/${boothId}/product`,
  PRODUCT_EDIT: (boothId, productId) =>
    `/booth/${boothId}/product/${productId}/edit`,
};

export const EMC_INTRODUCTION_ROUTE = '/emc';

export const SELLER_ROUTES = {
  CODE: '/seller',
};
