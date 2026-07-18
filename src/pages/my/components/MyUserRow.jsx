import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import LogoutIcon from '@/assets/svg/16px/ic_logout.svg?react';
import {
  UserRow,
  MyUserName,
  MyUserNameHighlight,
  MyUserNameSuffix,
  MyLogoutGroup,
  MyLogoutIcon,
} from './style.js';

export default function MyUserRow({ userName = '김이화', onLogout }) {
  return (
    <UserRow>
      <MyUserName>
        <MyUserNameHighlight>{userName}</MyUserNameHighlight>
        <MyUserNameSuffix>님</MyUserNameSuffix>
      </MyUserName>
      <MyLogoutGroup>
        <TextButton size="sm" variant="secondary" onClick={onLogout}>
          로그아웃
        </TextButton>
        <MyLogoutIcon>
          <LogoutIcon />
        </MyLogoutIcon>
      </MyLogoutGroup>
    </UserRow>
  );
}
