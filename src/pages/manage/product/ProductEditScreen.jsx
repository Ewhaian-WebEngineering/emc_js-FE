import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductFormScreen from './ProductFormScreen';
import { mockProduct } from './mock/mockProduct';

export default function ProductEditScreen() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // TODO: API 연동 시 productId로 상품 정보 가져오기
    setProduct(mockProduct);
  }, [productId]);

  const handleSubmit = async (values) => {
    setProduct(values);
  };

  return (
    <ProductFormScreen
      product={product}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
