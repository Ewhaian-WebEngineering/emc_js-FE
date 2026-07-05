import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const EventCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing8};

  opacity: ${({ status }) => (status === 'ended' ? 0.6 : 1)};
`;

export const EventCardThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;

  img,
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${measurement.borderRadius2xl};
  }
`;

export const EventCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const EventCardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const EventCardTitle = styled.h3`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
`;

export const EventCardDate = styled.p`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const EventCardStatus = styled.span`
  ${typography.body2Medium};
  color: ${({ status }) =>
    status === 'ongoing' ? semantic.statusInfo : semantic.textNormalNormal};
`;
