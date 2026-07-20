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
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${semantic.fillNormalWhite};
  padding-inline: ${measurement.spacing16};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: ${measurement.spacing32};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const EntrySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
`;

export const NoticeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
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
  gap: ${measurement.spacing16};
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
  padding-bottom: ${measurement.spacing48};
`;

export const GuideItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${measurement.spacing12};
`;

export const GuideItemBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${measurement.borderRadiusSm};
  background-color: ${semantic.fillPrimaryAssistive};
  ${typography.caption1Regular}
  color: ${semantic.textPrimaryNormal};
`;

export const GuideItemContent = styled.p`
  ${typography.body2Regular}
  color: ${semantic.textNormalStrong};

  span {
    ${typography.body2Semibold}
  }
`;
