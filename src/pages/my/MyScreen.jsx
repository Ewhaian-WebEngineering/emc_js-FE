import { useState } from 'react';
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
  getKakaoAuthorizeUrl,
  useLogout,
  useAuth,
} from '@/api/feature/auth/useAuth';
import { useGetMyInfo, useGetBanners } from '@/api/feature/my/useMyData';

const CONTENT_BY_ROLE = {
  user: MyDefaultContent,
  seller: MySellerContent,
  admin: MyAdminContent,
};

function MyScreenLoggedIn({ onLogout, onLoginClick }) {
  const { data } = useGetMyInfo();
  const { data: banners } = useGetBanners();
  const ContentComponent = CONTENT_BY_ROLE[data.role] ?? MyDefaultContent;
  const showFooter = data.role === 'user';

  return (
    <>
      <MyContentContainer>
        <MyUserRow
          isLoggedIn
          userName={data.nickname}
          onLogout={onLogout}
          onLoginClick={onLoginClick}
        />
        <ContentComponent data={{ ...data, banners }} />
      </MyContentContainer>

      {showFooter && (
        <AdminCertificationWrapper>
          <AdminCertification isLoggedIn />
        </AdminCertificationWrapper>
      )}
    </>
  );
}

function MyScreenLoggedOut({ onLoginClick }) {
  const { data: banners } = useGetBanners();

  return (
    <>
      <MyContentContainer>
        <MyUserRow isLoggedIn={false} onLoginClick={onLoginClick} />
        <MyDefaultContent data={{ banners }} />
      </MyContentContainer>

      <AdminCertificationWrapper>
        <AdminCertification isLoggedIn={false} onLoginClick={onLoginClick} />
      </AdminCertificationWrapper>
    </>
  );
}

export default function MyScreen() {
  const [, forceUpdate] = useState(0);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  const { isLoggedIn } = useAuth();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => forceUpdate((n) => n + 1),
    });
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthorizeUrl();
    setIsLoginSheetOpen(false);
  };

  return (
    <MyContainer>
      <Header title="마이페이지" border />

      {isLoggedIn ? (
        <MyScreenLoggedIn
          onLogout={handleLogout}
          onLoginClick={() => setIsLoginSheetOpen(true)}
        />
      ) : (
        <MyScreenLoggedOut onLoginClick={() => setIsLoginSheetOpen(true)} />
      )}

      <LoginBottomSheet
        isOpen={isLoginSheetOpen}
        onClose={() => setIsLoginSheetOpen(false)}
        onKakaoLogin={handleKakaoLogin}
      />
    </MyContainer>
  );
}
