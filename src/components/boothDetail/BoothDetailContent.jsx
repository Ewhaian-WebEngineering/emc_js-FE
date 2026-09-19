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
import { BOOTH_ROUTES, TAB_ROUTES } from '@/constants/routes';
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
import Image from '@/designsystem/components/Image';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import { getBoothMarks } from '@/utils/formatBooth';
import BoothLocationModal from './components/BoothLocationModal';
import { useBoothScrap } from '@/api/feature/scrap/useScrap';
import { useToast } from '@/hooks/toast/useToast';
import { getKakaoAuthorizeUrl, useAuth } from '@/api/feature/auth/useAuth';
import LoginBottomSheet from '@/pages/my/components/LoginBottomSheet';

export default function BoothDetailContent({
  booth,
  boothId,
  interactive = true,
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [boothDescriptionExpanded, setBoothDescriptionExpanded] =
    useState(false);
  const [allergyDescriptionExpanded, setAllergyDescriptionExpanded] =
    useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  const tabBarRef = useRef(null);
  const [tabBarHeight, setTabBarHeight] = useState(0);

  useEffect(() => {
    if (!tabBarRef.current) return;
    const update = () => {
      if (!tabBarRef.current) return;
      setTabBarHeight(tabBarRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(tabBarRef.current);
    return () => ro.disconnect();
  }, []);

  const { activeTab, scrollToTab, registerSection } = useScrollSpyTabs(
    BOOTH_DETAIL_TABS,
    tabBarHeight,
  );

  const { mutate: toggleScrap, isPending: isScrapPending } =
    useBoothScrap(boothId);

  const handleBookmarkClick = () => {
    if (!interactive) return;

    if (!isLoggedIn) {
      setIsLoginSheetOpen(true);
      return;
    }

    if (isScrapPending) return;
    toggleScrap(undefined, {
      onSuccess: (data) => {
        toast({
          message: data.isScrapped ? '스크랩했어요.' : '스크랩을 취소했어요.',
          ...(data.isScrapped && {
            action: {
              label: '바로가기',
              onClick: () => navigate(TAB_ROUTES.SCRAP),
            },
          }),
        });
      },
      onError: (error) => {
        const status = error.status ?? error.response?.status;
        if (status === 401) {
          setIsLoginSheetOpen(true);
        }
      },
    });
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthorizeUrl();
  };

  const handleNoticeClick = () => {
    if (!interactive) return;
    navigate(BOOTH_ROUTES.NOTICE(boothId));
  };

  const handleLocationClick = () => {
    if (!interactive) return;
    setIsLocationModalOpen(true);
  };

  const marks = getBoothMarks(booth);

  return (
    <>
      <RepresentativeImageWrapper>
        {booth.thumbnailUrl ? (
          <Image src={booth.thumbnailUrl} alt="대표 이미지" />
        ) : (
          <Placeholder logoSize="30%" />
        )}
        <BoothMarks key={boothId}>
          {marks.map((mark) => {
            const MarkIcon = MARK_ICON_LG[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothMarks>
      </RepresentativeImageWrapper>

      <BoothInfo>
        <BoothInfoHeader>
          <BoothName>{booth.name || '-'}</BoothName>
          {interactive &&
            (booth.isScrapped ? (
              <BookMarkFill
                color={semantic.iconPrimaryNormal}
                onClick={handleBookmarkClick}
              />
            ) : (
              <BookMarkStroke
                color={semantic.iconNormalAssistive}
                onClick={handleBookmarkClick}
              />
            ))}
        </BoothInfoHeader>
        <Badges>
          {booth.categories?.map((category) => (
            <Badge key={category} size="sm" variant={category} />
          ))}
          {booth.isEco && <Badge key="eco" size="sm" variant="eco" />}
          {booth.isVegan && <Badge key="vegan" size="sm" variant="vegan" />}
        </Badges>
        <InfoList>
          <InfoRow>
            <InfoLabel>운영 시간</InfoLabel>
            <InfoValue>
              {OPERATING_TIME_LABEL[booth.operationTime] || '-'}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>현금 사용</InfoLabel>
            <InfoValue>{CASH_USAGE_LABEL[booth.isCash] || '-'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>위치</InfoLabel>
            {booth.location ? (
              <LinkButton
                size="sm"
                variant="secondary"
                onClick={handleLocationClick}
              >
                {booth.location}번 부스
              </LinkButton>
            ) : (
              <InfoValue>-</InfoValue>
            )}
          </InfoRow>
          <InfoRow>
            <InfoLabel>URL</InfoLabel>
            {booth.externalUrl ? (
              <LinkButton
                size="sm"
                variant="secondary"
                href={booth.externalUrl}
                target="_blank"
              >
                {booth.externalUrl}
              </LinkButton>
            ) : (
              <InfoValue>-</InfoValue>
            )}
          </InfoRow>
        </InfoList>
        <NoticeCard onClick={handleNoticeClick}>
          <NoticeIcon color={semantic.iconPrimaryNormal} />
          <NoticeContent announcement={booth.latestNotice?.title}>
            {booth.latestNotice?.title || '등록된 공지가 없습니다.'}
          </NoticeContent>
        </NoticeCard>
      </BoothInfo>

      <Divider size="lg" />
      <AccordionDescription
        description={booth.description || '등록된 소개글이 없습니다.'}
        expanded={boothDescriptionExpanded}
        onToggle={() => setBoothDescriptionExpanded(!boothDescriptionExpanded)}
      />

      {booth.categories?.includes('food') && (
        <>
          <Divider size="lg" />
          <AccordionDescription
            title="원재료 / 알레르기 정보"
            description={
              booth.allergenInfo || '등록된 식품영양정보가 없습니다.'
            }
            expanded={allergyDescriptionExpanded}
            onToggle={() =>
              setAllergyDescriptionExpanded(!allergyDescriptionExpanded)
            }
          />
        </>
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
        {booth.recommendedBooths?.length === 0 ? (
          <EmptyState height={150} description="추천 부스가 없습니다." />
        ) : (
          <RecommendBoothList>
            {booth.recommendedBooths?.map((recommendation) => (
              <BoothDetailCard
                key={recommendation.id}
                boothNumber={recommendation.boothNumber}
                boothName={recommendation.name}
                thumbnail={recommendation.thumbnailUrl}
                isVegan={recommendation.isVegan}
                isEco={recommendation.isEco}
                categories={recommendation.categories}
                onClick={
                  interactive
                    ? () => navigate(BOOTH_ROUTES.DETAIL(recommendation.id))
                    : undefined
                }
              />
            ))}
          </RecommendBoothList>
        )}
      </RecommendBooths>

      {isLocationModalOpen && (
        <BoothLocationModal
          boothTargetId={`booth-${booth.location}`}
          boothName={booth.name}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}

      <LoginBottomSheet
        isOpen={isLoginSheetOpen}
        onClose={() => setIsLoginSheetOpen(false)}
        onKakaoLogin={handleKakaoLogin}
      />
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
