import { ADMIN_ROUTES } from '@/constants/routes';
import SponsorCreateScreen from './SponsorCreateScreen';
import SponsorEditScreen from './SponsorEditScreen';

export const adminRoutes = {
  withoutFooter: [
    {
      path: ADMIN_ROUTES.SPONSOR_CREATE,
      element: <SponsorCreateScreen />,
    },
    {
      path: ADMIN_ROUTES.SPONSOR_EDIT(':sponsorId'),
      element: <SponsorEditScreen />,
    },
  ],
};
