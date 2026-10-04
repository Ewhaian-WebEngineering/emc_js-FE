import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGoBack } from '@/hooks/useGoBack';

import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Tab from '@/designsystem/components/tab/Tab';
import Divider from '@/designsystem/components/divider/Divider';
import ProductHorizontalCard from '@/designsystem/components/card/product/ProductHorizontalCard';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';

import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';

import { TAB_ROUTES } from '@/constants/routes';
import { useSponsorDetail } from '@/api/feature/sponsor/useSponsor';
import { OPERATING_TIME_OPTIONS } from '@/constants/filter';

import * as S from './style';
import { SPONSOR_TABS } from './constants/sponsorTabs';
import DOMPurify from 'dompurify';
import { useScrollSpyTabs } from '@/hooks/useScrollSpyTabs';
import CardPlaceholder from '@/designsystem/components/Placeholder';
import { QueryBoundary } from '@/components/common/QueryBoundary';
import BoothLocationModal from '@/components/boothDetail/components/BoothLocationModal';

const SPONSOR_NAME_TO_BOOTH_TARGET = {
  이화이언: '13',
};

function buildDisplayGroups(
  productGroups,
  ungroupedProducts,
  ungroupedDisplayOrder,
) {
  const groups = (productGroups ?? []).map((group) => ({
    ...group,
    isUngrouped: false,
  }));

  const ungroupedGroup = {
    id: 'ungrouped',
    displayOrder: ungroupedDisplayOrder ?? Number.MAX_SAFE_INTEGER,
    products: ungroupedProducts ?? [],
    isUngrouped: true,
  };

  return [...groups, ungroupedGroup]
    .filter((group) => (group.isUngrouped ? group.products.length > 0 : true))
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

export default function SponsorDetailScreen() {
  const { sponsorId } = useParams();
  const handleBack = useGoBack();

  return (
    <>
      <TransparentHeader onBack={handleBack} border />
      <QueryBoundary>
        <SponsorDetailContent id={sponsorId} />
      </QueryBoundary>
    </>
  );
}

function SponsorDetailContent({ id }) {
  const { data: sponsorDetail } = useSponsorDetail(id);

  const navigate = useNavigate();

  const tabBarRef = useRef(null);
  const [tabBarHeight, setTabBarHeight] = useState(0);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const boothNumber =
    SPONSOR_NAME_TO_BOOTH_TARGET[sponsorDetail.location] ??
    sponsorDetail.location;
  const boothTargetId = `sponsor-booth-${boothNumber}`;

  const displayGroups = buildDisplayGroups(
    sponsorDetail.productGroups,
    sponsorDetail.products,
    sponsorDetail.ungroupedDisplayOrder,
  );

  useEffect(() => {
    if (!tabBarRef.current) return;
    const update = () => setTabBarHeight(tabBarRef.current.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(tabBarRef.current);
    return () => ro.disconnect();
  }, []);

  const { activeTab, scrollToTab, registerSection } = useScrollSpyTabs(
    SPONSOR_TABS,
    tabBarHeight,
  );

  const getSnsUrl = (sns) => {
    if (!sns) return '';
    if (sns.startsWith('http://') || sns.startsWith('https://')) return sns;
    if (sns.startsWith('@')) return `https://www.instagram.com/${sns.slice(1)}`;
    return `https://www.instagram.com/${sns}`;
  };

  const handleLocationClick = () => {
    setIsLocationModalOpen(true);
  };

  return (
    <S.SponsorDetailContainer>
      {sponsorDetail.imageUrl ? (
        <S.RepresentativeImage
          src={sponsorDetail.imageUrl}
          alt={`${sponsorDetail.name} 대표 이미지`}
        />
      ) : (
        <S.RepresentativeImagePlaceholder>
          <CardPlaceholder />
        </S.RepresentativeImagePlaceholder>
      )}

      <S.SponsorInfoSection>
        <S.SponsorName>{sponsorDetail.name}</S.SponsorName>

        <S.InfoList>
          <S.InfoRow>
            <S.InfoLabel>운영 시간</S.InfoLabel>
            <S.InfoValue>
              {OPERATING_TIME_LABEL[sponsorDetail.operationTime] ||
                sponsorDetail.operationTime}
            </S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>위치</S.InfoLabel>
            <S.InfoValue>
              <LinkButton
                variant="secondary"
                size="sm"
                onClick={handleLocationClick}
              >
                {boothTargetId !== 'sponsor-booth-13'
                  ? `${sponsorDetail.location}번 부스`
                  : `${sponsorDetail.location}`}
              </LinkButton>
            </S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>SNS</S.InfoLabel>
            {sponsorDetail.snsUrl ? (
              <S.InfoValue>
                <LinkButton
                  variant="secondary"
                  size="sm"
                  href={getSnsUrl(sponsorDetail.snsUrl)}
                  target="_blank"
                >
                  {sponsorDetail.snsUrl}
                </LinkButton>
              </S.InfoValue>
            ) : (
              <S.InfoValue>-</S.InfoValue>
            )}
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>URL</S.InfoLabel>
            {sponsorDetail.externalUrl ? (
              <S.InfoValue>
                <LinkButton
                  variant="secondary"
                  size="sm"
                  href={sponsorDetail.externalUrl}
                  target="_blank"
                >
                  {sponsorDetail.externalUrl}
                </LinkButton>
              </S.InfoValue>
            ) : (
              <S.InfoValue>-</S.InfoValue>
            )}
          </S.InfoRow>
        </S.InfoList>
      </S.SponsorInfoSection>

      <Divider size="lg" />

      <S.TabWrapper ref={tabBarRef}>
        <Tab
          tabs={SPONSOR_TABS}
          activeTab={SPONSOR_TABS.findIndex((tab) => tab.id === activeTab)}
          onChange={(tab) => scrollToTab(tab.id)}
        />
      </S.TabWrapper>

      <S.IntroductionSection
        ref={registerSection('introduction')}
        style={{ scrollMarginTop: tabBarHeight }}
      >
        <S.SectionTitle>{sponsorDetail.name} 소개합니다.</S.SectionTitle>

        {sponsorDetail.description && (
          <S.IntroductionContent
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sponsorDetail.description),
            }}
          />
        )}
      </S.IntroductionSection>

      <Divider size="lg" />

      <S.ProductSection
        ref={registerSection('product')}
        style={{ scrollMarginTop: tabBarHeight }}
      >
        <S.SectionTitle>협찬품을 소개합니다</S.SectionTitle>

        <S.ProductGroups>
          {displayGroups.map((group) => (
            <S.ProductGroup key={group.id}>
              {!group.isUngrouped && (
                <S.ProductGroupHeader>
                  <S.ProductGroupName>{group.name}</S.ProductGroupName>

                  <S.ProductGroupDescription>
                    {group.description}
                  </S.ProductGroupDescription>
                </S.ProductGroupHeader>
              )}

              <S.ProductList>
                {group.products.map((product) => (
                  <ProductHorizontalCard
                    key={product.id}
                    thumbnail={product.imageUrl}
                    productName={product.name}
                    productDescription={product.description}
                  />
                ))}
              </S.ProductList>
            </S.ProductGroup>
          ))}
        </S.ProductGroups>
      </S.ProductSection>

      <Divider size="lg" />

      <S.EventSection>
        <S.EventTitle>
          {sponsorDetail.name}와 EMC가 준비한
          {'\n'}
          다양한 이벤트를 만나보세요.
        </S.EventTitle>

        <BoxButton
          variant="primary"
          size="md"
          onClick={() => navigate(TAB_ROUTES.EVENT)}
        >
          <S.EventButtonContent>
            이벤트 보러가기
            <ArrowRightIcon />
          </S.EventButtonContent>
        </BoxButton>
      </S.EventSection>
      {isLocationModalOpen && boothTargetId && (
        <BoothLocationModal
          boothTargetId={boothTargetId}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}
    </S.SponsorDetailContainer>
  );
}

const OPERATING_TIME_LABEL = Object.fromEntries(
  OPERATING_TIME_OPTIONS.map(({ label, value }) => [value, label]),
);
