import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const EventFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: ${measurement.spacing110};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing0} ${measurement.spacing16};
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CategoryTitle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};

  & > span {
    color: ${semantic.statusDanger};
  }
`;

export const TagGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
