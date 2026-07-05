import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const SponsorCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const SponsorCardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const SponsorCardName = styled.h3`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const SponsorCardDescription = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const SponsorCardThumbnailWrapper = styled.div`
  display: flex;
  gap: ${measurement.spacing6};
`;

export const SponsorCardMainImage = styled.div`
  flex: 8;
  aspect-ratio: 1.5 / 1;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadius2xl} 0 0
      ${measurement.borderRadius2xl};
  }
`;

export const SponsorCardSubImages = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  gap: ${measurement.spacing6};
  flex-shrink: 0;
`;

export const SponsorCardSubImageTop = styled.div`
  width: 100%;
  flex: 1;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 ${measurement.borderRadius2xl} 0 0;
  }
`;

export const SponsorCardSubImageBottom = styled.div`
  width: 100%;
  flex: 1;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 ${measurement.borderRadius2xl} 0;
  }
`;
