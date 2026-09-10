import instance from '@/api/core/instance';

/**
 * @typedef {Object} EventDetail
 * @property {string} id
 * @property {'pre' | 'live' | 'post'} eventType
 * @property {string} title
 * @property {string} organizer
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} status
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} caution
 */

export const getEvents = async () => {
  return instance.get('/api/events');
};

/**
 * @param {string} eid
 * @returns {Promise<EventDetail>}
 */
export const getEventDetail = (eid) => {
  return instance.get(`/api/events/${eid}`);
};
