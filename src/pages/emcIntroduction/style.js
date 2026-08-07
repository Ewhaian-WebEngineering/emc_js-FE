import styled from '@emotion/styled';

import { measurement } from '../../designsystem/tokens/measurement';
import { semantic } from '../../designsystem/tokens/semantic';
import { typography } from '../../designsystem/tokens/typography';

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  background-image: linear-gradient(
    180deg,
    rgba(255, 248, 218, 0.2) 0%,
    rgba(252, 222, 200, 0.2) 40.87%,
    rgba(226, 0, 45, 0.2) 100%
  );
  color: ${semantic.textNormalStrong};
`;

export const Main = styled.main`
  width: 100%;
`;

export const IntroSection = styled.section`
  position: relative;
  width: 100%;
  padding: ${measurement.spacing56} ${measurement.spacing20}
    ${measurement.spacing48};
  overflow: hidden;
  text-align: center;
`;

export const LogoWatermark = styled.img`
  position: absolute;
  top: 234px;
  left: 50%;
  width: 310px;
  height: 310px;
  object-fit: contain;
  opacity: 0.1;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
`;

export const IntroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 226px;
`;

export const MainTitle = styled.h2`
  margin: ${measurement.spacing0};
  color: #902e34;
  font-family: ${typography.body2Semibold.fontFamily};
  font-weight: ${typography.body2Semibold.fontWeight};
  font-size: ${typography.body2Semibold.fontSize};
  line-height: ${typography.body2Semibold.lineHeight};
  text-align: center;
`;

export const Subtitle = styled.p`
  margin: ${measurement.spacing0};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: ${typography.caption1Medium.fontSize};
  line-height: ${typography.caption1Medium.lineHeight};
  text-align: center;
`;

export const Description = styled.p`
  width: 226px;
  margin: ${measurement.spacing32} ${measurement.spacing0}
    ${measurement.spacing0};
  color: ${semantic.textNormalStrong};
  font-family: ${typography.body2Medium.fontFamily};
  font-weight: ${typography.body2Medium.fontWeight};
  font-size: ${typography.body2Medium.fontSize};
  line-height: ${typography.body2Medium.lineHeight};
  text-align: center;
  white-space: pre-line;
`;

export const ParagraphList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${measurement.spacing48};
  gap: ${measurement.spacing20};
`;

export const Paragraph = styled.p`
  width: 100%;
  margin: ${measurement.spacing0};
  color: #902e34;
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  white-space: pre-line;
`;

export const ParagraphBold = styled.span`
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: 700;
  font-size: 10px;
  line-height: 100%;

  color: #902e34;
`;

export const RecruitSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${measurement.spacing8} ${measurement.spacing48}
    ${measurement.spacing16};
  text-align: center;
`;

export const RecruitText = styled.p`
  width: 270px;
  margin: ${measurement.spacing0};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 10px;
  text-align: right;
  white-space: pre-line;
`;

export const MemberSection = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  padding: ${measurement.spacing56} ${measurement.spacing20};
  gap: ${measurement.spacing20};
`;

export const MemberArea = styled.div`
  width: 139px;
  flex-shrink: 0;
`;

export const MemberTitle = styled.h2`
  margin: ${measurement.spacing0} ${measurement.spacing0}
    ${measurement.spacing16};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Semibold.fontFamily};
  font-weight: ${typography.caption1Semibold.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 11px;
`;

export const MemberGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
`;

export const MemberGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MemberGroupTitle = styled.h3`
  margin: ${measurement.spacing0} ${measurement.spacing0}
    ${measurement.spacing2};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Semibold.fontFamily};
  font-weight: ${typography.caption1Semibold.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 11px;
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Member = styled.p`
  margin: ${measurement.spacing0};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 11px;
  white-space: nowrap;
`;

export const ContactArea = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 130px;
  padding-bottom: ${measurement.spacing36};
  text-align: right;
`;

export const ContactGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &:not(:last-of-type) {
    margin-bottom: ${measurement.spacing16};
  }
`;

export const ContactTitle = styled.p`
  margin: ${measurement.spacing0};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 11px;
`;

export const ContactValue = styled.p`
  margin: ${measurement.spacing0};
  color: ${semantic.textNormalNormal};
  font-family: ${typography.caption1Medium.fontFamily};
  font-weight: ${typography.caption1Medium.fontWeight};
  font-size: ${measurement.spacing8};
  line-height: 11px;
`;
