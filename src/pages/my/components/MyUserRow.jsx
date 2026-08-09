import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import LogoutIcon from '@/assets/svg/16px/ic_logout.svg?react';
import { semantic } from '../../../designsystem/tokens/semantic';
import { UserRow, MyUserName, MyLogoutGroup, MyLogoutIcon } from './style.js';

export default function MyUserRow({ userName = '김이화', onLogout }) {
  return (
    <UserRow>
      <MyUserName>
        <span>{userName}</span>
        <span>님</span>
      </MyUserName>
      <MyLogoutGroup>
        <TextButton size="sm" variant="secondary" onClick={onLogout}>
          로그아웃
        </TextButton>
        <MyLogoutIcon>
          <LogoutIcon color={semantic.iconNormalNormal} />
        </MyLogoutIcon>
      </MyLogoutGroup>
    </UserRow>
  );
}
