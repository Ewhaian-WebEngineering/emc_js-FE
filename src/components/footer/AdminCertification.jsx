import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import { AdminCertificationSection } from '../style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES, SELLER_ROUTES } from '@/constants/routes';

const CERTIFICATION_OPTIONS = [
  { label: '셀러', value: 'seller' },
  { label: '관리자(EMC)', value: 'admin' },
];

export default function AdminCertification({ isLoggedIn, onLoginClick }) {
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleCertificationClick = () => {
    if (!isLoggedIn) {
      onLoginClick?.();
      return;
    }

    showModal({
      variant: 'form',
      title: '셀러/관리자 인증',
      description: '해당하는 항목을 선택하세요.',
      defaultValue: CERTIFICATION_OPTIONS[0],
      options: CERTIFICATION_OPTIONS,
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: (selectedValue) => {
        const target =
          typeof selectedValue === 'object'
            ? selectedValue.value
            : selectedValue;

        if (target === 'seller') {
          navigate(SELLER_ROUTES.CODE);
        } else if (target === 'admin') {
          navigate(ADMIN_ROUTES.CODE);
        }
      },
    });
  };

  return (
    <AdminCertificationSection>
      <p>부스 또는 EMC 운영진이신가요?</p>
      <LinkButton
        variant="secondary"
        size="sm"
        onClick={handleCertificationClick}
      >
        셀러/관리자 인증
      </LinkButton>
    </AdminCertificationSection>
  );
}
