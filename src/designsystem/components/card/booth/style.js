import styled from '@emotion/styled';
import { gray } from '../../../tokens/colors';
import { semantic } from '../../../tokens/semantic';
import { measurement } from '../../../tokens/measurement';
import { typography } from '../../../tokens/typography';

export const BoothHomeCardContainer = styled.div`
  display: flex;
  gap: ${measurement.spacing12};
`;

export const BoothDetailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 82px;
  gap: ${measurement.spacing6};
`;

export const BoothCardThumbnailSm = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadiusMd};
  }
`;

export const BoothCardThumbnailMd = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  flex-shrink: 0;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadiusMd};
  }
`;

export const BoothCardMarks = styled.div`
  position: absolute;
  bottom: 3px;
  left: 4px;

  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing2};
`;

export const BoothCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  gap: ${measurement.spacing6};
`;

export const BoothCardNumber = styled.h2`
  ${typography.caption1Medium};
  color: ${semantic.textNormalAssistive};
`;

export const BoothCardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing2};
`;

export const BoothCardName = styled.h3`
  ${typography.body2Medium};
  color: ${semantic.textNormalStrong};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BoothCardBadges = styled.div`
  display: flex;
  gap: ${measurement.spacing4};
`;

export const BoothCardMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  padding-inline: ${measurement.spacing4};

  border-radius: ${measurement.borderRadiusMd};
  background-color: ${gray[100]};

  ${typography.caption1Medium};
  color: ${gray[500]};
`;

export const BoothListCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const BoothListCardThumbnailsWrapper = styled.div`
  display: flex;
  gap: ${measurement.spacing6};
`;

export const BoothListCardThumbnail = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 1 / 1;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadiusMd};
  }
`;

export const BoothListCardInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BoothListCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;

export const BoothListCardTitle = styled.h2`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
`;

export const BoothListCardBookmarkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    color: ${({ isBookmarked }) =>
      isBookmarked ? semantic.iconPrimaryNormal : semantic.iconNormalAssistive};
  }
`;

export const BoothListCardDescription = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
