import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import LinkButton from '../../designsystem/components/button/linkbutton/LinkButton';
import Banner from '../../designsystem/components/banner/Banner';
import NavigationBar from '../../designsystem/components/navigationbar/NavigationBar';
import MyUser from './components/MyUserRow';
import InquiryList from './components/InquiryList';
import {
  MyContainer,
  MyHeaderWrapper,
  MyContentContainer,
  MyFooter,
} from './style.js';

export default function MyLoginScreen() {
  const [userName, setUserName] = useState('김이화');

  useEffect(() => {
    // TODO: 유저 이름
  }, []);

  const handleLogout = () => {
    // TODO: 로그아웃 로직
  };

  return (
    <MyContainer>
      <MyHeaderWrapper>
        <Header title="마이페이지" border />
      </MyHeaderWrapper>
      <MyContentContainer>
        <MyUser userName={userName} onLogout={handleLogout} />
        <Banner />
        <InquiryList />
      </MyContentContainer>
      <MyFooter>
        <p>부스 또는 EMC 운영진이신가요?</p>
        <LinkButton href="https://example.com" size="sm" variant="secondary">
          셀러/관리자 인증
        </LinkButton>
      </MyFooter>
      <NavigationBar />
    </MyContainer>
  );
}
