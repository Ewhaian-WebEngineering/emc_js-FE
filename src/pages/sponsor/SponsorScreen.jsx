import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import GiftIcon from '@/assets/svg/event/ic_gift.svg?react';
import SponsorCard from '@/designsystem/components/card/sponsor/SponsorCard';
import { SPONSORS } from './constants/sponsor';

import {
  SponsorContainer,
  ContentWrapper,
  IntroSection,
  IntroContent,
  IntroTitle,
  IntroDescription,
  SponsorList,
} from './style';
import { useGoBack } from '@/hooks/useGoBack';
import { SPONSOR_ROUTES } from '@/constants/routes';

export default function SponsorScreen() {
  const navigate = useNavigate();

  const handleBack = useGoBack();

  const handleSponsorClick = (sponsor) => {
    navigate(SPONSOR_ROUTES.DETAIL(sponsor.id));
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
          </IntroContent>

          <IntroDescription>
            다양한 협찬품과 이벤트로 종손을 200% 즐겨보세요!
          </IntroDescription>
        </IntroSection>

        <SponsorList>
          {SPONSORS.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              sponsorName={sponsor.sponsorName}
              sponsorDescription={sponsor.sponsorDescription}
              thumbnails={sponsor.thumbnails}
              onClick={() => handleSponsorClick(sponsor)}
            />
          ))}
        </SponsorList>
      </ContentWrapper>
    </SponsorContainer>
  );
}
