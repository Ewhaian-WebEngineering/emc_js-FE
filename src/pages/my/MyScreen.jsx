import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import MyUserRow from './components/MyUserRow';
import MyDefaultContent from './components/MyDefaultContent';
import MySellerContent from './components/MySellerContent';
import MyAdminContent from './components/MyAdminContent';
import {
  AdminCertificationWrapper,
  MyContainer,
  MyContentContainer,
} from './style.js';
import AdminCertification from '@/components/footer/AdminCertification';
import LoginBottomSheet from './components/LoginBottomSheet';
import {
  getAccessToken,
  getUserNickname,
  getUserRole,
} from '@/api/core/tokenStorage';
import { getKakaoAuthorizeUrl, useLogout } from '@/api/feature/auth/useAuth';

const MOCK_DATA = {
  userName: '김이화',
  boothName: 'EMC 이벤트 부스',
  scrapCount: 46,
  visitorCount: 10999,
  fairVisitorCount: 46,
};

const CONTENT_BY_ROLE = {
  user: MyDefaultContent,
  seller: MySellerContent,
  admin: MyAdminContent,
};

export default function MyScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const [userRole, setUserRole] = useState(getUserRole() ?? 'user');
  const [userName, setUserName] = useState(getUserNickname() ?? '');
  const [data, setData] = useState(MOCK_DATA);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  const { mutate: logout } = useLogout();

  useEffect(() => {
    // TODO: isLoggedIn, userRole에 따른 유저/부스/행사 정보 조회
  }, [isLoggedIn, userRole]);

  const handleLogout = () => {
    logout();

    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
  };

  const handleLoginClick = () => {
    setIsLoginSheetOpen(true);
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthorizeUrl();
    setIsLoginSheetOpen(false);
  };

  const ContentComponent = isLoggedIn
    ? CONTENT_BY_ROLE[userRole]
    : MyDefaultContent;
  const showFooter = !isLoggedIn || userRole === 'user';

  return (
    <MyContainer>
      <Header title="마이페이지" border />

      <MyContentContainer>
        <MyUserRow
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
          onLoginClick={handleLoginClick}
        />
        <ContentComponent {...data} />
      </MyContentContainer>

      {showFooter && (
        <AdminCertificationWrapper>
          <AdminCertification />
        </AdminCertificationWrapper>
      )}

      <LoginBottomSheet
        isOpen={isLoginSheetOpen}
        onClose={() => setIsLoginSheetOpen(false)}
        onKakaoLogin={handleKakaoLogin}
      />
    </MyContainer>
  );
}
