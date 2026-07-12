import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic';
import { measurement } from '../../designsystem/tokens/measurement';
import { typography } from '../../designsystem/tokens/typography';

export const AdminAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: ${measurement.spacing6};
`;

export const AdminAuthContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing16};
  padding-top: ${measurement.spacing128};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

<<<<<<< HEAD
export const AdminAuthDescription = styled.p`
  ${typography.body1Medium};
=======
export const AdminAuthTitle = styled.h2`
>>>>>>> 1df6d17 (feature(#91): 코드 리뷰 후 수정)
  color: ${semantic.textNormalStrong};
  margin-bottom: ${measurement.spacing36};
  ${typography.title3Semibold};

  span {
    color: ${semantic.textPrimaryNormal};
  }
`;

export const AdminAuthFooter = styled.div`
  padding: ${measurement.spacing16};
  margin-top: auto;

<<<<<<< HEAD
export const AdminAuthBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const AdminAuthButtonWrapper = styled.div`
=======
>>>>>>> 1df6d17 (feature(#91): 코드 리뷰 후 수정)
  width: 100%;
  & > button {
    width: 100%;
  }
`;

export const AdminAuthHeaderTitle = styled.span`
  ${typography.headline2Semibold};
`;
