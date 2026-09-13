import instance from '@/api/core/instance';

export const getSponsor = (sponsorId) => {
  return instance.get(`/api/admin/sponsors/${sponsorId}`);
};

export const updateSponsor = (sponsorId, payload) => {
  return instance.patch(`/api/admin/sponsors/${sponsorId}`, payload);
};

export const deleteSponsor = (sponsorId) => {
  return instance.delete(`/api/admin/sponsors/${sponsorId}`);
};

export const getSponsorProductGroup = (sponsorId, groupId) => {
  return instance.get(
    `/api/admin/sponsors/${sponsorId}/product-groups/${groupId}`,
  );
};

export const createSponsorProductGroup = (sponsorId, payload) => {
  return instance.post(
    `/api/admin/sponsors/${sponsorId}/product-groups`,
    payload,
    {
      skipErrorModal: true,
    },
  );
};

export const updateSponsorProductGroup = (sponsorId, groupId, payload) => {
  return instance.patch(
    `/api/admin/sponsors/${sponsorId}/product-groups/${groupId}`,
    payload,
  );
};

export const deleteSponsorProductGroup = (sponsorId, groupId) => {
  return instance.delete(
    `/api/admin/sponsors/${sponsorId}/product-groups/${groupId}`,
  );
};

export const getSponsorProduct = (sponsorId, productId) => {
  return instance.get(`/api/admin/sponsors/${sponsorId}/products/${productId}`);
};

export const createSponsorProduct = (sponsorId, payload) => {
  return instance.post(`/api/admin/sponsors/${sponsorId}/products`, payload, {
    skipErrorModal: true,
  });
};

export const updateSponsorProduct = (sponsorId, productId, payload) => {
  return instance.patch(
    `/api/admin/sponsors/${sponsorId}/products/${productId}`,
    payload,
  );
};

export const deleteSponsorProduct = (sponsorId, productId) => {
  return instance.delete(
    `/api/admin/sponsors/${sponsorId}/products/${productId}`,
  );
};
