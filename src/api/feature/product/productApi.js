import instance from '@/api/core/instance';

export const getProduct = (productId) => {
  return instance.get(`/api/seller/products/${productId}`);
};

export const createProduct = (payload) => {
  return instance.post('/api/seller/products', payload, {
    skipErrorModal: true,
  });
};

export const updateProduct = (productId, payload) => {
  return instance.patch(`/api/seller/products/${productId}`, payload);
};

export const deleteProduct = (productId) => {
  return instance.delete(`/api/seller/products/${productId}`);
};
