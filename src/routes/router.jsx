import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import MainLayout from '../layouts/MainLayout';
import HomeScreen from '../pages/home/HomeScreen';
import EventScreen from '../pages/event/EventScreen';
import BoothScreen from '../pages/booth/BoothScreen';
import ScrapScreen from '../pages/scrap/ScrapScreen';
import MyScreen from '../pages/my/MyScreen';
import Admin from '../pages/admin/AdminCode';
import { TAB_ROUTES } from '../constants/routes';

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
          { path: TAB_ROUTES.HOME, element: <HomeScreen /> },
          { path: TAB_ROUTES.EVENT, element: <EventScreen /> },
          { path: TAB_ROUTES.BOOTH, element: <BoothScreen /> },
          { path: TAB_ROUTES.SCRAP, element: <ScrapScreen /> },
          { path: TAB_ROUTES.MY, element: <MyScreen /> },
        ],
      },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);
