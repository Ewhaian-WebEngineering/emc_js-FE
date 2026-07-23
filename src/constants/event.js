export const defaultEventTab = 'pre';

export const eventTabs = [
  { id: 'pre', label: '사전 이벤트' },
  { id: 'onsite', label: '현장 이벤트' },
  { id: 'post', label: '사후 이벤트' },
];

export const eventTabDescriptions = {
  pre: '사전 이벤트에 대한 소개글입니다. 사전 이벤트에 대한 소개글입니다. 사전 이벤트에 대한 소개글입니다.',
  onsite:
    '현장 이벤트에 대한 소개글입니다. 현장 이벤트에 대한 소개글입니다. 현장 이벤트에 대한 소개글입니다.',
  post: '사후 이벤트에 대한 소개글입니다. 사후 이벤트에 대한 소개글입니다. 사후 이벤트에 대한 소개글입니다.',
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
