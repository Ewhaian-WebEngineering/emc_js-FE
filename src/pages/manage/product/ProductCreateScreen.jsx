import { MANAGE_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import ProductFormScreen from './ProductFormScreen';
import { useCreateProduct } from '@/api/feature/product/useProductData';
import { useImageUpload } from '@/api/core/s3/useImageUpload';

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: uploadImage } = useImageUpload();

  const handleSubmit = async (values, thumbnailFile) => {
    const { fileKey } = await uploadImage({
      file: thumbnailFile,
      imageType: 'booth_product',
      ownerId: boothId,
    });

    const { name, price, isOnSale, description, groupId } = values;
    const product = await createProduct({
      name,
      price,
      isOnSale,
      description,
      groupId,
      imageKey: fileKey,
    });

    navigate(MANAGE_ROUTES.PRODUCT_EDIT(boothId, product.id), {
      state: { productData: product },
    });
  };

  return <ProductFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
