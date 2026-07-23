import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import GiftIcon from '@/assets/svg/event/ic_gift.svg?react';
import SponsorCard from '@/designsystem/components/card/sponsor/SponsorCard';

import {
  SponsorContainer,
  ContentWrapper,
  IntroSection,
  IntroContent,
  IntroTitle,
  IntroDescription,
  SponsorList,
} from './style';

export default function SponsorScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const sponsors = [
    {
      sponsorName: '협찬사 이름 영역입니다. 협찬사 이름 영역입니다.',
      sponsorDescription:
        '협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다.',
      thumbnails: ['', '', ''],
    },
    {
      sponsorName: '협찬사 이름 영역입니다. 협찬사 이름 영역입니다.',
      sponsorDescription:
        '협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다.',
      thumbnails: ['', '', ''],
    },
    {
      sponsorName: '협찬사 이름 영역입니다. 협찬사 이름 영역입니다.',
      sponsorDescription:
        '협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다.',
      thumbnails: ['', '', ''],
    },
    {
      sponsorName: '협찬사 이름 영역입니다. 협찬사 이름 영역입니다.',
      sponsorDescription:
        '협찬사 소개글 최대 2줄입니다. 협찬사 소개글 최대 2줄입니다.',
      thumbnails: ['', '', ''],
    },
  ];

  const handleSponsorClick = (index) => {
    console.log(index);
  };

  return (
    <SponsorContainer>
      <FillCenterHeader onBack={handleBack} title="협찬사" />

      <ContentWrapper>
        <IntroSection>
          <IntroContent>
            <GiftIcon />

            <IntroTitle>
              제12회 종합손물세트와 함께하는
              <br />
              다양한 협찬사가 소개합니다.
            </IntroTitle>

            <IntroDescription>
              다양한 협찬품과 이벤트로 종손을 200% 즐겨보세요!
            </IntroDescription>
          </IntroContent>
        </IntroSection>

        <SponsorList>
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={index}
              sponsorName={sponsor.sponsorName}
              sponsorDescription={sponsor.sponsorDescription}
              thumbnails={sponsor.thumbnails}
              onClick={() => handleSponsorClick(index)}
            />
          ))}
        </SponsorList>
      </ContentWrapper>
    </SponsorContainer>
  );
}
