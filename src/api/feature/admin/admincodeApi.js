import instance from '../../core/instance';

export const admincodeApi = {
  adminVerify: (password) => instance.post('/api/admin/verify', { password }),
};
