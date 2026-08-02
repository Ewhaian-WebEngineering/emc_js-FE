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
