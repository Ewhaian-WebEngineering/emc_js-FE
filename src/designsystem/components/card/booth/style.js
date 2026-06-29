import styled from '@emotion/styled';
import { gray } from '../../../tokens/colors';
import { semantic } from '../../../tokens/semantic';
import { measurement } from '../../../tokens/measurement';
import { typography } from '../../../tokens/typography';

export const BoothHomeCardContainer = styled.div`
  display: flex;
  gap: ${measurement.spacing12};
`;

export const BoothCardThumbnail = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;

  & > img,
  & > div:first-of-type {
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
  min-width: 0;
  gap: ${measurement.spacing6};
`;

export const BoothCardNumber = styled.h2`
  ${typography.caption1Medium};
  color: ${semantic.textNormalAssistive};
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
