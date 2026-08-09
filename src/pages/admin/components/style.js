import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const CongestionListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing24} ${measurement.spacing16} 0;
`;

export const CongestionItem = styled.li`
  display: flex;
  align-items: center;

  padding: ${measurement.spacing16} ${measurement.spacing8};
  border-radius: ${measurement.borderRadiusLg};

  background-color: ${({ selected }) =>
    selected ? semantic.fillNormalStrong : 'transparent'};

  cursor: pointer;

  ${typography.body1Regular}
  color: ${semantic.textNormalStrong};
`;

export const CongestionButtonWrapper = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
  margin-top: ${measurement.spacing40};

  & > button {
    width: 100%;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
