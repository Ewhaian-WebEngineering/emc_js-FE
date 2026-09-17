import instance from '@/api/core/instance';

export const getProduct = (productId, boothId) => {
  return instance.get(`/api/seller/products/${productId}`, {
    params: boothId ? { boothId } : undefined,
  });
};

export const createProduct = (payload, boothId) => {
  return instance.post('/api/seller/products', payload, {
    params: boothId ? { boothId } : undefined,
    skipErrorModal: true,
  });
};

export const updateProduct = (productId, payload, boothId) => {
  return instance.patch(`/api/seller/products/${productId}`, payload, {
    params: boothId ? { boothId } : undefined,
  });
};

export const deleteProduct = (productId, boothId) => {
  return instance.delete(`/api/seller/products/${productId}`, {
    params: boothId ? { boothId } : undefined,
  });
};

export const getProductGroups = (boothId) => {
  return instance.get('/api/seller/product-groups', {
    params: boothId ? { boothId } : undefined,
  });
};

export const createProductGroup = (payload, boothId) => {
  return instance.post('/api/seller/product-groups', payload, {
    params: boothId ? { boothId } : undefined,
    skipErrorModal: true,
  });
};

export const updateProductGroup = (groupId, payload, boothId) => {
  return instance.patch(`/api/seller/product-groups/${groupId}`, payload, {
    params: boothId ? { boothId } : undefined,
  });
};

export const deleteProductGroup = (groupId, boothId) => {
  return instance.delete(`/api/seller/product-groups/${groupId}`, {
    params: boothId ? { boothId } : undefined,
  });
};
