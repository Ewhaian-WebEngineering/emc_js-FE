import { mockProductGroups } from '../mocks/mockProductGroups';

export const GROUP_OPTIONS = [
  { label: '그룹 없음', value: null, hideActions: true },
  ...mockProductGroups.map((group) => ({
    label: group.name,
    value: group.id,
  })),
];
