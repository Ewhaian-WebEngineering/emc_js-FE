import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const CongestionListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
`;

export const CongestionButtonWrapper = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};

  & > button {
    width: 100%;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.p`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  margin-top: ${({ isFirst }) => (isFirst ? 0 : `${measurement.spacing28}`)};
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;
