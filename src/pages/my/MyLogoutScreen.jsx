import Header from '../../designsystem/components/header/FillRightHeader';
import Divider from '../../designsystem/components/divider/Divider';
import LinkButton from '../../designsystem/components/button/linkbutton/LinkButton';
import Banner from '../../designsystem/components/banner/Banner';
import NavigationBar from '../../designsystem/components/navigationbar/NavigationBar';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import IconButton from '../../designsystem/components/button/iconbutton/IconButton';
import InquiryList from './components/InquiryList';
import {
  MyContainer,
  MyHeaderWrapper,
  MyContentContainer,
  MyFooter,
  MyFooterText,
  LoginGroup,
  LoginText,
} from './style.js';

export default function MyLogoutScreen() {
  return (
    <MyContainer>
      <MyHeaderWrapper>
        <Header title="마이페이지" />
        <Divider size="sm" />
      </MyHeaderWrapper>
      <MyContentContainer>
        <LoginGroup>
          <LoginText>로그인</LoginText>
          <IconButton size="md" variant="transparent">
            <ArrowRightIcon />
          </IconButton>
        </LoginGroup>
        <Banner />
        <InquiryList />
      </MyContentContainer>
      <MyFooter>
        <MyFooterText>부스 또는 EMC 운영진이신가요?</MyFooterText>
        <LinkButton href="https://example.com" size="sm" variant="secondary">
          셀러/관리자 인증
        </LinkButton>
      </MyFooter>
      <NavigationBar />
    </MyContainer>
  );
}
