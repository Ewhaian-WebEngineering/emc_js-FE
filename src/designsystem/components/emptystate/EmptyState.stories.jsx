import EmptyState from './EmptyState';
import EmptyStateSm from './EmptyStateSm';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const PlaceholderIcon = () => (
  <img src="https://placehold.co/180x180?text=Icon" width={180} height={180} />
);

export const WithIconAndButton = {
  args: {
    Icon: PlaceholderIcon,
    title: '엠프티 타이틀 영역입니다.',
    description: '엠프티 문구 영역입니다.',
    buttonText: '텍스트',
    onButtonClick: () => alert('clicked'),
  },
};

export const WithoutIconAndButton = {
  args: {
    title: '엠프티 타이틀 영역입니다.',
    description: '엠프티 문구 영역입니다.',
  },
};

export const InlineSm = {
  args: {
    title: '엠프티 문구 영역입니다.',
    height: '100px',
  },
  render: (args) => <EmptyStateSm {...args} />,
};
