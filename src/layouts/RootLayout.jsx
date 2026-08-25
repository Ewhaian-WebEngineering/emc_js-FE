import { Outlet } from 'react-router-dom';
import { PageContainer } from './style';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import ScrollToTop from '@/components/common/ScrollToTop';

/**
 * 모든 화면에 공통으로 적용되는 최상위 레이아웃입니다.
 * 화면 좌우 여백과 최대 너비(데스크톱에서 중앙 정렬)를 담당합니다.
 * 하단바가 있는 화면(MainLayout)과 없는 화면 모두 이 레이아웃 하위에 위치합니다.
 */
export default function RootLayout() {
  return (
    <PageContainer>
      <ScrollToTop />
      <QueryBoundary>
        <Outlet />
      </QueryBoundary>
    </PageContainer>
  );
}
