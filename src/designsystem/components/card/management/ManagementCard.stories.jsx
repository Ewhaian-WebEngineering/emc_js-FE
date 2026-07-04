import ManagementBoothCard from './ManagementBoothCard';
import ManagementFairCard from './ManagementFairCard';

const meta = {
  title: 'Components/ManagementCard',
  component: ManagementFairCard,
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

export const FairCrowded = {
  args: {
    congestionLevel: 'crowded',
    visitorCount: 46,
    onLinkClick: () => alert('바로가기 클릭'),
    onCongestionClick: () => alert('혼잡도 클릭'),
  },
};

export const FairNormal = {
  args: {
    congestionLevel: 'normal',
    visitorCount: 46,
    onLinkClick: () => alert('바로가기 클릭'),
    onCongestionClick: () => alert('혼잡도 클릭'),
  },
};

export const FairRelaxed = {
  args: {
    congestionLevel: 'relaxed',
    visitorCount: 46,
    onLinkClick: () => alert('바로가기 클릭'),
    onCongestionClick: () => alert('혼잡도 클릭'),
  },
};

export const Booth = {
  render: (args) => <ManagementBoothCard {...args} />,
  args: {
    boothName: '부스 이름',
    scrapCount: 46,
    visitorCount: 10999,
    onLinkClick: () => alert('바로가기 클릭'),
  },
};
