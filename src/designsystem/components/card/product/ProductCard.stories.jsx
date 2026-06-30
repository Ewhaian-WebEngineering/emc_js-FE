import ProductVerticalCard from './ProductVerticalCard';
import ProductHorizontalCard from './ProductHorizontalCard';

const meta = {
  title: 'Components/ProductCard',
  component: ProductVerticalCard,
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

export const Vertical = {
  render: (args) => <ProductVerticalCard {...args} />,
  args: {
    thumbnail: '',
    productName: '제품이름 영역입니다. 제품이름 영역입니다.',
    productDescription:
      '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
    productPrice: 9999,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '164px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Horizontal = {
  render: (args) => <ProductHorizontalCard {...args} />,
  args: {
    thumbnail: '',
    productName: '제품이름 영역입니다. 제품이름 영역입니다.',
    productDescription:
      '제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다. 제품 소개글입니다.',
  },
};
