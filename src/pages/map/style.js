import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const MapScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`;

export const MapArea = styled.div`
  min-height: 0;
  overflow: hidden;
  position: relative;
`;

export const InstructionsContainer = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16};
`;

export const InstructionsText = styled.p`
  ${typography.body2Medium};
  color: ${semantic.textNormalStrong};

  padding: ${measurement.spacing12} ${measurement.spacing16};
  background-color: ${semantic.fillNormalNormal};
  border-radius: ${measurement.borderRadiusLg};
`;

export const BoothListItemWrapper = styled.button`
  display: flex;
  gap: ${measurement.spacing6};
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

export const BoothNumber = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: ${measurement.borderRadiusSm};
  background-color: ${semantic.fillPrimaryAssistive};

  ${typography.caption1Regular};
  color: ${semantic.textPrimaryNormal};
  text-align: center;
`;

export const BoothName = styled.div`
  ${typography.caption1Medium};
  color: ${semantic.textNormalStrong};
  text-decoration: underline;
`;

export const BoothListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-template-rows: repeat(26, auto);
  gap: ${measurement.spacing12} ${measurement.spacing16};
  padding: ${measurement.spacing20};
`;

export const NoticeTagWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: ${measurement.spacing16};
  z-index: 10;
`;
