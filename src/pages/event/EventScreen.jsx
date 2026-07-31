import { useState, useEffect, useLayoutEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

import Header from '@/designsystem/components/header/FillRightHeader';
import Tab from '@/designsystem/components/tab/Tab';
import EventCard from '@/designsystem/components/card/event/EventCard';
import Divider from '@/designsystem/components/divider/Divider';
import { EVENT_ROUTES } from '@/constants/routes';
import {
  defaultEventTab,
  eventData,
  eventTabDescriptions,
  eventTabs,
} from '@/pages/event/constants/event';

const headerHideScrollThreshold = 50;
const tabScrollResetTimeoutMs = 2000;

export default function EventScreen() {
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(defaultEventTab);

  const lastScrollYRef = useRef(0);
  const sectionRefs = useRef({});
  const sectionTopsRef = useRef({});
  const stickyHeaderRef = useRef(null);
  const tabWrapperRef = useRef(null);
  const stickyOffsetRef = useRef(0);
  const isTabScrollingRef = useRef(false);

  useLayoutEffect(() => {
    const updateSectionTops = () => {
      const tops = {};
      for (const tab of eventTabs) {
        const section = sectionRefs.current[tab.id];
        if (section) {
          tops[tab.id] = section.getBoundingClientRect().top + window.scrollY;
        }
      }
      sectionTopsRef.current = tops;
    };

    updateSectionTops();
    window.addEventListener('resize', updateSectionTops);
    return () => window.removeEventListener('resize', updateSectionTops);
  }, [eventTabs]);

  useLayoutEffect(() => {
    const blockHeight = stickyHeaderRef.current?.offsetHeight ?? 0;
    const tabHeight = tabWrapperRef.current?.offsetHeight ?? 0;
    stickyOffsetRef.current = isHeaderVisible ? blockHeight : tabHeight;
  }, [isHeaderVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;
      if (isTabScrollingRef.current) return;
      const last = lastScrollYRef.current;
      if (currentScrollY > last && currentScrollY > headerHideScrollThreshold) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < last) {
        setIsHeaderVisible(true);
      }
      lastScrollYRef.current = currentScrollY;

      let visibleTab = eventTabs[0]?.id;
      const stickyOffset = stickyOffsetRef.current;

      for (const tab of eventTabs) {
        const sectionTop = sectionTopsRef.current[tab.id];
        if (sectionTop === undefined) continue;
        if (sectionTop - stickyOffset <= currentScrollY) {
          visibleTab = tab.id;
        }
      }

      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 1;
      if (isAtBottom) {
        visibleTab = eventTabs[eventTabs.length - 1]?.id ?? visibleTab;
      }

      setActiveTab(visibleTab);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [eventTabs]);

  const handleCardClick = (eventId) => {
    navigate(EVENT_ROUTES.DETAIL(eventId));
  };

  const handleTabChange = (newTabId) => {
    setActiveTab(newTabId);

    if (sectionTopsRef.current[newTabId] === undefined) return;

    const isFirstTab = newTabId === eventTabs[0]?.id;
    const tabHeight = tabWrapperRef.current?.offsetHeight ?? 0;

    setIsHeaderVisible(isFirstTab);

    const top = isFirstTab ? 0 : sectionTopsRef.current[newTabId] - tabHeight;

    isTabScrollingRef.current = true;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    const resetTabScrolling = () => {
      isTabScrollingRef.current = false;
      lastScrollYRef.current = window.scrollY;
    };
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', resetTabScrolling, { once: true });
    }
    window.setTimeout(resetTabScrolling, tabScrollResetTimeoutMs);
  };

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
            <S.EventSection
              ref={(element) => {
                sectionRefs.current[tab.id] = element;
              }}
            >
              <S.SectionHeader>
                <S.SectionTitle>{tab.label}</S.SectionTitle>
                <S.SectionDescription>
                  {eventTabDescriptions[tab.id]}
                </S.SectionDescription>
              </S.SectionHeader>
              <S.CardList>
                {(eventData[tab.id] ?? []).map((event) => (
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

            {index < eventTabs.length - 1 && <Divider size="lg" />}
          </Fragment>
        ))}
      </S.ContentWrapper>
    </S.ScreenContainer>
  );
}
