import { useEffect, useState } from 'react';
import Header from '../../designsystem/components/header/FillRightHeader';
import Divider from '../../designsystem/components/divider/Divider';
import NavigationBar from '../../designsystem/components/navigationbar/NavigationBar';
import ManagementBoothCard from '../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../designsystem/components/card/management/ManagementFairCard';
import MyUser from './components/MyUserRow';
import { MyContainer, MyHeaderWrapper, MyContentContainer } from './style.js';

export default function MyAdminScreen() {
  const [userName, setUserName] = useState('김이화');
  const [fairVisitorCount, setFairVisitorCount] = useState(46);
  const [boothName, setBoothName] = useState('EMC 운영 부스');
  const [scrapCount, setScrapCount] = useState(46);
  const [boothVisitorCount, setBoothVisitorCount] = useState(10999);

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
      <MyHeaderWrapper>
        <Header title="마이페이지" border />
      </MyHeaderWrapper>
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
