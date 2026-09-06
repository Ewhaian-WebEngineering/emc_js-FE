import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing64};
  padding: ${measurement.spacing20} ${measurement.spacing16} 0
    ${measurement.spacing16};
`;

export const RecentSearchSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const SearchSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchSectionTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const RecentSearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${measurement.spacing8};
`;

export const TrendingBoothWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Ranking = styled.div`
  width: 20px;
  height: 20px;

  ${typography.body2Semibold};
  color: ${({ ranking }) =>
    ranking <= 3 ? semantic.textPrimaryNormal : semantic.textNormalNormal};
  text-align: left;
`;

export const BoothName = styled.div`
  ${typography.body2Regular};
  color: ${semantic.textNormalStrong};

  min-width: 0;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TrendingBoothSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
`;

export const UpdateTimeStamp = styled.p`
  ${typography.caption1Medium};
  color: ${semantic.textNormalAssistive};
`;

export const TrendingBoothGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-auto-flow: column;
  column-gap: ${measurement.spacing24};
  row-gap: ${measurement.spacing8};
`;
