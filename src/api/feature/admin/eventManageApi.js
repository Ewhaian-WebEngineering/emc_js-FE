import instance from '../../core/instance';

export const createEventApi = async (
  {
    eventType,
    title,
    organizer,
    startDate,
    endDate,
    description,
    caution,
    imageS3Key,
    displayOrder,
  },
  config,
) => {
  return instance.post(
    '/api/admin/events',
    {
      eventType,
      title,
      organizer,
      startDate,
      endDate,
      description,
      caution,
      imageS3Key,
      displayOrder,
    },
    config,
  );
};

export const getEventApi = async ({ eid }) => {
  return instance.get(`/api/events/${eid}`);
};

export const updateEventApi = async (
  {
    eid,
    eventType,
    title,
    organizer,
    startDate,
    endDate,
    description,
    caution,
    imageS3Key,
    displayOrder,
  },
  config,
) => {
  return instance.patch(
    `/api/admin/events/${eid}`,
    {
      eventType,
      title,
      organizer,
      startDate,
      endDate,
      description,
      caution,
      imageS3Key,
      displayOrder,
    },
    config,
  );
};
