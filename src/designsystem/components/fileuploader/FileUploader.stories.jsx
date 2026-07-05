import { useState } from 'react';
import MainImageUploader from './MainImageUploader';
import ProductImageUploader from './ProductImageUploader';

const meta = {
  title: 'Components/FileUploader',
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

export const MainImage = {
  render: (args) => {
    const [imageUrl, setImageUrl] = useState('');

    return (
      <MainImageUploader
        {...args}
        imageUrl={imageUrl}
        onUpload={(file) => setImageUrl(URL.createObjectURL(file))}
        onDelete={() => setImageUrl('')}
      />
    );
  },
};

export const ProductImage = {
  render: (args) => {
    const [imageUrl, setImageUrl] = useState('');

    return (
      <ProductImageUploader
        {...args}
        imageUrl={imageUrl}
        onUpload={(file) => setImageUrl(URL.createObjectURL(file))}
        onDelete={() => setImageUrl('')}
      />
    );
  },
  args: {
    title: '제품 이미지',
    isRequired: true,
    helperText:
      '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)',
  },
};

export const ProductImageError = {
  render: (args) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isError, setIsError] = useState(true);

    return (
      <ProductImageUploader
        {...args}
        imageUrl={imageUrl}
        isError={isError}
        helperText={
          isError
            ? '이미지를 업로드 해주세요.'
            : '이미지 1개만 업로드할 수 있습니다. (JPG, JPEG, PNG / 최대 10MB)'
        }
        onUpload={(file) => {
          setImageUrl(URL.createObjectURL(file));
          setIsError(false);
        }}
        onDelete={() => {
          setImageUrl('');
          setIsError(true);
        }}
      />
    );
  },
  args: {
    title: '제품 이미지',
    isRequired: true,
  },
};
