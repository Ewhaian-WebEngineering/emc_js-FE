import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic.js';
import { measurement } from '../../designsystem/tokens/measurement.js';
import { typography } from '../../designsystem/tokens/typography.js';
import { layout } from '../../designsystem/tokens/layout.js';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${semantic.fillNormalWhite};
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: ${layout.containerMax};
  margin: 0 auto;
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  transform: translateY(
    ${({ isHeaderVisible }) => (isHeaderVisible ? '0' : '-100%')}
  );
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: ${({ isHeaderVisible }) => (isHeaderVisible ? '64px' : '0')};
  z-index: 5;
  transition: top 0.3s ease-in-out;
`;

export const ContentWrapper = styled.main`
  padding-top: ${({ isHeaderVisible }) =>
    isHeaderVisible ? measurement.spacing64 : measurement.spacing0};
  padding-bottom: ${measurement.spacing56};
  transition: padding-top 0.3s ease-in-out;
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
