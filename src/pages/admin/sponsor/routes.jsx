import { ADMIN_ROUTES } from '@/constants/routes';
import SponsorCreateScreen from './SponsorCreateScreen';
import SponsorEditScreen from './SponsorEditScreen';
import SponsorItemCreateScreen from './item/SponsorItemCreateScreen';
import SponsorItemEditScreen from './item/SponsorItemEditScreen';

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
    {
      path: ADMIN_ROUTES.SPONSOR_ITEM_CREATE(':sponsorId'),
      element: <SponsorItemCreateScreen />,
    },
    {
      path: ADMIN_ROUTES.SPONSOR_ITEM_EDIT(':sponsorId', ':itemId'),
      element: <SponsorItemEditScreen />,
    },
  ],
};
