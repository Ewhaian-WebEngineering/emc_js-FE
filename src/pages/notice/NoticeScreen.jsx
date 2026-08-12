import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import CloseButton from '@/assets/svg/28px/ic_close.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { NoticeContainer } from './style';

import NoticeContent from './component/NoticeContent';

export default function NoticeScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <NoticeContainer>
      <FillCenterHeader
        onBack={handleBack}
        title="안내사항"
        right={
          <CloseButton
            color={semantic.iconNormalNormal}
            onClick={handleClose}
          />
        }
        border
      />

      <NoticeContent />
    </NoticeContainer>
  );
}
