import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';

import RepresentativeImageSrc from '@/assets/img/img_rectangle_xl.png';

import { SPONSOR_DETAIL } from './constants/sponsorDetail';
import * as S from './style';

export default function SponsorDetailScreen() {
  const navigate = useNavigate();

  const introductionRef = useRef(null);
  const productRef = useRef(null);

  const [activeTab, setActiveTab] = useState('introduction');

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === 'introduction') {
      introductionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (tab === 'product') {
      productRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <S.SponsorDetailContainer>
      <S.HeroSection>
        <S.RepresentativeImage
          src={RepresentativeImageSrc}
          alt={`${SPONSOR_DETAIL.sponsorName} 대표 이미지`}
        />

        <S.HeaderWrapper>
          <TransparentHeader onBack={handleBack} />
        </S.HeaderWrapper>
      </S.HeroSection>

      <S.SponsorInfoSection>
        <S.SponsorName>{SPONSOR_DETAIL.sponsorName}</S.SponsorName>

        <S.SponsorInfoList>
          <S.SponsorInfoRow>
            <S.SponsorInfoLabel>운영 시간</S.SponsorInfoLabel>

            <S.SponsorInfoValue>{SPONSOR_DETAIL.info.type}</S.SponsorInfoValue>
          </S.SponsorInfoRow>

          <S.SponsorInfoRow>
            <S.SponsorInfoLabel>위치</S.SponsorInfoLabel>

            <S.SponsorInfoLink>
              <LinkButton
                href="#"
                variant="secondary"
                size="sm"
                onClick={(event) => event.preventDefault()}
              >
                {SPONSOR_DETAIL.info.location}
              </LinkButton>
            </S.SponsorInfoLink>
          </S.SponsorInfoRow>

          <S.SponsorInfoRow>
            <S.SponsorInfoLabel>SNS</S.SponsorInfoLabel>

            <S.SponsorInfoLink>
              <LinkButton
                href="#"
                variant="secondary"
                size="sm"
                onClick={(event) => event.preventDefault()}
              >
                {SPONSOR_DETAIL.info.sns}
              </LinkButton>
            </S.SponsorInfoLink>
          </S.SponsorInfoRow>

          <S.SponsorInfoRow>
            <S.SponsorInfoLabel>URL</S.SponsorInfoLabel>

            <S.SponsorInfoLink>
              <LinkButton
                href={SPONSOR_DETAIL.info.url}
                target="_blank"
                variant="secondary"
                size="sm"
              >
                {SPONSOR_DETAIL.info.url}
              </LinkButton>
            </S.SponsorInfoLink>
          </S.SponsorInfoRow>
        </S.SponsorInfoList>
      </S.SponsorInfoSection>

      <S.TabSection>
        <S.TabButton
          type="button"
          $active={activeTab === 'introduction'}
          onClick={() => handleTabClick('introduction')}
        >
          소개
        </S.TabButton>

        <S.TabButton
          type="button"
          $active={activeTab === 'product'}
          onClick={() => handleTabClick('product')}
        >
          제품 목록
        </S.TabButton>
      </S.TabSection>

      <S.IntroductionSection ref={introductionRef}>
        <S.IntroductionTitle>{SPONSOR_DETAIL.introduction}</S.IntroductionTitle>

        <S.IntroductionContent>
          <span>
            협찬사 설명영역
            <br />
            (Text Editor로 작성)
          </span>
        </S.IntroductionContent>
      </S.IntroductionSection>

      <S.SectionDivider />

      <S.ProductSection ref={productRef}>
        <S.ProductSectionTitle>
          {SPONSOR_DETAIL.productSectionTitle}
        </S.ProductSectionTitle>

        {SPONSOR_DETAIL.productGroups.map((group, groupIndex) => (
          <S.ProductGroup key={groupIndex}>
            <S.ProductGroupHeader>
              <S.ProductGroupName>{group.groupName}</S.ProductGroupName>

              <S.ProductGroupDescription>
                {group.groupDescription}
              </S.ProductGroupDescription>
            </S.ProductGroupHeader>

            <S.ProductList>
              {group.products.map((product, productIndex) => (
                <S.ProductItem key={productIndex}>
                  <S.ProductThumbnail
                    src={RepresentativeImageSrc}
                    alt={product.productName}
                  />

                  <S.ProductText>
                    <S.ProductName>{product.productName}</S.ProductName>

                    <S.ProductDescription>
                      {product.productDescription}
                    </S.ProductDescription>
                  </S.ProductText>
                </S.ProductItem>
              ))}
            </S.ProductList>
          </S.ProductGroup>
        ))}
      </S.ProductSection>

      <S.SectionDivider />

      <S.EventSection>
        <S.EventTitle>
          {SPONSOR_DETAIL.event.title.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index === 0 && <br />}
            </span>
          ))}
        </S.EventTitle>

        <S.EventButton type="button">
          {SPONSOR_DETAIL.event.buttonText} 〉
        </S.EventButton>
      </S.EventSection>
    </S.SponsorDetailContainer>
  );
}
