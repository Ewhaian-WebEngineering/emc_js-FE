import { useEffect, useRef, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Header from '@/designsystem/components/header/FillRightHeader';
import Tab from '@/designsystem/components/tab/Tab';
import EventCard from '@/designsystem/components/card/event/EventCard';
import Divider from '@/designsystem/components/divider/Divider';
import { EVENT_ROUTES } from '@/constants/routes';
import { useScrollSpyTabs } from '@/hooks/useScrollSpyTabs';
import {
  eventData,
  eventTabDescriptions,
  eventTabs,
} from '@/pages/event/constants/event';

const headerHideScrollThreshold = 50;

export default function EventScreen() {
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const stickyHeaderRef = useRef(null);
  const tabWrapperRef = useRef(null);

  const blockHeight = stickyHeaderRef.current?.offsetHeight ?? 0;
  const tabHeight = tabWrapperRef.current?.offsetHeight ?? 0;
  const offset = isHeaderVisible ? blockHeight : tabHeight;

  const { activeTab, scrollToTab, registerSection } = useScrollSpyTabs(
    eventTabs,
    offset,
  );

  useEffect(() => {
    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;

      const last = lastScrollYRef.current;
      if (currentScrollY > last && currentScrollY > headerHideScrollThreshold) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < last) {
        setIsHeaderVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleHeaderScroll);
  }, []);

  const handleCardClick = (eventId) => {
    navigate(EVENT_ROUTES.DETAIL(eventId));
  };

  const handleTabChange = (newTabId) => {
    const isFirstTab = newTabId === eventTabs[0]?.id;
    setIsHeaderVisible(isFirstTab);
    scrollToTab(newTabId);
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
            <S.EventSection ref={registerSection(tab.id)}>
              <S.SectionHeader>
                <S.SectionTitle>{tab.label}</S.SectionTitle>
                <S.SectionDescription>
                  {eventTabDescriptions[tab.id]}
                </S.SectionDescription>
              </S.SectionHeader>
              <S.CardList>
                {(eventData[tab.id] ?? []).map((event) => (
                  <EventCard
                    key={event.id}
                    eventTitle={event.eventTitle}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    status={event.status}
                    thumbnail={event.thumbnail}
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
