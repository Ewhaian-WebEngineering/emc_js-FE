import { SEARCH_ROUTES } from '@/constants/routes';
import SearchScreen from './SearchScreen';
import SearchResultScreen from './SearchResultScreen';

export const searchRoutes = {
  full: [
    { path: SEARCH_ROUTES.SEARCH, element: <SearchScreen /> },
    { path: SEARCH_ROUTES.SEARCH_RESULT, element: <SearchResultScreen /> },
  ],
};
