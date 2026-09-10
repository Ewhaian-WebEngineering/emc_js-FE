import instance from '@/api/core/instance';

export const getBoothList = ({ category, sort, time, cursor, limit = 20 }) => {
  return instance.get('/api/booths', {
    params: { category, sort, time, cursor, limit },
  });
};

export const getBoothDetail = (boothId) => {
  return instance.get(`/api/booths/${boothId}`);
};

export const toggleBoothScrap = (boothId) => {
  return instance.post(`/api/booths/${boothId}/scrap`);
};

export const getNotices = (bid) => {
  return instance.get(`/api/booths/${bid}/notices`);
};

export const createNotice = ({ title, content }) => {
  return instance.post('/api/seller/notices', { title, content });
};

export const updateNotice = ({ nid, title, content }) => {
  return instance.patch(`/api/seller/notices/${nid}`, { title, content });
};

export const deleteNotice = (nid) => {
  return instance.delete(`/api/seller/notices/${nid}`);
};
