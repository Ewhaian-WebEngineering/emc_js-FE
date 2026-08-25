import { QueryBoundary } from '@/components/common/QueryBoundary';
import Footer from '@/designsystem/components/footer/Footer';
import { Outlet } from 'react-router-dom';

export default function FooterLayout() {
  return (
    <>
      <QueryBoundary>
        <Outlet />
      </QueryBoundary>
      <Footer />
    </>
  );
}
