import BoothHomeCard from './BoothHomeCard';
import BoothDetailCard from './BoothDetailCard';
import BoothListCard from './BoothListCard';
import { useState } from 'react';

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
  render: (args) => <BoothHomeCard {...args} />,
  args: {
    boothNumber: '01',
    boothName: '뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로',
    badges: ['performance', 'stationery', 'craft', 'fashionBeauty'],
    marks: ['eco', 'vegan'],
  },
};

export const Detail = {
  render: (args) => <BoothDetailCard {...args} />,
  args: {
    boothNumber: '01',
    boothName: '뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로뷰할로',
    badges: ['performance', 'stationery', 'craft', 'fashionBeauty'],
    marks: ['eco', 'vegan'],
  },
};

export const List = {
  render: (args) => {
    const [isBookmarked, setIsBookmarked] = useState(args.isBookmarked);
    return (
      <BoothListCard
        {...args}
        isBookmarked={isBookmarked}
        onBookmarkClick={() => setIsBookmarked((prev) => !prev)}
      />
    );
  },
  args: {
    boothNumber: '01',
    boothName: '이화체인-블록체인',
    boothDescription:
      '부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄. 부스 소개글 최대 1줄.',
    badges: [
      'performance',
      'stationery',
      'craft',
      'fashionBeauty',
      'food',
      'eco',
      'vegan',
    ],
    thumbnails: ['', '', '', ''],
    marks: ['eco'],
    isBookmarked: false,
  },
};
