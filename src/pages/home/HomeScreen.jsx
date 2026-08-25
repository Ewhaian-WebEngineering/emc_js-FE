import HomeHeader from '@/designsystem/components/header/HomeHeader';
import ArrowRightIconSmall from '@/assets/svg/20px/ic_arrow_right.svg?react';
import ArrowRightIcon from '@/assets/svg/24px/ic_arrow_right.svg?react';
import RepresentativeBannerImg from '@/assets/img/home/img_home_representative_banner.png';
import KakaoOpenChannelLogo from '@/assets/img/home/img_contact_us.png';
import {
  AdminCertificationSection,
  ArrowRightIconButton,
  ContactUsSection,
  HomeIconButtonSection,
  HomeNoticeContainer,
  HomeNoticeSubtitle,
  HomeNoticeTitle,
  HomeNoticeTitleWrapper,
  IntroImage,
  KakaoOpenChannelButton,
  KakaoOpenChannelContent,
  PopularBoothUpdateTime,
  SectionContainer,
  SectionHeader,
  SectionSubTitle,
  SectionTitle,
  SectionTitleWrapper,
} from './style';
import HomeIconButton from './components/HomeIconButton';
import { ICON_LIST } from '@/pages/home/constants/icon';
import Divider from '@/designsystem/components/divider/Divider';
import { POPULAR_BOOTH_LIST } from '@/pages/home/constants/popularBooth';
import PopularBoothRanking from './components/PopularBoothRanking';
import ViewAllButton from './components/ViewAllButton';
import SponsorList from './components/SponsorList';
import { SPONSOR_LIST } from '@/pages/home/constants/sponsor';
import EventTabs from './components/EventList';
import { EVENT_LIST } from '@/pages/home/constants/event';
import { FAQ_LIST } from '@/pages/home/constants/faq';
import FaqList from './components/FaqList';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import { semantic } from '@/designsystem/tokens/semantic';
import { useNavigate } from 'react-router-dom';
import { NOTICE_ROUTE, SEARCH_ROUTES } from '@/constants/routes';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      <HomeHeader
        onSearchClick={() => {
          navigate(SEARCH_ROUTES.SEARCH);
        }}
      />

      <IntroImage src={RepresentativeBannerImg} alt="종합손물세트 소개" />

      <HomeNoticeContainer>
        <HomeNoticeTitleWrapper>
          <HomeNoticeSubtitle>
            종합손물세트를 더 잘 즐기기 위한
          </HomeNoticeSubtitle>
          <HomeNoticeTitle>안내사항 바로가기</HomeNoticeTitle>
        </HomeNoticeTitleWrapper>
        <ArrowRightIconButton
          onClick={() => {
            navigate(NOTICE_ROUTE);
          }}
        >
          <ArrowRightIcon color={semantic.iconNormalStrong} />
        </ArrowRightIconButton>
      </HomeNoticeContainer>

      <HomeIconButtonSection>
        {ICON_LIST.map(({ key, label, icon }) => (
          <HomeIconButton
            key={key}
            label={label}
            icon={icon}
            onClick={() => {
              navigate(ICON_LIST.find((item) => item.key === key)?.route);
            }}
          />
        ))}
      </HomeIconButtonSection>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>실시간 인기 부스 TOP 10</SectionTitle>
          {/* TODO: 업데이트 시간 추가 */}
          <PopularBoothUpdateTime>오늘 HH:MM 기준</PopularBoothUpdateTime>
        </SectionHeader>
        <PopularBoothRanking list={POPULAR_BOOTH_LIST} />
      </SectionContainer>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitleWrapper>
            <SectionTitle>협찬사</SectionTitle>
            <SectionSubTitle>협찬사 관련 멘트 영역입니다.</SectionSubTitle>
          </SectionTitleWrapper>
          <ViewAllButton
            onClick={() => {
              // TODO: 협찬사 전체보기 페이지 이동
              alert('view all sponsor button clicked');
            }}
          />
        </SectionHeader>
        <SponsorList list={SPONSOR_LIST} />
      </SectionContainer>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitleWrapper>
            <SectionTitle>EVENT</SectionTitle>
            <SectionSubTitle>이벤트 관련 멘트 영역입니다.</SectionSubTitle>
          </SectionTitleWrapper>
          <ViewAllButton
            onClick={() => {
              // TODO: 이벤트 전체보기 페이지 이동
              alert('view all event button clicked');
            }}
          />
        </SectionHeader>
        <EventTabs list={EVENT_LIST} />
      </SectionContainer>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>자주 묻는 질문 FAQ</SectionTitle>
        </SectionHeader>
        <FaqList list={FAQ_LIST} />
      </SectionContainer>

      <ContactUsSection>
        <KakaoOpenChannelButton
          onClick={() => {
            // TODO: 카카오톡 오픈채널 페이지 이동
            alert('kakao open channel button clicked');
          }}
        >
          <KakaoOpenChannelContent>
            <img src={KakaoOpenChannelLogo} alt="카카오톡 오픈채널" />
            <p>
              원하는 답변이 없다면?
              <br />
              EMC 카카오톡 오픈채널에 문의하기
            </p>
          </KakaoOpenChannelContent>
          <ArrowRightIconSmall />
        </KakaoOpenChannelButton>
        <AdminCertificationSection>
          <p>부스 또는 EMC 운영진이신가요?</p>
          <LinkButton
            variant="secondary"
            size="sm"
            // TODO: 셀러/관리자 인증 페이지 이동
            onClick={() => alert('admin certification button clicked')}
          >
            셀러/관리자 인증
          </LinkButton>
        </AdminCertificationSection>
      </ContactUsSection>
    </>
  );
}
