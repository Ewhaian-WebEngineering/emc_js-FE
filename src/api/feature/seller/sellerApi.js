import instance from '@/api/core/instance';

export const verifySellerCode = (sellerCode) =>
  instance.post('/api/seller/verify', { sellerCode }, { skipErrorModal: true });
