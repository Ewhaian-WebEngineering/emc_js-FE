import instance from '../../core/instance';

export const createFaqApi = async ({ question, answer }) => {
  return instance.post('/api/admin/faqs', { question, answer });
};

export const getFaqsApi = async () => {
  return instance.get('/api/faqs');
};

export const updateFaqApi = async ({ fid, question, answer, displayOrder }) => {
  return instance.patch(`/api/admin/faqs/${fid}`, {
    question,
    answer,
    displayOrder,
  });
};
