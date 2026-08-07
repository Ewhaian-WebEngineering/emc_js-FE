import styled from '@emotion/styled';

import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const MakersContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: ${semantic.fillNormalWhite};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrganizationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const OrganizationTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  margin: 0;
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
`;

export const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TeamTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const Dot = styled.div`
  width: ${measurement.spacing4};
  height: ${measurement.spacing4};
  border-radius: 50%;
  background: ${semantic.iconNormalAssistive};
  flex-shrink: 0;
`;

export const TeamTitle = styled.p`
  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};
  margin: 0;
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing6};
  margin-top: ${measurement.spacing12};
`;

export const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
  height: ${measurement.spacing20};
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
