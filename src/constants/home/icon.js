import EventIcon from '@/assets/svg/home/ic_home_event.svg?react';
import EcoIcon from '@/assets/svg/home/ic_home_eco.svg?react';
import LayoutIcon from '@/assets/svg/home/ic_home_layout.svg?react';
import SponsorIcon from '@/assets/svg/home/ic_home_sponsor.svg?react';
import EmcIcon from '@/assets/svg/home/ic_home_emc.svg?react';

export const ICON_LIST = [
  {
    key: 'event',
    label: '이벤트',
    icon: EventIcon,
  },
  {
    key: 'eco',
    label: '친환경',
    icon: EcoIcon,
  },
  {
    key: 'layout',
    label: '배치도',
    icon: LayoutIcon,
  },
  {
    key: 'sponsor',
    label: '협찬사',
    icon: SponsorIcon,
  },
  {
    key: 'emc',
    label: 'EMC소개',
    icon: EmcIcon,
  },
];
