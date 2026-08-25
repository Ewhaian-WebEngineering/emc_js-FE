export const mockSponsor = {
  id: 'sponsor-1',
  name: '스윗베이커리',
  location: '11',
  operatingTime: 'allDay',
  url: 'https://instagram.com/sweetbakery_official',
  shortDescription: '건강한 재료로 만든 수제 베이커리 협찬사입니다.',
  description:
    '스윗베이커리는 신선한 재료와 정성으로 만든 다양한 베이커리 제품을 협찬합니다. 축제 기간 동안 방문객 여러분께 특별한 할인 혜택도 준비했어요.',
  profileImage: '',
  itemSections: [
    {
      id: 'group-1',
      name: '기본 그룹',
      items: [
        {
          id: 'item-1',
          name: '카드 제휴 안내 카드',
          description: '문의 창구로 안내해주는 카드입니다.',
          status: 'active',
          thumbnail: '',
        },
      ],
    },
    {
      id: 'group-2',
      name: '협찬품 그룹2',
      items: [
        {
          id: 'item-2',
          name: '카드 제휴 안내 카드',
          description: '문의 창구로 안내해주는 카드입니다.',
          status: 'active',
          thumbnail: '',
        },
        {
          id: 'item-3',
          name: '카드 제휴 안내 카드',
          description: '문의 창구로 안내해주는 카드입니다.',
          status: 'inactive',
          thumbnail: '',
        },
      ],
    },
    {
      id: null,
      name: '그룹 없음',
      isUngrouped: true,
      items: [
        {
          id: 'item-4',
          name: '카드 제휴 안내 카드',
          description: '문의 창구로 안내해주는 카드입니다.',
          status: 'active',
          thumbnail: '',
        },
      ],
    },
  ],
};
