import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const AccordionLineWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${semantic.fillNormalStrong};

  ${({ size }) =>
    `border-${size === 'md' ? 'top' : 'bottom'}: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};`}
`;

export const AccordionLineHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${measurement.spacing16};
  gap: ${measurement.spacing16};
  background-color: ${semantic.fillNormalWhite};
`;

export const AccordionLineTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const AccordionLineTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing4};

  ${({ size }) =>
    size === 'md' ? typography.body2Semibold : typography.headline2Semibold}
  color: ${semantic.textNormalStrong};
  line-height: 1;
`;

export const AccordionLineRequired = styled.span`
  ${typography.body1Semibold}
  color: ${semantic.statusDanger};
  line-height: 1;
`;

export const AccordionLineCount = styled.span`
  ${typography.caption1Medium}
  color: ${semantic.textNormalAssistive};
  line-height: 1;
`;

export const AccordionLineSubtitle = styled.span`
  ${typography.caption1Regular}
  color: ${semantic.textNormalAssistive};
`;

export const AccordionLineIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${semantic.iconNormalNormal};
  cursor: pointer;

  svg {
    transform: ${({ expanded }) =>
      expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const AccordionLineContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
  padding: ${measurement.spacing16};
  background-color: ${semantic.fillNormalWeak};
`;

export const AccordionLineContentGuideText = styled.p`
  ${typography.body2Regular}
  color: ${semantic.textNormalNormal};
  white-space: pre-line;
`;

export const AccordionDescriptionWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
  padding: ${measurement.spacing16};
`;

export const AccordionDescriptionTitle = styled.h3`
  ${typography.caption1Regular}
  color: ${semantic.textNormalAssistive};
`;

export const AccordionDescriptionText = styled.p`
  ${typography.caption2Regular}
  color: ${semantic.textNormalNormal};

  display: ${({ expanded }) => (expanded ? 'block' : '-webkit-box')};
  -webkit-line-clamp: ${({ expanded }) => (expanded ? 'unset' : 2)};
  -webkit-box-orient: vertical;
  overflow: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};
`;

export const AccordionDescriptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${measurement.spacing4};

  background: none;
  border: none;
  color: ${semantic.textNormalStrong};
  cursor: pointer;

  svg {
    transform: ${({ expanded }) =>
      expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;
