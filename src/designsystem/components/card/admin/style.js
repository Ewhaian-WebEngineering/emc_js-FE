import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

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
  align-items: center;

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

export const AdminSpProductCardThumbnail = styled.div`
  width: 82px;
  height: 82px;
  flex-shrink: 0;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadiusMd};
  }
`;

export const AdminProductCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: ${measurement.spacing16};
`;

export const AdminSpProductCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: ${measurement.spacing8};
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

export const AdminCardBottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const AdminCardColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};
  padding: ${measurement.spacing12};

  border: 1px solid
    ${({ selected }) =>
      selected ? semantic.textPrimaryNormal : semantic.borderNormalStrong};
  border-radius: ${measurement.borderRadiusLg};
`;

export const AdminCardContent = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const AdminCardContentOneLine = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AdminCardDate = styled.span`
  ${typography.body2Regular};
  color: ${semantic.textNormalAssistive};
`;

export const AdminBoothCardTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const AdminBoothCardNumber = styled.span`
  ${typography.body1Medium};
  color: ${semantic.textPrimaryNormal};
`;
