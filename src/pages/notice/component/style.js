import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

const font = (token) => `
  font-family: ${token.fontFamily};
  font-weight: ${token.fontWeight};
  font-size: ${token.fontSize};
  line-height: ${token.lineHeight};
`;

export const GuideItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${measurement.spacing16};
`;

export const GuideItemBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${measurement.borderRadiusSm};
  background-color: ${semantic.fillPrimaryAssistive};
`;

export const GuideItemBadgeText = styled.p`
  ${font(typography.caption1Regular)}
  color: ${semantic.textPrimaryNormal};
`;

export const GuideItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing6};
`;

export const GuideItemTitle = styled.p`
  ${font(typography.body2Semibold)}
  color: ${semantic.textNormalStrong};
`;

export const GuideItemDescription = styled.p`
  ${font(typography.body2Regular)}
  color: ${semantic.textNormalStrong};
`;
