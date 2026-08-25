import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const SponsorFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing32};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing48} ${measurement.spacing16};
`;

export const RichTextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const FieldLabel = styled.div`
  display: flex;
  gap: ${measurement.spacing4};
  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};

  span {
    color: ${semantic.statusDanger};
  }
`;
