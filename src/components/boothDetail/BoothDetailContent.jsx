import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Placeholder from '@/designsystem/components/Placeholder';
import BookMarkStroke from '@/assets/svg/24px/ic_scrap_stroke.svg?react';
import BookMarkFill from '@/assets/svg/24px/ic_scrap_fill.svg?react';
import NoticeIcon from '@/assets/svg/16px/ic_announce.svg?react';
import { MARK_ICON_LG } from '@/constants/marks';
import { semantic } from '@/designsystem/tokens/semantic';
import Badge from '@/designsystem/components/badge/Badge';
import { OPERATING_TIME_OPTIONS } from '@/constants/filter';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import Divider from '@/designsystem/components/divider/Divider';
import AccordionDescription from '@/designsystem/components/accordion/AccordionDescription';
import Tab from '@/designsystem/components/tab/Tab';
import { useScrollSpyTabs } from '@/hooks/useScrollSpyTabs';
import { BOOTH_ROUTES } from '@/constants/routes';
import { BOOTH_DETAIL_TABS } from '@/components/boothDetail/tabs';
import {
  RepresentativeImageWrapper,
  BoothMarks,
  BoothInfo,
  BoothInfoHeader,
  BoothName,
  Badges,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  NoticeCard,
  NoticeContent,
  TabWrapper,
  TabSection,
  RecommendBooths,
  RecommendBoothTitle,
  RecommendBoothList,
} from '../style';
import BoothDetailCard from '@/designsystem/components/card/booth/BoothDetailCard';

export default function BoothDetailContent({
  booth,
  boothId,
  interactive = true,
}) {
  const navigate = useNavigate();
  const [boothDescriptionExpanded, setBoothDescriptionExpanded] =
    useState(false);
  const [allergyDescriptionExpanded, setAllergyDescriptionExpanded] =
    useState(false);

  const tabBarRef = useRef(null);
  const [tabBarHeight, setTabBarHeight] = useState(0);

  useEffect(() => {
    if (!tabBarRef.current) return;
    const update = () => setTabBarHeight(tabBarRef.current.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(tabBarRef.current);
    return () => ro.disconnect();
  }, []);

  const { activeTab, scrollToTab, registerSection } = useScrollSpyTabs(
    BOOTH_DETAIL_TABS,
    tabBarHeight,
  );

  const handleNoticeClick = () => {
    if (!interactive) return;
    navigate(BOOTH_ROUTES.NOTICE(boothId));
  };

  return (
    <>
      <RepresentativeImageWrapper>
        {booth.representativeImage ? (
          <img src={booth.representativeImage} alt="대표 이미지" />
        ) : (
          <Placeholder logoSize="30%" />
        )}
        <BoothMarks key={boothId}>
          {booth.marks?.map((mark) => {
            const MarkIcon = MARK_ICON_LG[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothMarks>
      </RepresentativeImageWrapper>

      <BoothInfo>
        <BoothInfoHeader>
          <BoothName>{booth.boothName}</BoothName>
          {interactive &&
            (booth.isBookmarked ? (
              <BookMarkFill color={semantic.iconPrimaryNormal} />
            ) : (
              <BookMarkStroke color={semantic.iconNormalAssistive} />
            ))}
        </BoothInfoHeader>
        <Badges>
          {booth.tags?.map((tag) => (
            <Badge key={tag} size="sm" variant={tag} />
          ))}
        </Badges>
        <InfoList>
          <InfoRow>
            <InfoLabel>운영 시간</InfoLabel>
            <InfoValue>
              {OPERATING_TIME_LABEL[booth.operatingTime] || booth.operatingTime}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>현금 사용</InfoLabel>
            <InfoValue>{CASH_USAGE_LABEL[booth.cash] || booth.cash}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>위치</InfoLabel>
            <LinkButton size="sm" variant="secondary">
              {booth.location}번 부스
            </LinkButton>
          </InfoRow>
          <InfoRow>
            <InfoLabel>URL</InfoLabel>
            <LinkButton size="sm" variant="secondary" href={booth.url}>
              {booth.url}
            </LinkButton>
          </InfoRow>
        </InfoList>
        <NoticeCard onClick={handleNoticeClick}>
          <NoticeIcon color={semantic.iconPrimaryNormal} />
          <NoticeContent announcement={booth.announcement}>
            {booth.announcement[0] || '등록된 공지가 없습니다.'}
          </NoticeContent>
        </NoticeCard>
      </BoothInfo>

      <Divider size="lg" />

      <AccordionDescription
        description={booth.description}
        expanded={boothDescriptionExpanded}
        onToggle={() => setBoothDescriptionExpanded(!boothDescriptionExpanded)}
      />

      <Divider size="lg" />

      {booth.tags.includes('food') && booth.allergyInfo && (
        <AccordionDescription
          title="원재료 / 알레르기 정보"
          description={booth.allergyInfo}
          expanded={allergyDescriptionExpanded}
          onToggle={() =>
            setAllergyDescriptionExpanded(!allergyDescriptionExpanded)
          }
        />
      )}

      <Divider size="lg" />

      <TabWrapper ref={tabBarRef}>
        <Tab
          tabs={BOOTH_DETAIL_TABS}
          activeTab={BOOTH_DETAIL_TABS.findIndex((tab) => tab.id === activeTab)}
          onChange={(tab) => scrollToTab(tab.id)}
        />
      </TabWrapper>

      {BOOTH_DETAIL_TABS.map(({ id, render }) => (
        <TabSection
          key={id}
          ref={registerSection(id)}
          style={{ scrollMarginTop: tabBarHeight }}
        >
          {render(booth)}
        </TabSection>
      ))}

      <Divider size="lg" />

      <RecommendBooths>
        <RecommendBoothTitle>이 부스는 어때요?</RecommendBoothTitle>
        <RecommendBoothList>
          {booth.recommendations?.map((recommendation) => (
            <BoothDetailCard
              key={recommendation.id}
              boothNumber={recommendation.boothNumber}
              boothName={recommendation.boothName}
              thumbnail={recommendation.thumbnail}
              marks={recommendation.marks}
              badges={recommendation.tags}
              onClick={interactive ? () => {} : undefined}
            />
          ))}
        </RecommendBoothList>
      </RecommendBooths>
    </>
  );
}

const OPERATING_TIME_LABEL = Object.fromEntries(
  OPERATING_TIME_OPTIONS.map(({ label, value }) => [value, label]),
);

const CASH_USAGE_LABEL = {
  true: '가능',
  false: '불가능',
};
