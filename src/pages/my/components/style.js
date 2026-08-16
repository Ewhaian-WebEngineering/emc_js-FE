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
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
  span {
    color: ${semantic.textPrimaryNormal};
  }
`;

export const MyLogout = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;
