export const defaultEventTab = 'pre';

export const eventTabs = [
  { id: 'pre', label: '사전 이벤트' },
  { id: 'onsite', label: '현장 이벤트' },
  { id: 'post', label: '사후 이벤트' },
];

export const eventTabDescriptions = {
  pre: '종손 방문 전 필수 체크! 사전 이벤트에 참여하시고 종손을 더욱 알차게 즐겨보세요!',
  onsite:
    '종손 당일, 현장 이벤트에 참여하고 양손 가득 즐겁게 선물 받아가세요-!',
  post: '2026 종손! 즐거우셨나요? 종손에서의 소중한 기억을 공유해주시고, 소소한 선물! 놓치지 마세요~!',
};

export const eventData = {
  pre: [
    {
      id: 1,
      eventTitle: '이벤트 타이틀 영역 입니다',
      startDate: '2026-01-01',
      endDate: '2026-01-01',
      status: 'ended',
      thumbnail: '',
    },
    {
      id: 2,
      eventTitle: '이벤트 타이틀 영역 입니다',
      startDate: '2026-01-01',
      endDate: '2026-01-01',
      status: 'ongoing',
      thumbnail: '',
    },
  ],
  onsite: [
    {
      id: 3,
      eventTitle: '이벤트 타이틀 영역 입니다',
      startDate: '2026-01-01',
      endDate: '2026-01-01',
      status: 'ongoing',
      thumbnail: '',
    },
    {
      id: 4,
      eventTitle: '이벤트 타이틀 영역 입니다',
      startDate: '2026-01-01',
      endDate: '2026-01-01',
      status: 'ongoing',
      thumbnail: '',
    },
  ],
  post: [
    {
      id: 5,
      eventTitle: '이벤트 타이틀 영역 입니다',
      startDate: '2026-01-01',
      endDate: '2026-01-01',
      status: 'upcoming',
      thumbnail: '',
    },
  ],
};
