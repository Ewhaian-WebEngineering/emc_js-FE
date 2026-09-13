import instance from '../../core/instance';

export const getAdminDashboardApi = async () => {
  return instance.get('/api/admin/dashboard');
};

export const updateCongestionApi = async ({ level }) => {
  return instance.patch('/api/admin/congestion', { level });
};

export const deleteEventApi = async ({ eid }) => {
  return instance.delete(`/api/admin/events/${eid}`);
};

export const deleteSponsorApi = async ({ sid }) => {
  return instance.delete(`/api/admin/sponsors/${sid}`);
};

export const deleteBannerApi = async ({ bid }) => {
  return instance.delete(`/api/admin/banners/${bid}`);
};

export const deleteFaqApi = async ({ fid }) => {
  return instance.delete(`/api/admin/faqs/${fid}`);
};
