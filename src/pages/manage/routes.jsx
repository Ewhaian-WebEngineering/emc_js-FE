import { MANAGE_ROUTES } from '@/constants/routes';
import BoothPreviewScreen from './booth/BoothPreviewScreen';
import BoothEditScreen from './booth/BoothEditScreen';
import ProductCreateScreen from './product/ProductCreateScreen';
import ProductEditScreen from './product/ProductEditScreen';

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
    {
      path: MANAGE_ROUTES.PRODUCT_CREATE(':boothId'),
      element: <ProductCreateScreen />,
    },
    {
      path: MANAGE_ROUTES.PRODUCT_EDIT(':boothId', ':productId'),
      element: <ProductEditScreen />,
    },
  ],
};
