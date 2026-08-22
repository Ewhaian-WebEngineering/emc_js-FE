import { MANAGE_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import ProductFormScreen from './ProductFormScreen';

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();

  const handleSubmit = async (values) => {
    // TODO: API 연동 시 productId 받아오기
    const productId = 'temp-id';
    navigate(MANAGE_ROUTES.PRODUCT_EDIT(boothId, productId), {
      state: { productData: values },
    });
  };

  return <ProductFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
