import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGoBack } from '@/hooks/useGoBack';

import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Tab from '@/designsystem/components/tab/Tab';
import Divider from '@/designsystem/components/divider/Divider';
import ProductHorizontalCard from '@/designsystem/components/card/product/ProductHorizontalCard';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';

import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import DefaultRepresentativeImage from '@/assets/img/img_rectangle_lg.png';

import { TAB_ROUTES } from '@/constants/routes';
import { SPONSOR_DETAIL_MOCK } from './constants/sponsorDetail';

import * as S from './style';

const DETAIL_TABS = [
  {
    label: '소개',
    content: null,
  },
  {
    label: '제품 목록',
    content: null,
  },
];

export default function SponsorDetailScreen() {
  const { sponsorId } = useParams();
  const sponsorDetail = SPONSOR_DETAIL_MOCK[sponsorId];

  const navigate = useNavigate();

  const introductionRef = useRef(null);
  const productRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);

  const handleBack = useGoBack();

  const handleTabChange = (selectedTab) => {
    const selectedIndex = DETAIL_TABS.findIndex(
      (tab) => tab.label === selectedTab.label,
    );

    setActiveTab(selectedIndex);

    if (selectedTab.label === '소개') {
      introductionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      return;
    }

    if (selectedTab.label === '제품 목록') {
      productRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getSnsUrl = (sns) => {
    if (!sns) return '';

    if (sns.startsWith('http://') || sns.startsWith('https://')) {
      return sns;
    }

    if (sns.startsWith('@')) {
      return `https://www.instagram.com/${sns.slice(1)}`;
    }

    return `https://www.instagram.com/${sns}`;
  };

  //TODO: html 태그 받아 표시
  const introductionContent =
    sponsorDetail.introductionContent ||
    '협찬사 설명영역\n(Text Editor로 작성)';

  return (
    <S.SponsorDetailContainer>
      <TransparentHeader onBack={handleBack} />

      <S.RepresentativeImage
        src={sponsorDetail.representativeImage || DefaultRepresentativeImage}
        alt={`${sponsorDetail.sponsorName} 대표 이미지`}
      />

      <S.SponsorInfoSection>
        <S.SponsorName>{sponsorDetail.sponsorName}</S.SponsorName>

        <S.InfoList>
          <S.InfoRow>
            <S.InfoLabel>운영 시간</S.InfoLabel>
            <S.InfoValue>{sponsorDetail.info.type}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>위치</S.InfoLabel>
            <S.InfoValue>
              <LinkButton
                variant="secondary"
                size="sm"
                href="#"
                onClick={(event) => event.preventDefault()}
              >
                {sponsorDetail.info.location}
              </LinkButton>
            </S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>SNS</S.InfoLabel>
            <S.InfoValue>
              <LinkButton
                variant="secondary"
                size="sm"
                href={getSnsUrl(sponsorDetail.info.sns)}
                target="_blank"
              >
                {sponsorDetail.info.sns}
              </LinkButton>
            </S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>URL</S.InfoLabel>
            <S.InfoValue>
              <LinkButton
                variant="secondary"
                size="sm"
                href={sponsorDetail.info.url}
                target="_blank"
              >
                {sponsorDetail.info.url}
              </LinkButton>
            </S.InfoValue>
          </S.InfoRow>
        </S.InfoList>
      </S.SponsorInfoSection>

      <Divider size="lg" />

      {/*TODO: Tab이 섹션 이동 후에도 상단에 노출되도록 Wrapper 적용*/}
      <Tab
        tabs={DETAIL_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <S.IntroductionSection ref={introductionRef}>
        <S.SectionTitle>
          {sponsorDetail.sponsorName}을 소개합니다.
        </S.SectionTitle>

        <S.IntroductionContent>{introductionContent}</S.IntroductionContent>
      </S.IntroductionSection>

      <Divider size="lg" />

      <S.ProductSection ref={productRef}>
        <S.SectionTitle>협찬품을 소개합니다</S.SectionTitle>

        <S.ProductGroups>
          {sponsorDetail.productGroups.map((group, groupIndex) => (
            <S.ProductGroup key={`${group.groupName}-${groupIndex}`}>
              <S.ProductGroupHeader>
                <S.ProductGroupName>{group.groupName}</S.ProductGroupName>

                <S.ProductGroupDescription>
                  {group.groupDescription}
                </S.ProductGroupDescription>
              </S.ProductGroupHeader>

              <S.ProductList>
                {group.products.map((product, productIndex) => (
                  <ProductHorizontalCard
                    key={`${product.productName}-${productIndex}`}
                    thumbnail={product.thumbnail}
                    productName={product.productName}
                    productDescription={product.productDescription}
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
          {sponsorDetail.sponsorName}와 EMC가 준비한
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
    </S.SponsorDetailContainer>
  );
}
