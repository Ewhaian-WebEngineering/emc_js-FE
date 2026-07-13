import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

import Header from '@/designsystem/components/header/FillRightHeader';
import Tab from '@/designsystem/components/tab/Tab';
import EventCard from '@/designsystem/components/card/event/EventCard';

export default function EventScreen() {
  const navigate = useNavigate();

  // 1. 헤더 상태
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // 2. 다이내믹 스크롤
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return; // 스크롤이 음수로 내려가는 경우는 무시 (예: iOS or safari)

      const last = lastScrollYRef.current;

      if (currentScrollY > last && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < last) {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY; // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // 성능 최적화를 위해 passive 옵션 사용
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  // 3. 탭 바 상태
  const [activeTab, setActiveTab] = useState('pre');

  const tabs = [
    { id: 'pre', label: '사전 이벤트' },
    { id: 'onsite', label: '현장 이벤트' },
    { id: 'post', label: '사후 이벤트' },
  ];

  // 4. 이벤트 데이터 (향후 Admin Accordion과 맞춰야 함)
  const rawEvents = {
    pre: [
      {
        id: 1,
        eventTitle: '이벤트 타이틀 영역 입니다',
        startDate: '2026-01-01',
        endDate: '2026-01-01',
        status: 'ended',
        thumbnail: '',
      },
      {
        id: 2,
        eventTitle: '이벤트 타이틀 영역 입니다',
        startDate: '2026-01-01',
        endDate: '2026-01-01',
        status: 'ongoing',
        thumbnail: '',
      },
    ],
    onsite: [
      {
        id: 3,
        eventTitle: '이벤트 타이틀 영역 입니다',
        startDate: '2026-01-01',
        endDate: '2026-01-01',
        status: 'ongoing',
        thumbnail: '',
      },
      {
        id: 4,
        eventTitle: '이벤트 타이틀 영역 입니다',
        startDate: '2026-01-01',
        endDate: '2026-01-01',
        status: 'ongoing',
        thumbnail: '',
      },
    ],
    post: [
      {
        id: 5,
        eventTitle: '이벤트 타이틀 영역 입니다',
        startDate: '2026-01-01',
        endDate: '2026-01-01',
        status: 'upcoming',
        thumbnail: '',
      },
    ],
  };

  const sortEvents = (events) => {
    return [...events].sort((a, b) => a.eventTitle.localeCompare(b.eventTitle));
  }; // 가나다순 정렬

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  }; // 카드 클릭 시 상세 페이지로 이동

  //5. 현재 탭에 따른 이벤트 데이터와 설명 가져오기
  const currentEvents = sortEvents(rawEvents[activeTab]);
  const currentTabLabel = tabs.find((tab) => tab.id === activeTab)?.label;

  const tabDescriptions = {
    pre: '사전 이벤트에 대한 소개글입니다. 사전 이벤트에 대한 소개글입니다. 사전 이벤트에 대한 소개글입니다.',
    onsite:
      '현장 이벤트에 대한 소개글입니다. 현장 이벤트에 대한 소개글입니다. 현장 이벤트에 대한 소개글입니다.',
    post: '사후 이벤트에 대한 소개글입니다. 사후 이벤트에 대한 소개글입니다. 사후 이벤트에 대한 소개글입니다.',
  };

  const currentTabDescription = tabDescriptions[activeTab] || '';

  // 6. 화면 렌더링 영역
  return (
    <S.ScreenContainer>
      <S.HeaderWrapper
        isHeaderVisible={isHeaderVisible}
        style={{
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <Header title="이벤트" />
      </S.HeaderWrapper>

      <S.TabWrapper isHeaderVisible={isHeaderVisible}>
        <Tab
          tabs={tabs}
          variant="default"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </S.TabWrapper>

      <S.ContentWrapper>
        <S.EventSection>
          <S.SectionHeader>
            <S.SectionTitle>{currentTabLabel}</S.SectionTitle>
            <S.TabDescription>{currentTabDescription}</S.TabDescription>
          </S.SectionHeader>
          <S.CardList>
            {currentEvents.map((event) => (
              <div key={event.id} onClick={() => handleCardClick(event.id)}>
                <EventCard
                  eventTitle={event.eventTitle}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  status={event.status}
                  thumbnail={event.thumbnail}
                />
              </div>
            ))}
          </S.CardList>
        </S.EventSection>
      </S.ContentWrapper>
    </S.ScreenContainer>
  );
}
