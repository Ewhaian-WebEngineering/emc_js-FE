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
