import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import IconButton from '../../../designsystem/components/button/iconbutton/IconButton';
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
        <span>{userName}</span>
        <span>님</span>
      </MyUserName>
      <TextButton size="sm" variant="secondary" onClick={onLogout}>
        <MyLogout>
          로그아웃
          <LogoutIcon color={semantic.iconNormalNormal} />
        </MyLogout>
      </TextButton>
    </UserRow>
  );
}
