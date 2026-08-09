import { NOTICE_ROUTE } from '@/constants/routes';
import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import NoticeContent from '@/pages/notice/component/NoticeContent';
import { useNavigate } from 'react-router-dom';

export default function NoticeBottomSheet({ onClose }) {
  const navigate = useNavigate();

  return (
    <BottomSheet
      variant="handleWithHeader"
      title="안내사항"
      isOpen={true}
      defaultSnap="min"
      showScrim="transparent"
      onClose={onClose}
      onFull={() => {
        navigate(NOTICE_ROUTE);
      }}
      dismissible={false}
      style={{ zIndex: 100 }}
    >
      <NoticeContent />
    </BottomSheet>
  );
}
