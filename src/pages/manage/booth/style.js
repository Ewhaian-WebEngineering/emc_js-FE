import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing32};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing48} ${measurement.spacing16};
`;

export const CategoryLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const CategoryLabelTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryLabelMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};

  ${typography.body1Semibold};
  color: ${semantic.textNormalNormal};

  span {
    color: ${semantic.statusDanger};
  }
`;

export const CategoryLabelMultiple = styled.p`
  ${typography.caption1Regular};
  color: ${semantic.textNormalAssistive};
`;

export const CategoryLabelOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${measurement.spacing8};
`;
