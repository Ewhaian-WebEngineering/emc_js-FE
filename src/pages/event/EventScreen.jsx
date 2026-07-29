import { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

import Header from '@/designsystem/components/header/FillRightHeader';
import Tab from '@/designsystem/components/tab/Tab';
import EventCard from '@/designsystem/components/card/event/EventCard';
import Divider from '@/designsystem/components/divider/Divider';
import {
  defaultEventTab,
  eventData,
  eventTabDescriptions,
  eventTabs,
} from '@/pages/event/event';

export default function EventScreen() {
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const sectionRefs = useRef({});
  const tabMenuWrapperRef = useRef(null);
  const isSyncOnlyRef = useRef(false);
  const activeTabTrackerRef = useRef(defaultEventTab);

  const [activeTab, setActiveTab] = useState(defaultEventTab);
  const tabs = eventTabs;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;
      const last = lastScrollYRef.current;
      if (currentScrollY > last && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < last) {
        setIsHeaderVisible(true);
      }
      lastScrollYRef.current = currentScrollY;

      const scrollOffset = 140;
      let visibleTab = tabs[0]?.id;

      for (const tab of tabs) {
        const section = sectionRefs.current[tab.id];
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if (sectionTop - scrollOffset <= currentScrollY) {
          visibleTab = tab.id;
        }
      }

      if (activeTabTrackerRef.current !== visibleTab) {
        activeTabTrackerRef.current = visibleTab;
        setActiveTab(visibleTab);

        const index = tabs.findIndex((tab) => tab.id === visibleTab);
        const button =
          tabMenuWrapperRef.current?.querySelectorAll('button')[index];
        if (button) {
          isSyncOnlyRef.current = true;
          button.click();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  const rawEvents = eventData;

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleTabChange = (nextTab) => {
    activeTabTrackerRef.current = nextTab;
    setActiveTab(nextTab);
    const targetSection = sectionRefs.current[nextTab];
    if (!targetSection) return;

    const offset = 140;
    const top =
      targetSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleTabWrapperClick = (event) => {
    const button = event.target.closest('button');
    if (!button || !tabMenuWrapperRef.current) return;

    const buttons = Array.from(
      tabMenuWrapperRef.current.querySelectorAll('button'),
    );
    const index = buttons.indexOf(button);
    const clickedTab = tabs[index];
    if (!clickedTab) return;

    if (isSyncOnlyRef.current) {
      isSyncOnlyRef.current = false;
      return;
    }

    handleTabChange(clickedTab.id);
  };

  return (
    <S.ScreenContainer>
      <S.HeaderWrapper isHeaderVisible={isHeaderVisible}>
        <Header title="이벤트" />
      </S.HeaderWrapper>

      <S.TabWrapper
        isHeaderVisible={isHeaderVisible}
        ref={tabMenuWrapperRef}
        onClick={handleTabWrapperClick}
      >
        <Tab
          tabs={tabs}
          variant="default"
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </S.TabWrapper>

      <S.ContentWrapper>
        {tabs.map((tab, index) => (
          <Fragment key={tab.id}>
            <S.EventSection
              ref={(element) => {
                sectionRefs.current[tab.id] = element;
              }}
              style={{ scrollMarginTop: 140 }}
            >
              <S.SectionHeader>
                <S.SectionTitle>{tab.label}</S.SectionTitle>
                <S.TabDescription>
                  {eventTabDescriptions[tab.id]}
                </S.TabDescription>
              </S.SectionHeader>
              <S.CardList>
                {rawEvents[tab.id].map((event) => (
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

            {index < tabs.length - 1 && <Divider size="lg" />}
          </Fragment>
        ))}
      </S.ContentWrapper>
    </S.ScreenContainer>
  );
}
