import { BOOTH_ROUTES } from '@/constants/routes';
import BoothDetailScreen from './BoothDetailScreen';
import BoothNoticeScreen from './BoothNoticeScreen';

export const boothRoutes = {
  withFooter: [
    { path: BOOTH_ROUTES.DETAIL(':boothId'), element: <BoothDetailScreen /> },
  ],
  withoutFooter: [
    { path: BOOTH_ROUTES.NOTICE(':boothId'), element: <BoothNoticeScreen /> },
  ],
};
