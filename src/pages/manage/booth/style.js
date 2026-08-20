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

export const ActionButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;

export const SortableProductWrapper = styled.div`
  touch-action: none;
`;

export const GroupSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
`;

export const GroupHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${semantic.iconNormalNormal};
`;

export const GroupName = styled.h3`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
`;

export const GroupProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
`;
