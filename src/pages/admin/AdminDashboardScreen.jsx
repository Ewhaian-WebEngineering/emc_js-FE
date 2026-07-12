import { useState } from 'react';
import Header from '../../designsystem/components/header/FillCenterHeader';
import Accordion from '../../designsystem/components/accordion/AccordionLine';
import ManagementStatRow from '../../designsystem/components/card/management/ManagementStatRow';
import Divider from '../../designsystem/components/divider/Divider';
import ChartIcon from '@/assets/svg/24px/ic_chart_bar.svg?react';
import PeopleIcon from '@/assets/svg/24px/ic_people.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { CONGESTION_TOOLTIP, VISITOR_TOOLTIP } from '@/constants/tooltip';
import { CONGESTION_LEVEL } from '@/constants/congestionLevel';
import {
  FestivalInfo,
  DashboardContainer,
  ManagementCardStats,
  DashboardTitle,
  DashboardTitleHighlight,
  DashboardHeaderWrapper,
} from './style.js';

export default function AdminDashboardScreen() {
  const [sponsorExpanded, setSponsorExpanded] = useState(false);
  const [eventExpanded, setEventExpanded] = useState(false);
  const [bannerExpanded, setBannerExpanded] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [boothExpanded, setBoothExpanded] = useState(false);

  const [congestionLevel, setCongestionLevel] = useState('crowded');
  const [visitorCount, setVisitorCount] = useState(0);

  const congestion = CONGESTION_LEVEL[congestionLevel];

  const handleCongestionClick = () => {};

  return (
    <DashboardContainer>
      <DashboardHeaderWrapper>
        <Header onBack={() => {}} title="대시보드" />
        <Divider size="sm" />
      </DashboardHeaderWrapper>
      <FestivalInfo>
        <DashboardTitle>
          <DashboardTitleHighlight>14th 종합손물세트</DashboardTitleHighlight>
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

      <Accordion
        expanded={sponsorExpanded}
        onToggle={() => setSponsorExpanded((prev) => !prev)}
        size="lg"
        title="협찬사 등록/수정"
      >
        <Accordion.ActionButton buttonText="텍스트 +" onClick={() => {}} />
      </Accordion>

      <Accordion
        expanded={eventExpanded}
        onToggle={() => setEventExpanded((prev) => !prev)}
        size="lg"
        title="이벤트 등록/수정"
      >
        <Accordion.ActionButton buttonText="텍스트 +" onClick={() => {}} />
      </Accordion>

      <Accordion
        expanded={bannerExpanded}
        onToggle={() => setBannerExpanded((prev) => !prev)}
        size="lg"
        title="배너 등록/수정"
      >
        <Accordion.ActionButton buttonText="텍스트 +" onClick={() => {}} />
      </Accordion>

      <Accordion
        expanded={faqExpanded}
        onToggle={() => setFaqExpanded((prev) => !prev)}
        size="lg"
        title="FAQ 등록/수정"
      >
        <Accordion.ActionButton buttonText="텍스트 +" onClick={() => {}} />
      </Accordion>

      <Accordion
        expanded={boothExpanded}
        onToggle={() => setBoothExpanded((prev) => !prev)}
        size="lg"
        title="부스 관리"
      ></Accordion>
    </DashboardContainer>
  );
}
