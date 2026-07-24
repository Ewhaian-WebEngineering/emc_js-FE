import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic';
import { measurement } from '../../designsystem/tokens/measurement';
import { typography } from '../../designsystem/tokens/typography';

export const AdminAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const AdminAuthContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing16};
  padding-top: ${measurement.spacing128};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const AdminAuthTitle = styled.h2`
  color: ${semantic.textNormalStrong};
  margin-bottom: ${measurement.spacing36};
  ${typography.title3Semibold};

  span {
    color: ${semantic.textPrimaryNormal};
  }
`;

export const AdminAuthFooter = styled.div`
  padding: ${measurement.spacing16};
  padding-bottom: ${measurement.spacing6};
  margin-top: auto;

  & > button {
    width: 100%;
  }
`;

export const DashboardHeaderWrapper = styled.div`
  flex-shrink: 0;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: ${measurement.spacing144};
`;

export const FestivalInfo = styled.div`
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing64} ${measurement.spacing16};
`;

export const ManagementCardStats = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing16};
  gap: ${measurement.spacing16};

  border-radius: ${measurement.borderRadiusLg};
  background-color: ${semantic.fillNormalStrong};
`;

export const DashboardTitle = styled.p`
  color: ${semantic.textNormalStrong};
  ${typography.title3Semibold};
  margin-bottom: ${measurement.spacing36};
`;

export const DashboardTitleHighlight = styled.span`
  color: ${semantic.textPrimaryNormal};
`;
