// TODO: API 나오면 이 mock 객체 제거하고 GET /api/events/:eventId 응답으로 대체
export const mockEvent = {
  eventId: 1,
  imageUrl: '',
  title: '이벤트 예시',
  eventType: ['사전', '현장'],
  host: 'EMC 주최',
  period: {
    start: new Date('2026-09-01'),
    end: new Date('2026-09-05'),
  },
  content: 'EMC 주최 이벤트',
  notice: '당첨자 사후 안내',
};
