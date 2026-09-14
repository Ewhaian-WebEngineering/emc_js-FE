import { Outlet } from 'react-router-dom';
import NavigationBar from '../designsystem/components/navigationbar/NavigationBar';
import { MainLayoutContent } from './style';
import ScrollToTop from '@/components/common/ScrollToTop';

/**
 * 하단 NavigationBar를 포함하는 공통 레이아웃입니다.
 * 홈/이벤트/부스/스크랩/마이 페이지에서 사용됩니다.
 */
export default function MainLayout() {
  return (
    <>
      <MainLayoutContent>
        <ScrollToTop />
        <Outlet />
      </MainLayoutContent>
      <NavigationBar />
    </>
  );
}
