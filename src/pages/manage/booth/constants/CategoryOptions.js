export const BOOTH_CATEGORY_OPTIONS = {
  tags: [
    { value: 'food', label: '수제 먹거리' },
    { value: 'fashion_beauty', label: '패션/뷰티' },
    { value: 'craft', label: '공예' },
    { value: 'stationery', label: '문구류' },
    { value: 'performance', label: '퍼포먼스' },
  ],
  marks: [
    { value: 'none', label: '해당 없음' },
    { value: 'vegan', label: '비건' },
    { value: 'eco', label: '친환경' },
  ],
  operatingTime: [
    { value: 'all_day', label: '종일' },
    { value: 'first_half', label: '전반' },
    { value: 'second_half', label: '후반' },
  ],
  cash: [
    { value: false, label: '불가능' },
    { value: true, label: '가능' },
  ],
};
