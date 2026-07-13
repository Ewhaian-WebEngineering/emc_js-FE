import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

const font = (token) => `
  font-family: ${token.fontFamily};
  font-weight: ${token.fontWeight};
  font-size: ${token.fontSize};
  line-height: ${token.lineHeight};
`;

export const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${semantic.fillNormalWhite};
  padding: 0 ${measurement.spacing16} ${measurement.spacing32};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${measurement.spacing32};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
`;

export const SectionTitle = styled.h2`
  ${font(typography.body1Semibold)}
  color: ${semantic.textNormalStrong};
`;

export const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
`;

export const NoticeDescription = styled.p`
  ${font(typography.body2Regular)}
  color: ${semantic.textNormalStrong};
  white-space: pre-line;
`;

export const DividerWrapper = styled.div`
  margin-top: ${measurement.spacing48};
  margin-bottom: ${measurement.spacing32};
`;

export const NoticeSectionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;
