import { useState } from 'react';
import AdminProductCard from './AdminProductCard';
import AdminNoticeCard from './AdminNoticeCard';
import AdminSpCard from './AdminSpCard';
import AdminBannerSpCard from './AdminEventBannerCard';
import AdminSpProductCard from './AdminSpProductCard';

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

export const NoticeCard = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <AdminNoticeCard
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
  args: {
    title:
      '등록 카드 제목 영역입니다 등록 카드 제목 영역입니다 등록 카드 제목 영역입니다 등록 카드 제목',
    content:
      '본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문 영역',
    date: '2026-07-01',
    onDelete: () => alert('삭제 클릭'),
    onEdit: () => alert('수정 클릭'),
  },
};

export const SpCard = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <AdminSpCard
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
  args: {
    title: '등록 카드 제목 영역입니다 등록 카드 제목 영역입니다 등록 카...',
    content: '본문 영역 본문 영역 본문 영역 본문 영역 본문 영역 본문...',
    onDelete: () => alert('삭제 클릭'),
    onEdit: () => alert('수정 클릭'),
  },
};

export const EventBannerCard = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <AdminBannerSpCard
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
  args: {
    title: '등록 카드 제목 영역입니다 등록 카드 제목 영역입니다 등록 카...',
    startDate: '2026-05-01',
    endDate: '2026-05-10',
    onDelete: () => alert('삭제 클릭'),
    onEdit: () => alert('수정 클릭'),
  },
};

export const SpProductCard = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <AdminSpProductCard
        {...args}
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
    );
  },
  args: {
    thumbnail: '',
    title: '등록 카드 제목 영역입니다 등록 카드 제목...',
    content: '본문 영역 본문 영역 본문 영역 본문...',
    onDelete: () => alert('삭제 클릭'),
    onEdit: () => alert('수정 클릭'),
  },
};
