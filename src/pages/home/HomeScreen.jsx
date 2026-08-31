import HomeHeader from '@/designsystem/components/header/HomeHeader';
import ArrowRightIconSmall from '@/assets/svg/20px/ic_arrow_right.svg?react';
import ArrowRightIcon from '@/assets/svg/24px/ic_arrow_right.svg?react';
import RepresentativeBannerImg from '@/assets/img/home/img_home_representative_banner.png';
import KakaoOpenChannelLogo from '@/assets/img/home/img_contact_us.png';
import {
  AdminCertificationWrapper,
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
import PopularBoothRanking from './components/PopularBoothRanking';
import ViewAllButton from './components/ViewAllButton';
import SponsorList from './components/SponsorList';
import EventTabs from './components/EventList';
import { FAQ_LIST } from '@/pages/home/constants/faq';
import FaqList from './components/FaqList';
import { semantic } from '@/designsystem/tokens/semantic';
import { useNavigate } from 'react-router-dom';
import {
  EVENT_ROUTES,
  NOTICE_ROUTE,
  SEARCH_ROUTES,
  SPONSOR_ROUTES,
} from '@/constants/routes';
import AdminCertification from '@/components/footer/AdminCertification';
import {
  useHomeEvents,
  useHomeSponsors,
  usePopularBooths,
} from '@/api/feature/home/useHomeData';

export default function HomeScreen() {
  const navigate = useNavigate();

  const { data: popularBoothData } = usePopularBooths();
  const { data: sponsorData } = useHomeSponsors();
  const { data: eventData } = useHomeEvents();

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
          <PopularBoothUpdateTime>
            오늘 {popularBoothData?.updatedAt || '00:00'} 기준
          </PopularBoothUpdateTime>
        </SectionHeader>
        <PopularBoothRanking list={popularBoothData?.booths || []} />
      </SectionContainer>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitleWrapper>
            <SectionTitle>협찬사</SectionTitle>
            <SectionSubTitle>
              제12회 종합손물세트와 함께하는 협찬사가 궁금하다면?
            </SectionSubTitle>
          </SectionTitleWrapper>
          <ViewAllButton
            onClick={() => {
              navigate(SPONSOR_ROUTES.LIST);
            }}
          />
        </SectionHeader>
        <SponsorList list={sponsorData || []} />
      </SectionContainer>

      <Divider size="lg" />

      <SectionContainer>
        <SectionHeader>
          <SectionTitleWrapper>
            <SectionTitle>EVENT</SectionTitle>
            <SectionSubTitle>
              이벤트 참여하고 제12회 종합손물세트 200% 즐기기
            </SectionSubTitle>
          </SectionTitleWrapper>
          <ViewAllButton
            onClick={() => {
              navigate(EVENT_ROUTES.LIST);
            }}
          />
        </SectionHeader>
        <EventTabs list={eventData || []} />
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
            window.open('http://pf.kakao.com/_KxjZhX/chat', '_blank');
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
      </ContactUsSection>

      <AdminCertificationWrapper>
        <AdminCertification />
      </AdminCertificationWrapper>
    </>
  );
}
