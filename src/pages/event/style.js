import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  background-color: ${semantic.fillNormalWhite};
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  transform: translateY(
    ${({ isHeaderVisible }) =>
      isHeaderVisible ? '0' : `-${measurement.spacing64}`}
  );
`;

export const ContentWrapper = styled.div`
  padding-bottom: ${measurement.spacing56};
`;

const cardColumn = css`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

export const EventSection = styled.section`
  ${cardColumn};
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.h2`
  color: ${semantic.textNormalStrong};
  ${typography.headline2Semibold};
`;

export const SectionDescription = styled.p`
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

export const CardList = styled.div`
  ${cardColumn};
`;
