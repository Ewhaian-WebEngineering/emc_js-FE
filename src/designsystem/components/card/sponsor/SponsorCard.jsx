import CardPlaceholder from '../CardPlaceholder';
import {
  SponsorCardContainer,
  SponsorCardDescription,
  SponsorCardMainImage,
  SponsorCardName,
  SponsorCardSubImageTop,
  SponsorCardSubImageBottom,
  SponsorCardSubImages,
  SponsorCardTextWrapper,
  SponsorCardThumbnailWrapper,
} from './style';

export default function SponsorCard({
  sponsorName,
  sponsorDescription,
  thumbnails = [],
  onClick,
}) {
  const [mainImage, ...subImages] = thumbnails;

  return (
    <SponsorCardContainer onClick={onClick}>
      <SponsorCardTextWrapper>
        <SponsorCardName>{sponsorName}</SponsorCardName>
        <SponsorCardDescription>{sponsorDescription}</SponsorCardDescription>
      </SponsorCardTextWrapper>
      <SponsorCardThumbnailWrapper>
        <SponsorCardMainImage>
          {mainImage ? (
            <img src={mainImage} alt={`${sponsorName} main thumbnail`} />
          ) : (
            <CardPlaceholder />
          )}
        </SponsorCardMainImage>
        <SponsorCardSubImages>
          {subImages.slice(0, 2).map((thumbnail, index) => {
            const Wrapper =
              index === 0 ? SponsorCardSubImageTop : SponsorCardSubImageBottom;
            return (
              <Wrapper key={index}>
                {thumbnail ? (
                  <img src={thumbnail} alt={sponsorName} />
                ) : (
                  <CardPlaceholder size="40%" />
                )}
              </Wrapper>
            );
          })}
        </SponsorCardSubImages>
      </SponsorCardThumbnailWrapper>
    </SponsorCardContainer>
  );
}
