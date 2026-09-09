import instance from '../../core/instance';

export const getAdminDashboardApi = async () => {
  return instance.get('/api/admin/dashboard');
};

export const updateCongestionApi = async ({ level }) => {
  return instance.patch('/api/admin/congestion', { level });
};
