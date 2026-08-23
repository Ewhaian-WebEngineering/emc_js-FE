import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const ProductFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing40};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing144} ${measurement.spacing16};
`;

export const ProductFormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const ProductFormTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};

  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};

  span {
    color: ${semantic.statusDanger};
  }
`;

export const ProductFormOptions = styled.div`
  display: flex;
  gap: ${measurement.spacing8};
  white-space: nowrap;
`;

export const ProductAddSheetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing32};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
`;

export const ProductAddSheetBottom = styled.div`
  display: flex;
  gap: ${measurement.spacing8};
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};

  & > button {
    flex: 1;
  }
`;
