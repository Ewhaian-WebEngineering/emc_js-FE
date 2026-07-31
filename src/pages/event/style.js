import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic.js';
import { measurement } from '../../designsystem/tokens/measurement.js';
import { typography } from '../../designsystem/tokens/typography.js';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

export const TabWrapper = styled.div`
  z-index: 5;
`;

export const ContentWrapper = styled.main`
  padding-bottom: ${measurement.spacing56};
  display: flex;
  flex-direction: column;
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
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
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;
