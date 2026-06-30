import styled from '@emotion/styled';
import { semantic } from '../../../tokens/semantic';
import { measurement } from '../../../tokens/measurement';
import { typography } from '../../../tokens/typography';

export const AdminCardActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;

export const ActionCardActionsDivider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${semantic.borderNormalStrong};
`;

export const AdminCardRowContainer = styled.div`
  display: flex;
  gap: ${measurement.spacing12};
  padding: ${measurement.spacing12};

  border: 1px solid
    ${({ selected }) =>
      selected ? semantic.textPrimaryNormal : semantic.borderNormalStrong};
  border-radius: ${measurement.borderRadiusLg};
`;

export const AdminProductCardThumbnail = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadiusMd};
  }
`;

export const AdminProductCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: ${measurement.spacing16};
`;

export const AdminCardTitle = styled.h3`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AdminCardPrice = styled.span`
  ${typography.body1Semibold};
  color: ${semantic.textNormalStrong};
`;

export const AdminCardBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
