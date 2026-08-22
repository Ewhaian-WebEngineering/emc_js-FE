import { MANAGE_ROUTES } from '@/constants/routes';
import BoothPreviewScreen from './booth/BoothPreviewScreen';
import BoothEditScreen from './booth/BoothEditScreen';

export const manageRoutes = {
  withFooter: [
    {
      path: MANAGE_ROUTES.BOOTH_PREVIEW(':boothId'),
      element: <BoothPreviewScreen />,
    },
  ],
  withoutFooter: [
    {
      path: MANAGE_ROUTES.BOOTH_EDIT(':boothId'),
      element: <BoothEditScreen />,
    },
  ],
};
