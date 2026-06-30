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

export const Default = {
  args: {
    congestionLevel: '혼잡',
    visitorCount: 46,
    onLinkClick: () => alert('바로가기 클릭'),
    onCongestionClick: () => alert('혼잡도 클릭'),
  },
};
