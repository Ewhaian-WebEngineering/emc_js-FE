import Divider from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const DividerSm = {
  args: {
    size: 'sm',
  },
};

export const DividerLg = {
  args: {
    size: 'lg',
  },
};
