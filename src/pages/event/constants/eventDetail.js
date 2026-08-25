export const eventTypeLabel = {
  pre: '사전 이벤트',
  onsite: '현장 이벤트',
  post: '사후 이벤트',
};

export const eventDetailMessages = {
  notFound: '존재하지 않는 이벤트입니다.',
  noNotice: '이벤트 유의사항이 없습니다.',
  shareTitle: '이벤트를 친구에게 공유해보세요!',
};

export const eventDetails = {
  1: {
    id: 1,
    eventType: 'pre',
    eventTitle:
      '글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자글자',
    startDate: '2026-09-01',
    endDate: '2026-09-25',
    description:
      '<p>사전 이벤트에 참여하고 <b>다양한 혜택</b>을 받아보세요!</p><p>배포된 링크를 통해 누구나 쉽게 참여할 수 있습니다.</p>',
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
    description:
      '<p>간단한 참여만으로 응모가 완료됩니다.</p><p><b>선착순 마감</b>될 수 있으니 서둘러주세요.</p>',
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
    description:
      '<p>현장에서 직접 즐기는 이벤트입니다.</p><p>부스 방문 시 <b>스태프 안내</b>에 따라 참여해주세요.</p>',
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
    description: '<p>현장 참여형 이벤트로 <b>누구나 참여 가능</b>합니다.</p>',
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
    description:
      '<p>이벤트에 참여해주신 모든 분들께 감사드립니다.</p><p>결과는 <b>추후 개별 안내</b> 예정입니다.</p>',
    sponsor: { id: 3, name: '{협찬사}' },
    notice:
      '- 본 이벤트는 사후 이벤트로 9월 1일 (월) ~ 9월 25 (금) 동안 배포된 링크를 통해 참여 가능 합니다.\n- 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. 이벤트 유의사항 입니다. ',
  },
};

export function getEventById(id) {
  return eventDetails[Number(id)];
}
