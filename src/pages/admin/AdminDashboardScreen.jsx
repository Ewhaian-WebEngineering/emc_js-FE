import { useState } from 'react';
import Header from '@/designsystem/components/header/FillCenterHeader';
import ManagementStatRow from '@/designsystem/components/card/management/ManagementStatRow';
import Divider from '@/designsystem/components/divider/Divider';
import ChartIcon from '@/assets/svg/24px/ic_chart_bar.svg?react';
import PeopleIcon from '@/assets/svg/24px/ic_people.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { CONGESTION_TOOLTIP, VISITOR_TOOLTIP } from '@/constants/tooltip';
import { CONGESTION_LEVEL } from '@/constants/congestionLevel';
import {
  useAdminDashboard,
  useUpdateCongestion,
  useCongestionStream,
} from '@/api/feature/admin/useAdminData';
import CongestionBottomSheet from './components/CongestionBottomSheet';
import SponsorSection from './components/SponsorSection';
import EventSection from './components/EventSection';
import BannerSection from './components/BannerSection';
import FaqSection from './components/FaqSection';
import BoothSection from './components/BoothSection';
import {
  FestivalInfo,
  DashboardContainer,
  ManagementCardStats,
  DashboardTitle,
} from './style.js';
import { useNavigate } from 'react-router-dom';
import { TAB_ROUTES } from '../../constants/routes';

const CONGESTION_API_TO_LEVEL = {
  green: 'relaxed',
  yellow: 'normal',
  red: 'crowded',
};
const CONGESTION_LEVEL_TO_API = {
  relaxed: 'green',
  normal: 'yellow',
  crowded: 'red',
};

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { data } = useAdminDashboard();
  const { mutate: updateCongestion } = useUpdateCongestion();
  useCongestionStream();
  const [isCongestionSheetOpen, setIsCongestionSheetOpen] = useState(false);

  const congestionRaw = data.congestion;
  const congestionLevel = CONGESTION_API_TO_LEVEL[congestionRaw] ?? 'crowded';
  const congestion = CONGESTION_LEVEL[congestionLevel];

  const handleCongestionClick = () => setIsCongestionSheetOpen(true);
  const handleCongestionSheetClose = () => setIsCongestionSheetOpen(false);
  const handleCongestionSave = (value) => {
    if (!value) return;
    updateCongestion({ level: CONGESTION_LEVEL_TO_API[value] ?? value });
  };

  return (
    <DashboardContainer>
      <Header onBack={() => navigate(TAB_ROUTES.MY)} title="대시보드" border />

      <FestivalInfo>
        <DashboardTitle>
          <span>14th 종합손물세트</span>
          <br />
          관리자용 대시보드
        </DashboardTitle>
        <ManagementCardStats>
          <ManagementStatRow
            icon={<ChartIcon color={congestion.color} />}
            label="현재 혼잡도"
            tooltip={CONGESTION_TOOLTIP}
            value={congestion.label}
            valueColor={congestion.color}
            onActionClick={handleCongestionClick}
          />
          <Divider size="sm" />
          <ManagementStatRow
            icon={<PeopleIcon color={semantic.fillPrimaryNormal} />}
            label="방문자 수"
            tooltip={VISITOR_TOOLTIP}
            value={data.visitorCount}
          />
        </ManagementCardStats>
      </FestivalInfo>

      <SponsorSection sponsors={data.sponsors.list} />
      <EventSection events={data.events} />
      <BannerSection banners={data.banners.list} />
      <FaqSection faqs={data.faqs.list} />
      <BoothSection booths={data.booths.list} />

      <CongestionBottomSheet
        isOpen={isCongestionSheetOpen}
        onClose={handleCongestionSheetClose}
        value={congestionLevel}
        onSave={handleCongestionSave}
      />
    </DashboardContainer>
  );
}
