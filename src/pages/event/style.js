import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic.js';
import { measurement } from '../../designsystem/tokens/measurement.js';
import { typography } from '../../designsystem/tokens/typography.js';

export const ScreenContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${semantic.fillNormalWhite};
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  height: 64px;
  max-width: 100%;
  background-color: ${semantic.fillNormalWhite};
  transition: transform 0.3s ease-in-out;
  transform: translateY(
    ${({ isHeaderVisible }) => (isHeaderVisible ? '0' : '-100%')}
  );
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: ${({ isHeaderVisible }) => (isHeaderVisible ? '64px' : '0')};
  z-index: 5;
  width: 100%;
  background-color: ${semantic.fillNormalWhite};
  transition: top 0.3s ease-in-out;
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const ContentWrapper = styled.main`
  padding-top: 84px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding-inline: clamp(
    ${measurement.spacing16},
    6vw,
    ${measurement.spacing48}
  );
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing20} ${measurement.spacing16};
  background-color: ${semantic.fillNormalWhite};
  width: 100%;
  box-sizing: border-box;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
  width: 100%;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${semantic.textNormalStrong};
  ${typography.headline2Semibold};
`;

export const TabDescription = styled.p`
  margin: 0;
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;
