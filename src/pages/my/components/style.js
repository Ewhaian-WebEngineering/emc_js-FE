import styled from '@emotion/styled';
import { semantic } from '../../../designsystem/tokens/semantic';
import { measurement } from '../../../designsystem/tokens/measurement';
import { typography } from '../../../designsystem/tokens/typography';

export const InquiryListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InquiryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${measurement.spacing20} 0;
  align-self: stretch;
`;

export const InquiryTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const InquiryTitle = styled.div`
  color: ${semantic.textNormalStrong};
  ${typography.body1Semibold};
`;

export const InquirySubtitle = styled.div`
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

export const MyUserName = styled.h2`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};

  span {
    ${typography.title3Semibold};
  }

  span:first-of-type {
    color: ${semantic.textPrimaryNormal};
  }

  span:last-of-type {
    color: ${semantic.textNormalStrong};
  }
`;

export const MyLogoutGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyLogoutIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${semantic.iconNormalNormal};
`;
