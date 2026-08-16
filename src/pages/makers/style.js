import styled from '@emotion/styled';

import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const MakersContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: ${semantic.fillNormalNormal};
  padding-bottom: ${measurement.spacing128};
`;

export const OrganizationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
`;

export const OrganizationTitle = styled.h2`
  ${typography.body1Semibold};
  color: ${semantic.textNormalStrong};
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  padding-left: ${measurement.spacing4};
`;

export const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const TeamTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing6};
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: ${measurement.borderRadiusRounded};
  background: ${semantic.iconNormalAssistive};
  flex-shrink: 0;
`;

export const TeamTitle = styled.h3`
  ${typography.body2Semibold};
  color: ${semantic.textNormalNormal};
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing6};
  padding-left: ${measurement.spacing16};
`;

export const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;

export const Name = styled.div`
  width: 80px;
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const StudentId = styled.div`
  width: 100px;
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const Major = styled.div`
  flex: 1;
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
