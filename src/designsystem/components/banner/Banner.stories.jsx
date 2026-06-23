import Banner from './Banner';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '345px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const WithImage = {
  args: {
    src: 'https://picsum.photos/400/80',
  },
};

export const WithPlaceholder = {
  args: {
    src: undefined,
  },
};
