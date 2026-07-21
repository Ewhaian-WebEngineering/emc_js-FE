import HomeHeader from '@/designsystem/components/header/HomeHeader';
import Placeholder from '@/assets/img/img_checker.png';
import ArrowRightIcon from '@/assets/svg/24px/ic_arrow_right.svg?react';
import {
  ArrowRightIconButton,
  HomeIconButtonSection,
  HomeNoticeContainer,
  HomeNoticeSubtitle,
  HomeNoticeTitle,
  HomeNoticeTitleWrapper,
  IntroImage,
  PopularBoothUpdateTime,
  SectionContainer,
  SectionHeader,
  SectionSubTitle,
  SectionTitle,
  SectionTitleWrapper,
} from './style';
import HomeIconButton from './components/HomeIconButton';
import { ICON_LIST } from '@/constants/home/icon';
import Divider from '@/designsystem/components/divider/Divider';
import { POPULAR_BOOTH_LIST } from '@/constants/home/popularBooth';
import PopularBoothRanking from './components/PopularBoothRanking';
import ViewAllButton from './components/ViewAllButton';
import SponsorList from './components/SponsorList';
import { SPONSOR_LIST } from '@/constants/home/sponsor';
import EventTabs from './components/EventList';
import { EVENT_LIST } from '@/constants/home/event';

export default function HomeScreen() {
  return (
    <>
      <HomeHeader
        onSearchClick={() => {
          // TODO: 검색 페이지 이동
          alert('search button clicked');
        }}
      />

      {/* TODO: 종합손물세트 소개 이미지 추가 */}
      <IntroImage src={Placeholder} alt="종합손물세트 소개" />

      <HomeNoticeContainer>
        <HomeNoticeTitleWrapper>
          <HomeNoticeSubtitle>
            종합손물세트를 더 잘 즐기기 위한
          </HomeNoticeSubtitle>
          <HomeNoticeTitle>안내사항 바로가기</HomeNoticeTitle>
        </HomeNoticeTitleWrapper>
        <ArrowRightIconButton
          onClick={() => {
            // TODO: 안내사항 페이지 이동
            alert('notice button clicked');
          }}
        >
          <ArrowRightIcon />
        </ArrowRightIconButton>
      </HomeNoticeContainer>

      <HomeIconButtonSection>
        {ICON_LIST.map(({ key, label, icon }) => (
          <HomeIconButton key={key} label={label} icon={icon} />
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
    </>
  );
}
