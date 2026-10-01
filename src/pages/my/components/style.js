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

export const LoginBottomSheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing12} ${measurement.spacing16};

  h2 {
    ${typography.title3Semibold};
    color: ${semantic.textNormalStrong};
  }

  p {
    ${typography.body1Regular};
    color: ${semantic.textNormalNormal};
  }
`;

export const KakaoLoginButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing96} ${measurement.spacing16};
`;

export const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing4};
  padding: ${measurement.spacing14} ${measurement.spacing16};

  width: 100%;
  background-color: #fee500;
  border-radius: ${measurement.borderRadiusXl};
  color: #191919;
  ${typography.body1Semibold};

  border: none;
  cursor: pointer;
`;

export const BannerCarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 80px;
  border-radius: ${measurement.borderRadiusMd};
  border: ${measurement.borderWidthSm} solid ${semantic.borderNormalAssistive};
`;

export const BannerSlideTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
`;

export const BannerSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  overflow: hidden;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;
