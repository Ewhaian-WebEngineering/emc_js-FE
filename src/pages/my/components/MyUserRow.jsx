import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import LogoutIcon from '@/assets/svg/16px/ic_logout.svg?react';
import { semantic } from '../../../designsystem/tokens/semantic';
import { UserRow, MyUserName, MyLogout } from './style.js';

export default function MyUserRow({ userName = '김이화', onLogout }) {
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
