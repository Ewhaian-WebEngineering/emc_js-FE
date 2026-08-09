import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import MainLayout from '../layouts/MainLayout';
import FooterLayout from '@/layouts/FooterLayout';
import HomeScreen from '../pages/home/HomeScreen';
import EventScreen from '../pages/event/EventScreen';
import BoothScreen from '../pages/booth/BoothScreen';
import ScrapScreen from '../pages/scrap/ScrapScreen';
import MyScreen from '../pages/my/MyScreen';
import NoticeScreen from '../pages/notice/NoticeScreen';
import { searchRoutes } from '@/pages/search/routes';
import SponsorScreen from '../pages/sponsor/SponsorScreen';
import AdminCodeScreen from '../pages/admin/AdminCodeScreen';
import {
  TAB_ROUTES,
  EVENT_ROUTES,
  NOTICE_ROUTE,
  SPONSOR_ROUTES,
  ADMIN_ROUTES,
} from '../constants/routes';
import BoothDetailScreen from '@/pages/booth/BoothDetailScreen';
import EventDetailScreen from '@/pages/event/EventDetailScreen';
import { boothRoutes } from '@/pages/booth/routes';

/**
 * 앱 전체 라우트 트리입니다.
 * RootLayout(공통 좌우 여백/최대 너비)이 모든 화면을 감싸고,
 * 그 아래 MainLayout(하단 NavigationBar 포함)에 각 탭 페이지를 자식 라우트로 등록합니다.
 * 하단바가 없는 화면은 RootLayout의 children에 MainLayout과 형제로 추가하면 됩니다.
 * 새 페이지를 추가할 때는 해당 그룹의 children 배열에 { path, element }를 추가하면 됩니다.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            element: <FooterLayout />,
            children: [
              { path: TAB_ROUTES.HOME, element: <HomeScreen /> },
              { path: TAB_ROUTES.EVENT, element: <EventScreen /> },
              { path: TAB_ROUTES.BOOTH, element: <BoothScreen /> },
              { path: TAB_ROUTES.SCRAP, element: <ScrapScreen /> },
              { path: TAB_ROUTES.MY, element: <MyScreen /> },
            ],
          },
        ],
      },
      {
        element: <FooterLayout />,
        children: [
          { path: SPONSOR_ROUTES.LIST, element: <SponsorScreen /> },
          ...boothRoutes.withFooter,
        ],
      },
      { path: ADMIN_ROUTES.CODE, element: <AdminCodeScreen /> },
      { path: NOTICE_ROUTE, element: <NoticeScreen /> },
      { path: SPONSOR_ROUTES.DETAIL(':id'), element: <SponsorScreen /> },
      { path: BOOTH_ROUTE(':boothId'), element: <BoothDetailScreen /> },
      { path: EVENT_ROUTES.DETAIL(':id'), element: <EventDetailScreen /> },
      ...boothRoutes.withoutFooter,
      ...searchRoutes.full,
    ],
  },
]);
