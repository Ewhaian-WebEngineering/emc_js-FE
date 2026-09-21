import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';
import { css } from '@emotion/react';

export const MapScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`;

export const MapArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
`;

export const InstructionsContainer = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16};
  padding-top: 0;
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

  &[data-focused='true'] {
    color: ${semantic.textPrimaryNormal};
  }
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
  z-index: 101;
`;

export const NoticeTagContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;

export const boothSelectionStyles = css`
  g[id^='booth-'],
  g[id^='sponsor-booth-'] {
    cursor: pointer;
  }

  g[id^='booth-'].selected > rect,
  g[id^='sponsor-booth-'].selected > rect {
    stroke: ${semantic.fillPrimaryNormal};
    stroke-width: 2;
  }
  g[id^='booth-'].selected g[id^='digit_'] > path:not([mask]),
  g[id^='sponsor-booth-'].selected g[id^='digit_'] > path:not([mask]) {
    fill: ${semantic.fillPrimaryNormal};
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: ${measurement.spacing8};
  padding-inline: ${measurement.spacing16};
`;
