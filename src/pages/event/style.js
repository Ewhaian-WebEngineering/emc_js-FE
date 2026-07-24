import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic.js';
import { measurement } from '../../designsystem/tokens/measurement.js';
import { typography } from '../../designsystem/tokens/typography.js';

// 전체 화면 컨테이너
export const ScreenContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${semantic.fillNormalWhite};
`;

// 헤더 영역 (고정)
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

// 탭바 영역 (고정)
export const TabWrapper = styled.div`
  position: sticky;
  top: ${({ isHeaderVisible }) => (isHeaderVisible ? '64px' : '0')};
  z-index: 5;
  width: 100%;
  background-color: ${semantic.fillNormalWhite};
  transition: top 0.3s ease-in-out;
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

// 콘텐츠 영역
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

// 각 이벤트(사전/현장/사후) 섹션 영역
export const EventSection = styled.section`
  padding: 0 ${measurement.spacing16};
`;

// 섹션 헤더 영역
export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
  margin-bottom: ${measurement.spacing24};
  width: 100%;
`;

// 섹션 타이틀
export const SectionTitle = styled.h2`
  margin: 0;
  color: ${semantic.textNormalStrong};
  ${typography.headline2Semibold};
`;

// 섹션 설명 텍스트
export const TabDescription = styled.p`
  margin: 0;
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

// 카드 리스트 영역
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;
