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

export const getProductGroup = (groupId) => {
  return instance.get(`/api/seller/product-groups/${groupId}`);
};

export const createProductGroup = (payload) => {
  return instance.post('/api/seller/product-groups', payload, {
    skipErrorModal: true,
  });
};

export const updateProductGroup = (groupId, payload) => {
  return instance.patch(`/api/seller/product-groups/${groupId}`, payload);
};

export const deleteProductGroup = (groupId) => {
  return instance.delete(`/api/seller/product-groups/${groupId}`);
};
