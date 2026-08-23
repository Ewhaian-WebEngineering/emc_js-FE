import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';
import { Z_INDEX } from '@/constants/zIndex';

export const StatRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatRowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const StatRowLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;

export const StatRowTooltipPosition = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: -${measurement.spacing32};
  z-index: ${Z_INDEX.card};
  margin-top: ${measurement.spacing4};

  width: max-content;
  max-width: 280px;
`;

export const StatRowLabel = styled.span`
  ${typography.body2Semibold};
  color: ${semantic.textNormalNormal};
`;

export const StatRowTooltipButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  color: ${semantic.iconNormalNormal};
`;

export const StatRowValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatRowValue = styled.span`
  ${typography.body1Semibold};
  color: ${({ color }) => color || semantic.textNormalStrong};

  display: inline-flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;

export const StatRowUnit = styled.span`
  ${typography.caption1Medium};
  color: ${semantic.textNormalNormal};
`;

export const StatRowActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;

  color: ${semantic.iconNormalAssistive};
`;

export const ManagementCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing16};
  gap: 18px;

  border: 1px solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalStrong};
`;

export const ManagementFairCardHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  padding: ${measurement.spacing12} 19px;

  border-radius: ${measurement.borderRadius3xl} 0 ${measurement.borderRadius3xl}
    0;
  background-color: ${semantic.fillPrimaryNormal};

  ${typography.headline2Semibold};
  color: ${semantic.textNormalInverse};
`;

export const ManagementCardLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-block: ${measurement.spacing2};

  border: none;
  background: none;
  cursor: pointer;

  ${typography.body2Semibold};
  color: ${semantic.textNormalNormal};
`;

export const ManagementCardStats = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing16};
  gap: ${measurement.spacing16};

  border-radius: ${measurement.borderRadiusLg};
  background-color: ${semantic.fillNormalWhite};
`;

export const ManagementBoothCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ManagementBoothCardHeaderTitle = styled.div`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;
