import { useEffect, useRef, useState, Fragment, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Header from '@/designsystem/components/header/FillRightHeader';
import Tab from '@/designsystem/components/tab/Tab';
import EventCard from '@/designsystem/components/card/event/EventCard';
import Divider from '@/designsystem/components/divider/Divider';
import { EVENT_ROUTES } from '@/constants/routes';
import { useScrollSpyTabs } from '@/hooks/useScrollSpyTabs';
import { eventTabDescriptions, eventTabs } from '@/pages/event/constants/event';
import { useEvents } from '@/api/feature/event/useEvents';

const headerHideScrollThreshold = 50;

export default function EventScreen() {
  const navigate = useNavigate();
  const { data } = useEvents();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const stickyHeaderRef = useRef(null);
  const tabWrapperRef = useRef(null);

  const [blockHeight, setBlockHeight] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);
  const offset = isHeaderVisible ? blockHeight : tabHeight;

  const { activeTab, scrollToTab, registerSection } = useScrollSpyTabs(
    eventTabs,
    offset,
  );

  const isProgrammaticScrollRef = useRef(false);
  const [pendingTabId, setPendingTabId] = useState(null);

  useLayoutEffect(() => {
    if (stickyHeaderRef.current) {
      setBlockHeight(stickyHeaderRef.current.offsetHeight);
    }
    if (tabWrapperRef.current) {
      setTabHeight(tabWrapperRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleHeaderScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY >= 0) {
          const last = lastScrollYRef.current;
          if (
            currentScrollY > last &&
            currentScrollY > headerHideScrollThreshold
          ) {
            setIsHeaderVisible(false);
          } else if (currentScrollY < last) {
            setIsHeaderVisible(true);
          }
          lastScrollYRef.current = currentScrollY;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleHeaderScroll);
  }, []);

  const handleCardClick = (eventId) => {
    navigate(EVENT_ROUTES.DETAIL(eventId));
  };

  const handleTabChange = (newTabId) => {
    const isFirstTab = newTabId === eventTabs[0]?.id;
    isProgrammaticScrollRef.current = true;
    setIsHeaderVisible(isFirstTab);
    setPendingTabId(newTabId);
  };

  useEffect(() => {
    if (pendingTabId === null) return;

    scrollToTab(pendingTabId);
    setPendingTabId(null);

    window.clearTimeout(isProgrammaticScrollRef._timer);
    isProgrammaticScrollRef._timer = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      lastScrollYRef.current = window.scrollY;
    }, 600);
  }, [pendingTabId, offset]);

  const activeTabIndex = eventTabs.findIndex((tab) => tab.id === activeTab);

  return (
    <S.ScreenContainer>
      <S.StickyHeader ref={stickyHeaderRef} isHeaderVisible={isHeaderVisible}>
        <Header title="이벤트" border />
        <div ref={tabWrapperRef}>
          <Tab
            tabs={eventTabs}
            variant="default"
            activeTab={activeTabIndex}
            onChange={(tab) => handleTabChange(tab.id)}
          />
        </div>
      </S.StickyHeader>

      <S.ContentWrapper>
        {eventTabs.map((tab, index) => (
          <Fragment key={tab.id}>
            <S.EventSection ref={registerSection(tab.id)}>
              <S.SectionHeader>
                <S.SectionTitle>{tab.label}</S.SectionTitle>
                <S.SectionDescription>
                  {eventTabDescriptions[tab.id]}
                </S.SectionDescription>
              </S.SectionHeader>
              <S.CardList>
                {data[tab.apiKey].map((event) => (
                  <EventCard
                    key={event.id}
                    eventTitle={event.title}
                    startDate={event.startDate}
                    endDate={tab.apiKey === 'live' ? undefined : event.endDate}
                    status={event.status}
                    thumbnail={event.imageUrl}
                    onClick={() => handleCardClick(event.id)}
                  />
                ))}
              </S.CardList>
            </S.EventSection>

            {index < eventTabs.length - 1 && <Divider size="lg" />}
          </Fragment>
        ))}
      </S.ContentWrapper>
    </S.ScreenContainer>
  );
}
