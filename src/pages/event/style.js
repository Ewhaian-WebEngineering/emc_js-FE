import styled from '@emotion/styled';

// 전체 화면 컨테이너
export const ScreenContainer = styled.div`
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

// 헤더 영역 (고정)
export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 375px;
  z-index: 10;
  height: 64px;
  background-color: #ffffff;
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
  background-color: #ffffff;
  transition: top 0.3s ease-in-out;
  border-top: 1px solid #e7eaed;
`;

// 콘텐츠 영역
export const ContentWrapper = styled.main`
  padding-top: 84px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// 각 이벤트(사전/현장/사후) 섹션 영역
export const EventSection = styled.section`
  padding: 0 20px;
`;

// 섹션 헤더 영역
export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 343px;
`;

// 섹션 타이틀
export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--Text-Nomal-Strong, #3d3f41);
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
`;

// 섹션 설명 텍스트
export const TabDescription = styled.p`
  margin: 0;
  color: var(--Text-Nomal-Normal, #6f7173);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
`;
// 카드 리스트 영역
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
