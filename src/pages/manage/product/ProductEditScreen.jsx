import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductFormScreen from './ProductFormScreen';
import { mockProduct } from './mocks/mockProduct';

export default function ProductEditScreen() {
  const { productId } = useParams();
  const location = useLocation();
  const stateProduct = location.state?.productData;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stateProduct) {
      setProduct(stateProduct);
      setIsLoading(false);
      return;
    }

    // TODO: API 연동 시 productId로 상품 정보 가져오기
    setProduct(mockProduct);
    setIsLoading(false);
  }, [productId, stateProduct]);

  const handleSubmit = async (values) => {
    // TODO: API 연동 시 상품 정보 업데이트
    setProduct(values);
  };

  if (isLoading) {
    // TODO: 로딩 화면 교체
    return <div>Loading...</div>;
  }

  return (
    <ProductFormScreen
      product={product}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
