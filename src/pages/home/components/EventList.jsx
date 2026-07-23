import Tag from '@/designsystem/components/tag/Tag';
import { useState } from 'react';
import {
  EventListItem,
  EventSection,
  EventTabsContainer,
  ListScroll,
} from '../style';
import EventCard from '@/designsystem/components/card/event/EventCard';

const EVENT_TABS = [
  { key: 'pre', label: '사전' },
  { key: 'onsite', label: '현장' },
  { key: 'post', label: '사후' },
];

export default function EventList({ list }) {
  const [selectedTab, setSelectedTab] = useState(EVENT_TABS[0].key);
  const filteredList = list.filter((event) => event.category === selectedTab);

  return (
    <EventSection>
      <EventTabs
        tabs={EVENT_TABS}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />
      <ListScroll>
        {filteredList.map((event) => (
          <EventListItem key={event.id}>
            <EventCard
              thumbnail={event.thumbnail}
              eventTitle={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              status={event.status}
              onClick={event.onClick}
            />
          </EventListItem>
        ))}
      </ListScroll>
    </EventSection>
  );
}

function EventTabs({ tabs, selectedTab, onSelect }) {
  return (
    <EventTabsContainer>
      {tabs.map((tab) => (
        <Tag
          key={tab.key}
          label={tab.label}
          selected={selectedTab === tab.key}
          onClick={() => onSelect(tab.key)}
        />
      ))}
    </EventTabsContainer>
  );
}
