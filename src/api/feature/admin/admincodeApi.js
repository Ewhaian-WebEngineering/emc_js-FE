import instance from '../../core/instance';

export const adminCodeApi = {
  adminVerify: (password) => instance.post('/api/admin/verify', { password }),
};
