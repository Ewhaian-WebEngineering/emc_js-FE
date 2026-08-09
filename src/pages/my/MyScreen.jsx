import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import LinkButton from '../../designsystem/components/button/linkbutton/LinkButton';
import MyUserRow from './components/MyUserRow';
import MyDefaultContent from './components/MyDefaultContent';
import MySellerContent from './components/MySellerContent';
import MyAdminContent from './components/MyAdminContent';
import { MyContainer, MyContentContainer, MyFooter } from './style.js';

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

export default function MyScreen({ isLoggedIn = false, userRole = 'user' }) {
  const [data, setData] = useState(MOCK_DATA);

  useEffect(() => {
    // TODO: isLoggedIn, userRole에 따른 유저/부스/행사 정보 조회
  }, [isLoggedIn, userRole]);

  const handleLogout = () => {
    // TODO: 로그아웃 모달 노출
  };

  const handleLoginClick = () => {
    // TODO: 카카오로그인 바텀시트
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
          userName={data.userName}
          onLogout={handleLogout}
          onLoginClick={handleLoginClick}
        />
        <ContentComponent {...data} />
      </MyContentContainer>

      {showFooter && (
        <MyFooter>
          <p>부스 또는 EMC 운영진이신가요?</p>
          <LinkButton href="https://example.com" size="sm" variant="secondary">
            셀러/관리자 인증
          </LinkButton>
        </MyFooter>
      )}
    </MyContainer>
  );
}
