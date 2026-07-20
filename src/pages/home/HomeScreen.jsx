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
} from './style';
import HomeIconButton from './components/HomeIconButton';
import { ICON_LIST } from '@/constants/homeIcon';
import Divider from '@/designsystem/components/divider/Divider';

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
    </>
  );
}
