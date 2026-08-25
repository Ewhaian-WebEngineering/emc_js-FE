import instance from '@/api/core/instance';

export const mockApi = {
  // GET 목록 조회
  getList: (params) => instance.get('/api/mocks', { params }),

  // GET 상세 조회 — path parameter
  getDetail: (mockId) => instance.get(`/api/mocks/${mockId}`),

  // POST 생성
  create: (payload) => instance.post('/api/mocks', payload),

  // PATCH 수정
  update: (mockId, payload) => instance.patch(`/api/mocks/${mockId}`, payload),

  // DELETE 삭제
  remove: (mockId) => instance.delete(`/api/mocks/${mockId}`),
};
