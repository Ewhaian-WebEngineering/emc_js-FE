import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import Banner from '../../designsystem/components/banner/Banner';
import NavigationBar from '../../designsystem/components/navigationbar/NavigationBar';
import ManagementBoothCard from '../../designsystem/components/card/management/ManagementBoothCard';
import MyUser from './components/MyUserRow';
import InquiryList from './components/InquiryList';
import { MyContainer, MyHeaderWrapper, MyContentContainer } from './style.js';

const MOCK_SELLER_DATA = {
  userName: '김이화',
  boothName: 'EMC 이벤트 부스',
  scrapCount: 46,
  visitorCount: 10999,
};

export default function MySellerScreen() {
  const [userName, setUserName] = useState(MOCK_SELLER_DATA.userName);
  const [boothName, setBoothName] = useState(MOCK_SELLER_DATA.boothName);
  const [scrapCount, setScrapCount] = useState(MOCK_SELLER_DATA.scrapCount);
  const [visitorCount, setVisitorCount] = useState(
    MOCK_SELLER_DATA.visitorCount,
  );

  useEffect(() => {
    // TODO: 유저 이름
    // TODO: 부스 정보 조회
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
        <ManagementBoothCard
          boothName={boothName}
          onLinkClick={() => {}}
          scrapCount={scrapCount}
          visitorCount={visitorCount}
        />
        <InquiryList />
      </MyContentContainer>
      <NavigationBar />
    </MyContainer>
  );
}
