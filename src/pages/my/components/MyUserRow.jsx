import { useState } from 'react';
import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import IconButton from '../../../designsystem/components/button/iconbutton/IconButton';
import Modal from '../../../designsystem/components/modal/Modal';
import LogoutIcon from '@/assets/svg/16px/ic_logout.svg?react';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import { semantic } from '../../../designsystem/tokens/semantic';
import { UserRow, MyUserName, MyLogout } from './style.js';

export default function MyUserRow({
  isLoggedIn,
  userName,
  onLogout,
  onLoginClick,
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <UserRow>
        <MyUserName>
          <span>로그인</span>
        </MyUserName>
        <IconButton
          size="md"
          variant="transparent"
          onClick={onLoginClick}
          color={semantic.iconNormalNormal}
        >
          <ArrowRightIcon />
        </IconButton>
      </UserRow>
    );
  }

  return (
    <UserRow>
      <MyUserName>
        <span>{userName}</span>님
      </MyUserName>
      <TextButton size="sm" variant="secondary" onClick={handleLogoutClick}>
        <MyLogout>
          로그아웃
          <LogoutIcon color={semantic.iconNormalNormal} />
        </MyLogout>
      </TextButton>

      {isLogoutModalOpen && (
        <Modal
          variant="confirmation"
          title="로그아웃하시겠어요?"
          description="현재 계정에서 로그아웃되어요."
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </UserRow>
  );
}
