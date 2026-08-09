import styled from '@emotion/styled';
import { css } from '@emotion/react';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  background-color: ${semantic.fillNormalWhite};
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  transform: translateY(
    ${({ isHeaderVisible }) =>
      isHeaderVisible ? '0' : `-${measurement.spacing64}`}
  );
`;

export const ContentWrapper = styled.div`
  padding-bottom: ${measurement.spacing56};
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.h2`
  color: ${semantic.textNormalStrong};
  ${typography.headline2Semibold};
`;

export const SectionDescription = styled.p`
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const sectionBase = css`
  width: 100%;
  ${flexCenter};
`;

const sectionColumn = css`
  width: 100%;
  ${flexColumn};
`;

export const Text = styled.span`
  ${({ typo }) => typography[typo]};
  color: ${({ color }) => semantic[color] || semantic.textNormalStrong};
  text-align: ${({ align }) => align || 'left'};
  white-space: pre-wrap;
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px;`};
  ${({ mb }) => mb && `margin-bottom: ${mb};`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`};
  ${({ lineClamp }) =>
    lineClamp &&
    `
    display: -webkit-box;
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap};
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
  width: ${({ width }) => width && `${width}px`};
`;

export const Icon = styled.img`
  object-fit: contain;
`;

export const HeaderSpacer = styled.div`
  height: 100px;
`;

export const EventHero = styled.section`
  ${sectionColumn};
  height: 224px;
  padding: ${measurement.spacing40} 0;
  background-color: ${semantic.fillPrimaryAssistive};
`;

export const EventTypeBadge = styled.span`
  width: 85px;
  height: 32px;
  ${flexCenter};
  border-radius: ${measurement.borderRadiusRounded};
  background-color: ${semantic.fillPrimaryNormal};
  color: ${semantic.textNormalInverse};
  ${typography.body2Medium};
  margin-bottom: ${measurement.spacing16};
`;

export const EventContent = styled.section`
  ${sectionColumn};
  justify-content: center;
  min-height: 720px;
  background-color: ${semantic.fillNormalNormal};
`;

export const SponsorSection = styled.section`
  ${sectionBase};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const SponsorContent = styled(ColumnBox)`
  width: 335px;
  align-items: flex-start;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing32} 0;
`;

export const SponsorButton = styled(BoxButton)`
  width: 335px;
  gap: ${measurement.spacing4};
`;

export const ShareSection = styled.section`
  ${sectionBase};
  height: 260px;
`;

export const ShareBox = styled.div`
  width: 343px;
  height: 220px;
  ${flexColumn};
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing32} ${measurement.spacing40};
  border-radius: ${measurement.borderRadius3xl};
  background-color: ${semantic.fillPrimaryAssistive};
`;

export const ShareActions = styled.div`
  width: 168px;
  height: 112px;
  display: flex;
  gap: ${measurement.spacing24};
`;

export const ShareAction = styled.button`
  width: 72px;
  height: 112px;
  ${flexColumn};
  gap: ${measurement.spacing16};
  padding: 0 ${measurement.spacing8};
  background: none;
  border: none;
  cursor: pointer;
  color: ${semantic.textNormalNormal};
`;

export const ShareActionIcon = styled(Icon)`
  width: 56px;
  height: 56px;
`;

export const NoticeBox = styled.section`
  ${sectionColumn};
  height: 260px;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  background-color: ${semantic.fillNormalStrong};
`;

export const NoticeTitleIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`;
