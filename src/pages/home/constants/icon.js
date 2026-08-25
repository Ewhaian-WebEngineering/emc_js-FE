import EventIcon from '@/assets/svg/home/ic_home_event.svg?react';
import EcoIcon from '@/assets/svg/home/ic_home_eco.svg?react';
import LayoutIcon from '@/assets/svg/home/ic_home_layout.svg?react';
import SponsorIcon from '@/assets/svg/home/ic_home_sponsor.svg?react';
import EmcIcon from '@/assets/svg/home/ic_home_emc.svg?react';
import {
  EMC_INTRODUCTION_ROUTE,
  EVENT_ROUTES,
  MAP_ROUTE,
  SPONSOR_ROUTES,
  TAB_ROUTES,
} from '@/constants/routes';

export const ICON_LIST = [
  {
    key: 'event',
    label: '이벤트',
    icon: EventIcon,
    route: EVENT_ROUTES.LIST,
  },
  {
    key: 'eco',
    label: '친환경',
    icon: EcoIcon,
    route: `${TAB_ROUTES.BOOTH}?category=eco`,
  },
  {
    key: 'layout',
    label: '배치도',
    icon: LayoutIcon,
    route: MAP_ROUTE,
  },
  {
    key: 'sponsor',
    label: '협찬사',
    icon: SponsorIcon,
    route: SPONSOR_ROUTES.LIST,
  },
  {
    key: 'emc',
    label: 'EMC소개',
    icon: EmcIcon,
    route: EMC_INTRODUCTION_ROUTE,
  },
];
