import styled from '@emotion/styled';
import { gray } from '@/designsystem/tokens/colors';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const IntroImage = styled.img`
  display: block;
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

export const HomeNoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${measurement.spacing20} ${measurement.spacing16};
  background-color: ${semantic.fillNormalNormal};
`;

export const HomeNoticeTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HomeNoticeSubtitle = styled.p`
  font-family: 'Nixgon';
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${gray[950]};
`;

export const HomeNoticeTitle = styled.p`
  font-family: 'High1';
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${gray[950]};
`;

export const ArrowRightIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

export const HomeIconButtonWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  gap: ${measurement.spacing8};

  p {
    ${typography.caption1Medium}
    color: ${semantic.textNormalNormal}
  }
`;

export const HomeIconButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${measurement.spacing16};
  gap: ${measurement.spacing16};
`;
