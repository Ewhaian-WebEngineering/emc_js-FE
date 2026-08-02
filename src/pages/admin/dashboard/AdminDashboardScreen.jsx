import { useState } from 'react';
import Header from '../../../designsystem/components/header/FillCenterHeader';
import ManagementStatRow from '../../../designsystem/components/card/management/ManagementStatRow';
import Divider from '../../../designsystem/components/divider/Divider';
import ChartIcon from '@/assets/svg/24px/ic_chart_bar.svg?react';
import PeopleIcon from '@/assets/svg/24px/ic_people.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { CONGESTION_TOOLTIP, VISITOR_TOOLTIP } from '@/constants/tooltip';
import { CONGESTION_LEVEL } from '@/constants/congestionLevel';
import SponsorSection from './SponsorSection';
import EventSection from './EventSection';
import BannerSection from './BannerSection';
import FaqSection from './FaqSection';
import BoothSection from './BoothSection';
import {
  FestivalInfo,
  DashboardContainer,
  ManagementCardStats,
  DashboardTitle,
} from '../style.js';

export default function AdminDashboardScreen() {
  const [congestionLevel] = useState('crowded');
  const [visitorCount] = useState(0);
  const congestion = CONGESTION_LEVEL[congestionLevel];

  const handleCongestionClick = () => {}; // TODO(API)

  return (
    <DashboardContainer>
      <Header onBack={() => {}} title="대시보드" border />

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
            value={visitorCount}
          />
        </ManagementCardStats>
      </FestivalInfo>

      <SponsorSection />
      <EventSection />
      <BannerSection />
      <FaqSection />
      <BoothSection />
    </DashboardContainer>
  );
}
