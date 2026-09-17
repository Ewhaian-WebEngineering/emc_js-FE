import instance from '@/api/core/instance';

export const getBoothList = ({ category, sort, time, cursor, limit = 20 }) => {
  return instance.get('/api/booths', {
    params: { category, sort, time, cursor, limit },
  });
};

export const getBoothDetail = (boothId) => {
  return instance.get(`/api/booths/${boothId}`);
};

export const getMyBoothData = async (boothId) => {
  const booth = await instance.get('/api/seller/booth', {
    params: boothId ? { boothId } : undefined,
  });

  const latestNotice = [...(booth.notices ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )[0];

  return { ...booth, latestNotice };
};

export const updateMyBoothData = (payload, boothId) => {
  return instance.patch('/api/seller/booth', payload, {
    params: boothId ? { boothId } : undefined,
  });
};

export const getNotices = (bid) => {
  return instance.get(`/api/booths/${bid}/notices`);
};

export const createNotice = ({ title, content }, boothId) => {
  return instance.post(
    '/api/seller/notices',
    { title, content },
    {
      params: boothId ? { boothId } : undefined,
    },
  );
};

export const updateNotice = ({ nid, title, content }, boothId) => {
  return instance.patch(
    `/api/seller/notices/${nid}`,
    { title, content },
    {
      params: boothId ? { boothId } : undefined,
    },
  );
};

export const deleteNotice = (nid, boothId) => {
  return instance.delete(`/api/seller/notices/${nid}`, {
    params: boothId ? { boothId } : undefined,
  });
};
