import styled from '@emotion/styled';

import { gray } from '@/designsystem/tokens/colors';
import { typography } from '@/designsystem/tokens/typography';

export const NoticeScreenContainer = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 812px;

  margin: 0 auto;

  background: white;

  border: 1px solid #b0b0b0;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

export const GuideSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding: 20px;

  gap: 16px;
`;

export const NoticeSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 20px 40px;

  gap: 14px;
`;

export const SectionTitle = styled.h2`
  margin: 0;

  font-family: ${typography.headline2Semibold.fontFamily};
  font-size: ${typography.headline2Semibold.fontSize};
  font-weight: ${typography.headline2Semibold.fontWeight};
  line-height: 24px;

  color: ${gray[800]};
`;

export const ChipGroup = styled.div`
  display: flex;

  gap: 8px;
`;

export const GuideList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`;

export const GuideItemWrapper = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 12px;
`;

export const GuideItemNumber = styled.div`
  width: 22px;
  height: 22px;

  border-radius: 4px;

  background: ${gray[100]};

  flex-shrink: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  font-family: ${typography.body2Regular.fontFamily};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};

  color: ${gray[800]};
`;

export const GuideItemText = styled.p`
  margin: 0;

  flex: 1;

  font-family: ${typography.body2Regular.fontFamily};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};

  line-height: 22px;

  color: ${gray[800]};
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const NoticeListItem = styled.p`
  margin: 0;

  font-family: ${typography.body2Regular.fontFamily};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};

  line-height: 22px;

  color: ${gray[800]};
`;
