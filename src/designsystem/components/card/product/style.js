import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const ProductVerticalCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing8};
  width: 100%;
`;

export const ProductVerticalCardThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0;
  }
`;

export const ProductVerticalCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;

  padding-inline: ${measurement.spacing8};
  gap: ${measurement.spacing2};
`;

export const ProductVerticalCardName = styled.h3`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
  text-align: left;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ProductVerticalCardDescription = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
  text-align: left;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProductVerticalCardPrice = styled.span`
  ${typography.body1Semibold};
  color: ${semantic.textNormalStrong};
  align-self: flex-start;
`;

export const ProductHorizontalCardContainer = styled.div`
  display: flex;
  gap: ${measurement.spacing12};
`;

export const ProductHorizontalCardThumbnail = styled.div`
  width: 144px;
  height: 168px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }
`;

export const ProductHorizontalCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const ProductHorizontalCardName = styled.h3`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
`;

export const ProductHorizontalCardDescription = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;
