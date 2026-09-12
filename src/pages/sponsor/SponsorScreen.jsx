import { useNavigate } from 'react-router-dom';
import { useSponsorList } from '@/api/feature/sponsor/useSponsorList';
import GiftIcon from '@/assets/svg/event/ic_gift.svg?react';
import { SPONSOR_ROUTES } from '@/constants/routes';
import SponsorCard from '@/designsystem/components/card/sponsor/SponsorCard';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';

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
  const handleBack = useGoBack();

  const { data: sponsors } = useSponsorList();

  const handleSponsorClick = (sponsorId) => {
    navigate(SPONSOR_ROUTES.DETAIL(sponsorId));
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
          {sponsors.map((sponsor) => {
            const thumbnails = [
              sponsor.imageUrl,
              ...(sponsor.products?.map((product) => product.imageUrl) ?? []),
            ];

            return (
              <SponsorCard
                key={sponsor.id}
                sponsorName={sponsor.name}
                sponsorDescription={sponsor.description}
                thumbnails={thumbnails}
                onClick={() => handleSponsorClick(sponsor.id)}
              />
            );
          })}
        </SponsorList>
      </ContentWrapper>
    </SponsorContainer>
  );
}
