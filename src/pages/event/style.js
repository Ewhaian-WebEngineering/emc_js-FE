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

export const EventTitle = styled(Text).attrs({ as: 'h1' })`
  ${typography.headline1Semibold};
  color: ${semantic.textNormalStrong};
  text-align: center;
  max-width: 326px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${measurement.spacing20};
`;

export const EventPeriodLabel = styled(Text)`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const EventPeriodValue = styled(Text)`
  ${typography.body2Medium};
  color: ${semantic.textNormalStrong};
`;

export const EventContentText = styled(Text)`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
  text-align: center;
`;

export const SponsorTitle = styled(Text).attrs({ as: 'h2' })`
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
`;

export const ShareTitle = styled(Text).attrs({ as: 'h2' })`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
  text-align: center;
`;

export const ShareActionLabel = styled(Text)`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  text-align: center;
`;

export const NoticeTitle = styled(Text).attrs({ as: 'h2' })`
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const NoticeText = styled(Text)`
  ${typography.caption1Regular};
  color: ${semantic.textNormalStrong};
  max-width: 335px;
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

export const ShareIconCircle = styled.div`
  width: 56px;
  height: 56px;
  ${flexCenter};
  border-radius: ${measurement.borderRadiusRounded};
`;

export const KakaoShareIconCircle = styled(ShareIconCircle)`
  background-color: #fee500;
`;

export const LinkShareIconCircle = styled(ShareIconCircle)`
  background-color: ${semantic.fillNormalWhite};
`;

export const EventHero = styled.section`
  ${sectionColumn};
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

export const NoticeBox = styled.section`
  ${sectionColumn};
  height: 260px;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  background-color: ${semantic.fillNormalStrong};
`;
