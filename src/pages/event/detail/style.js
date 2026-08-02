import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';

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

const centerText = css`
  text-align: center;
`;

const sectionBase = css`
  width: 100%;
  ${flexCenter};
`;

const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap};
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  object-fit: contain;
`;

export const HeaderSpacer = styled.div`
  height: 100px;
`;

export const EventHero = styled.section`
  width: 100%;
  height: 224px;
  ${flexColumn};
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
  margin-bottom: 16px;
`;

export const EventTypeBadgeText = styled.span`
  width: 61px;
  height: 20px;
  ${flexCenter};
`;

export const EventTitle = styled.h1`
  width: 326px;
  height: 56px;
  ${flexCenter};
  ${typography.headline1Semibold};
  color: ${semantic.textNormalStrong};
  ${centerText};
  margin-bottom: 20px;
`;

export const EventPeriod = styled(RowBox)`
  width: 144px;
  height: 20px;
  gap: ${measurement.spacing4};
`;

export const EventPeriodText = styled.span`
  height: 20px;
  ${flexCenter};
  ${({ $isDate }) =>
    $isDate
      ? css`
          width: 88px;
          ${typography.body2Medium};
          color: ${semantic.textNormalStrong};
        `
      : css`
          width: 52px;
          ${typography.body2Regular};
          color: ${semantic.textNormalNormal};
        `}
`;

export const EventContent = styled.section`
  ${sectionBase};
  min-height: 720px;
  background-color: ${semantic.fillNormalNormal};
`;

export const EventContentText = styled.div`
  width: 120px;
  height: 26.5px;
  ${flexColumn};
  justify-content: center;
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
  ${centerText};
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

export const SponsorTitle = styled.h2`
  width: 149px;
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
  line-height: 46px;
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

export const ShareTitle = styled.h2`
  width: 206px;
  height: 20px;
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
  ${centerText};
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

export const ShareActionLabel = styled.span`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  ${centerText};
`;

export const NoticeBox = styled.section`
  width: 100%;
  height: 260px;
  ${flexColumn};
  padding: ${measurement.spacing24} ${measurement.spacing16};
  background-color: ${semantic.fillNormalStrong};
`;

export const NoticeContainer = styled(ColumnBox)`
  width: 343px;
  height: 92px;
  gap: ${measurement.spacing16};
`;

export const NoticeTitleRow = styled(RowBox)`
  width: 343px;
  height: 20px;
  gap: ${measurement.spacing2};
`;

export const NoticeTitleIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`;

export const NoticeTitle = styled.h2`
  width: 89px;
  height: 20px;
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const NoticeContent = styled.p`
  width: 335px;
  height: 56px;
  ${typography.caption1Regular};
  color: ${semantic.textNormalStrong};
  white-space: pre-wrap;
`;
