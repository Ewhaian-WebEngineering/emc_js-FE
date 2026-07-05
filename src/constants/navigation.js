import HomeFillIcon from '@/assets/svg/24px/ic_home_fill.svg?react';
import HomeStrokeIcon from '@/assets/svg/24px/ic_home_stroke.svg?react';
import EventFillIcon from '@/assets/svg/24px/ic_event_fill.svg?react';
import EventStrokeIcon from '@/assets/svg/24px/ic_event_stroke.svg?react';
import BoothFillIcon from '@/assets/svg/24px/ic_booth_fill.svg?react';
import BoothStrokeIcon from '@/assets/svg/24px/ic_booth_stroke.svg?react';
import ScrapFillIcon from '@/assets/svg/24px/ic_scrap_fill.svg?react';
import ScrapStrokeIcon from '@/assets/svg/24px/ic_scrap_stroke.svg?react';
import ProfileFillIcon from '@/assets/svg/24px/ic_profile_fill.svg?react';
import ProfileStrokeIcon from '@/assets/svg/24px/ic_profile_stroke.svg?react';
import { ROUTES } from './routes';

export const NAVIGATION_ITEMS = [
  {
    path: ROUTES.HOME,
    label: '홈',
    IconFill: HomeFillIcon,
    IconStroke: HomeStrokeIcon,
  },
  {
    path: ROUTES.EVENT,
    label: '이벤트',
    IconFill: EventFillIcon,
    IconStroke: EventStrokeIcon,
  },
  {
    path: ROUTES.BOOTH,
    label: '부스',
    IconFill: BoothFillIcon,
    IconStroke: BoothStrokeIcon,
  },
  {
    path: ROUTES.SCRAP,
    label: '스크랩',
    IconFill: ScrapFillIcon,
    IconStroke: ScrapStrokeIcon,
  },
  {
    path: ROUTES.MY,
    label: '마이',
    IconFill: ProfileFillIcon,
    IconStroke: ProfileStrokeIcon,
  },
];
