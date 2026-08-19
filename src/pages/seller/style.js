import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const SellerAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const SellerAuthContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing16};
  padding-top: ${measurement.spacing128};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const SellerAuthTitle = styled.h2`
  color: ${semantic.textNormalStrong};
  margin-bottom: ${measurement.spacing36};
  ${typography.title3Semibold};

  span {
    color: ${semantic.textPrimaryNormal};
  }
`;

export const SellerAuthFooter = styled.div`
  padding: ${measurement.spacing16};
  padding-bottom: ${measurement.spacing6};
  margin-top: auto;

  & > button {
    width: 100%;
  }
`;
