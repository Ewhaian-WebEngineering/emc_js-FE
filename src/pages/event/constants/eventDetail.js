export const eventTypeLabel = {
  pre: '사전 이벤트',
  onsite: '현장 이벤트',
  post: '사후 이벤트',
};

export const eventDetailMessages = {
  notFound: '존재하지 않는 이벤트입니다.',
  noNotice: '이벤트 유의사항이 없습니다.',
  shareTitle: '이벤트를 친구에게 공유해보세요!',
  kakaoUnsupported: '카카오톡 공유하기는 앱에서 지원됩니다.',
  linkCopied: '링크가 복사되었습니다.',
  linkCopyFailed: '링크 복사에 실패했습니다.',
};

export const eventDetails = {
  1: {
    id: 1,
    eventType: 'pre',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    status: 'ended',
    thumbnail: '',
    content: [
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
      { type: 'image', image: '' },
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
    ],
    sponsor: { id: 1, name: '{협찬사}' },
    notice:
      '- 본 이벤트는 사전 이벤트로 9월 1일 (월) ~ 9월 25 (금) 동안 배포된 링크를 통해 참여 가능 합니다.\n- 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. ',
  },
  2: {
    id: 2,
    eventType: 'pre',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    status: 'ongoing',
    thumbnail: '',
    content: [
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
    ],
    sponsor: null,
    notice: '',
  },
  3: {
    id: 3,
    eventType: 'onsite',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    status: 'ongoing',
    thumbnail: '',
    content: [
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
      { type: 'image', image: '' },
    ],
    sponsor: { id: 2, name: '{협찬사}' },
    notice:
      '- 본 이벤트는 현장 이벤트로 9월 1일 (월) ~ 9월 25 (금) 동안 배포된 링크를 통해 참여 가능 합니다.\n- 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다.',
  },
  4: {
    id: 4,
    eventType: 'onsite',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    status: 'ongoing',
    thumbnail: '',
    content: [
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
    ],
    sponsor: null,
    notice:
      '- 본 이벤트는 현장 이벤트로 9월 1일 (월) ~ 9월 25 (금) 동안 배포된 링크를 통해 참여 가능 합니다.\n- 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다.    ',
  },
  5: {
    id: 5,
    eventType: 'post',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    status: 'upcoming',
    thumbnail: '',
    content: [
      {
        type: 'paragraph',
        text: '이벤트 설명영역 (Text Editor로 수정)',
      },
    ],
    sponsor: { id: 3, name: '{협찬사}' },
    notice:
      '- 본 이벤트는 사후 이벤트로 9월 1일 (월) ~ 9월 25 (금) 동안 배포된 링크를 통해 참여 가능 합니다.\n- 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. ',
  },
};

export function getEventById(id) {
  return eventDetails[Number(id)];
}
