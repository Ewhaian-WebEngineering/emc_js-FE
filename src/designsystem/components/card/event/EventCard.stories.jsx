import EventCard from './EventCard';

const meta = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '343px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Ongoing = {
  args: {
    thumbnail: '',
    eventTitle: '이벤트 타이틀 영역입니다.',
    startDate: '2026-05-01',
    endDate: '2026-05-10',
    status: 'ongoing',
  },
};

export const Upcoming = {
  args: {
    thumbnail: '',
    eventTitle: '이벤트 타이틀 영역입니다.',
    startDate: '2026-05-01',
    endDate: '',
    status: 'upcoming',
  },
};

export const Ended = {
  args: {
    thumbnail: '',
    eventTitle: '이벤트 타이틀 영역입니다.',
    startDate: '2026-05-01',
    endDate: '2026-05-10',
    status: 'ended',
  },
};
