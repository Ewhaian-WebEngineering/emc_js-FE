import instance from '../../core/instance';

export const createBannerApi = async ({
  title,
  imageS3Key,
  linkUrl,
  startDate,
  endDate,
  displayOrder,
}) => {
  return instance.post('/api/admin/banners', {
    title,
    imageS3Key,
    linkUrl,
    startDate,
    endDate,
    displayOrder,
  });
};

export const getBannerApi = async ({ bid }) => {
  return instance.get(`/api/banners/${bid}`);
};

export const updateBannerApi = async ({
  bid,
  title,
  imageS3Key,
  linkUrl,
  startDate,
  endDate,
  displayOrder,
}) => {
  return instance.patch(`/api/admin/banners/${bid}`, {
    title,
    imageS3Key,
    linkUrl,
    startDate,
    endDate,
    displayOrder,
  });
};
