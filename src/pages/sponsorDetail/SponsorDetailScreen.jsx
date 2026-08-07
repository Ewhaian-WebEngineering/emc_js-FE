import { useNavigate } from 'react-router-dom';

import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Divider from '@/designsystem/components/divider/Divider';
import Tab from '@/designsystem/components/tab/Tab';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import ProductHorizontalCard from '@/designsystem/components/card/product/ProductHorizontalCard';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import RectangleXLImage from '@/assets/img/img_rectangle_xl.png';

import {
  SponsorDetailContainer,
  ContentWrapper,
  HeroImage,
  SponsorInfoSection,
  SponsorName,
  InfoTable,
  InfoRow,
  InfoLabel,
  InfoValue,
  IntroWrapper,
  IntroTitle,
  IntroImageWrapper,
  IntroPlaceholder,
  ProductWrapper,
  ProductGroup,
  ProductGroupTitle,
  ProductGroupDescription,
  EventSection,
  EventTitle,
  ButtonWrapper,
} from './style';

export default function SponsorDetailScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const introductionContent = (
    <IntroWrapper>
      <IntroTitle>{'{협찬사 이름}'}를 소개합니다.</IntroTitle>

      <IntroImageWrapper>
        <IntroPlaceholder>
          협찬사 설명 영역
          <br />
          (Text Editor로 작성)
        </IntroPlaceholder>
      </IntroImageWrapper>
    </IntroWrapper>
  );

  const productGroups = [
    {
      title: '제품 그룹',
      description:
        '그룹 설명글 입니다. 그룹 설명글 입니다. 그룹 설명글 입니다. 그룹 설명글 입니다.',
      products: [
        {
          productName: '제품이름 영역입니다. 제품이름 영역입니다.',
          productDescription:
            '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
          thumbnail: RectangleXLImage,
        },
        {
          productName: '제품이름 영역입니다. 제품이름 영역입니다.',
          productDescription:
            '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
          thumbnail: RectangleXLImage,
        },
        {
          productName: '제품이름 영역입니다. 제품이름 영역입니다.',
          productDescription:
            '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
          thumbnail: RectangleXLImage,
        },
      ],
    },
    {
      title: '제품 그룹',
      description:
        '그룹 설명글 입니다. 그룹 설명글 입니다. 그룹 설명글 입니다. 그룹 설명글 입니다.',
      products: [
        {
          productName: '제품이름 영역입니다. 제품이름 영역입니다.',
          productDescription:
            '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
          thumbnail: RectangleXLImage,
        },
        {
          productName: '제품이름 영역입니다. 제품이름 영역입니다.',
          productDescription:
            '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
          thumbnail: RectangleXLImage,
        },
      ],
    },
  ];

  const productContent = (
    <ProductWrapper>
      <IntroTitle>협찬품을 소개합니다.</IntroTitle>
      {productGroups.map((group, groupIndex) => (
        <ProductGroup key={groupIndex}>
          <ProductGroupTitle>{group.title}</ProductGroupTitle>
          <ProductGroupDescription>{group.description}</ProductGroupDescription>

          {group.products.map((product, productIndex) => (
            <div key={productIndex}>
              <ProductHorizontalCard
                productName={product.productName}
                productDescription={product.productDescription}
                thumbnail={product.thumbnail}
              />
              {productIndex !== group.products.length - 1 && (
                <Divider size="lg" />
              )}
            </div>
          ))}
        </ProductGroup>
      ))}
    </ProductWrapper>
  );

  return (
    <SponsorDetailContainer>
      <TransparentHeader title="" onBack={handleBack} />

      <ContentWrapper>
        <HeroImage src={RectangleXLImage} alt="협찬사" />

        <SponsorInfoSection>
          <SponsorName>협찬사 이름</SponsorName>

          <InfoTable>
            <InfoRow>
              <InfoLabel>운영 시간</InfoLabel>
              <InfoValue>종일</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>위치</InfoLabel>
              <InfoValue>
                <LinkButton variant="secondary" size="sm" href="#">
                  1번 부스
                </LinkButton>
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>SNS</InfoLabel>
              <InfoValue>
                <LinkButton
                  variant="secondary"
                  size="sm"
                  href="https://www.instagram.com"
                  target="_blank"
                >
                  @brandinsta
                </LinkButton>
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>URL</InfoLabel>
              <InfoValue>
                <LinkButton
                  variant="secondary"
                  size="sm"
                  href="https://www.website.com"
                  target="_blank"
                >
                  https://www.website.com
                </LinkButton>
              </InfoValue>
            </InfoRow>
          </InfoTable>
        </SponsorInfoSection>

        <Divider size="lg" />

        <Tab
          tabs={[
            {
              label: '소개',
              content: introductionContent,
            },
            {
              label: '제품 목록',
              content: productContent,
            },
          ]}
        />

        <Divider size="lg" />

        <EventSection>
          <EventTitle>
            {'{협찬사}'}와 EMC가 준비한
            <br />
            다양한 이벤트를 만나보세요.
          </EventTitle>

          <ButtonWrapper>
            <BoxButton
              variant="primary"
              size="md"
              style={{
                width: '335px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              이벤트 보러가기
              <ArrowRightIcon color="#FFFFFF" />
            </BoxButton>
          </ButtonWrapper>
        </EventSection>
      </ContentWrapper>
    </SponsorDetailContainer>
  );
}
