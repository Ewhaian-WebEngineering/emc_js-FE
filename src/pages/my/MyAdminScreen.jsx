import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import Divider from '../../designsystem/components/divider/Divider';
import NavigationBar from '../../designsystem/components/navigationbar/NavigationBar';
import ManagementBoothCard from '../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../designsystem/components/card/management/ManagementFairCard';
import MyUser from './components/MyUserRow';
import { MyContainer, MyContentContainer } from './style.js';

const MOCK_ADMIN_DATA = {
  userName: '김이화',
  fairVisitorCount: 46,
  boothName: 'EMC 운영 부스',
  scrapCount: 46,
  boothVisitorCount: 10999,
};

export default function MyAdminScreen() {
  const [userName, setUserName] = useState(MOCK_ADMIN_DATA.userName);
  const [fairVisitorCount, setFairVisitorCount] = useState(
    MOCK_ADMIN_DATA.fairVisitorCount,
  );
  const [boothName, setBoothName] = useState(MOCK_ADMIN_DATA.boothName);
  const [scrapCount, setScrapCount] = useState(MOCK_ADMIN_DATA.scrapCount);
  const [boothVisitorCount, setBoothVisitorCount] = useState(
    MOCK_ADMIN_DATA.boothVisitorCount,
  );

  useEffect(() => {
    // TODO: 유저 이름
    // TODO: 전체 행사 정보 조회
    // TODO: 부스 정보 조회
  }, []);

  const handleLogout = () => {
    // TODO: 로그아웃 로직
  };

  return (
    <MyContainer>
      <Header title="마이페이지" border />

      <MyContentContainer>
        <MyUser userName={userName} onLogout={handleLogout} />
        <ManagementFairCard
          congestionLevel="crowded"
          onCongestionClick={() => {}}
          onLinkClick={() => {}}
          visitorCount={fairVisitorCount}
        />
        <Divider size="sm" />
        <ManagementBoothCard
          boothName={boothName}
          onLinkClick={() => {}}
          scrapCount={scrapCount}
          visitorCount={boothVisitorCount}
        />
      </MyContentContainer>
      <NavigationBar />
    </MyContainer>
  );
}
