import Image from '../../Image';
import CardPlaceholder from '../../Placeholder';
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

/**
 * 협찬사 카드 컴포넌트입니다.
 * 협찬사 목록 화면에서 사용됩니다.
 *
 * @param {string} sponsorName - 협찬사 이름
 * @param {string} sponsorDescription - 협찬사 소개글
 * @param {Array<string>} [thumbnails=[]] - 협찬사 이미지 URL 목록, 첫 번째는 메인 이미지로 사용되고 이미지가 없으면 placeholder 표시
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
export default function SponsorCard({
  sponsorName,
  sponsorDescription,
  thumbnails = [],
  onClick,
}) {
  const [mainImage, ...subImages] = thumbnails;
  const displaySubImages = [subImages[0], subImages[1]];

  return (
    <SponsorCardContainer onClick={onClick}>
      <SponsorCardTextWrapper>
        <SponsorCardName>{sponsorName}</SponsorCardName>
        <SponsorCardDescription>{sponsorDescription}</SponsorCardDescription>
      </SponsorCardTextWrapper>
      <SponsorCardThumbnailWrapper>
        <SponsorCardMainImage>
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`${sponsorName} main thumbnail`}
              width={1200}
            />
          ) : (
            <CardPlaceholder />
          )}
        </SponsorCardMainImage>
        <SponsorCardSubImages>
          {displaySubImages.map((thumbnail, index) => {
            const Wrapper =
              index === 0 ? SponsorCardSubImageTop : SponsorCardSubImageBottom;
            return (
              <Wrapper key={index}>
                {thumbnail ? (
                  <Image src={thumbnail} alt={sponsorName} />
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
