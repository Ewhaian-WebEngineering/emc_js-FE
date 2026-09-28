import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const BoothListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: ${measurement.spacing16};
  padding-bottom: 120px;
`;

export const BoothListCardWrapper = styled.div`
  margin-block: ${measurement.spacing20};
`;

export const ToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${measurement.spacing8} ${measurement.spacing16};
`;

export const BoothCount = styled.p`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const ToolBarActions = styled.div`
  display: flex;
  gap: 14px;
`;

export const RepresentativeImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BoothMarks = styled.div`
  position: absolute;
  display: flex;
  bottom: ${measurement.spacing16};
  left: ${measurement.spacing16};
`;

export const BoothInfo = styled.div`
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const BoothInfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${measurement.spacing12};
`;

export const BoothName = styled.h1`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const Badges = styled.div`
  display: flex;
  gap: ${measurement.spacing4};
  margin-bottom: ${measurement.spacing20};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing12};
`;

export const InfoLabel = styled.dt`
  flex: 0 0 64px;
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const InfoValue = styled.dd`
  flex: 1;
  ${typography.caption1Medium};
  color: ${semantic.textNormalStrong};
`;

export const NoticeCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing12};
  margin-top: ${measurement.spacing24};
  padding: ${measurement.spacing8} ${measurement.spacing12};
  border-radius: ${measurement.borderRadiusLg};
  background-color: ${semantic.fillPrimaryAssistive};
  border: none;
  width: 100%;
  cursor: pointer;

  & > svg {
    flex-shrink: 0;
    size: 16px;
  }
`;

export const NoticeContent = styled.p`
  ${typography.body2Medium};
  color: ${({ announcement }) =>
    announcement ? semantic.textNormalStrong : semantic.textNormalNormal};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: translateY(0);
`;

export const TabSection = styled.section`
  padding-inline: ${measurement.spacing16};
`;

export const RecommendBooths = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing128} ${measurement.spacing16};
`;

export const RecommendBoothTitle = styled.h2`
  ${typography.headline1Semibold};
  color: ${semantic.textNormalStrong};
  text-align: left;
`;

export const RecommendBoothList = styled.div`
  display: flex;
  gap: ${measurement.spacing12};
  margin-inline: -${measurement.spacing16};
  padding-inline: ${measurement.spacing16};
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 0;
`;

export const AdminCertificationSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing4};

  p {
    ${typography.body2Regular}
    color: ${semantic.textNormalNormal};
  }
`;
