import { useState } from 'react';
import AdminProductCard from './AdminProductCard';

const meta = {
  title: 'Components/AdminCard',
  component: AdminProductCard,
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

export const ProductCard = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <AdminProductCard
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
  args: {
    thumbnail: '',
    title: '등록 카드 제목 영역입니다 등록 카드 제목...',
    price: 999999,
    onDelete: () => alert('삭제 클릭'),
    onEdit: () => alert('수정 클릭'),
  },
};
