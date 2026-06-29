import BoothHomeCard from './BoothHomeCard';

const meta = {
  title: 'Components/BoothCard',
  component: BoothHomeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '390px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Home = {
  args: {
    boothNumber: '01',
    boothName: '뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로',
    badges: ['performance', 'stationery', 'craft', 'fashionBeauty'],
    marks: ['eco', 'vegan'],
  },
};
