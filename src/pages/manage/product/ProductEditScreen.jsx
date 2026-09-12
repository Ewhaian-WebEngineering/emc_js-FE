import { useLocation, useParams } from 'react-router-dom';
import ProductFormScreen from './ProductFormScreen';
import { useGoBack } from '@/hooks/useGoBack';
import {
  useProductDetail,
  useUpdateProduct,
} from '@/api/feature/product/useProductData';
import { useImageUpload } from '@/api/core/s3/useImageUpload';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';

export default function ProductEditScreen() {
  const { boothId, productId } = useParams();
  const location = useLocation();
  const goBack = useGoBack();
  const stateProduct = location.state?.productData;

  const { data: fetchedProduct, isPending } = useProductDetail(productId, {
    enabled: !stateProduct,
  });

  const product = stateProduct ?? fetchedProduct;

  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: uploadImage } = useImageUpload();

  if (!stateProduct && isPending) {
    <>
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    </>;
  }

  const handleSubmit = async (values, thumbnailFile) => {
    let imageKey = product.imageKey;

    if (thumbnailFile) {
      const { fileKey } = await uploadImage({
        file: thumbnailFile,
        imageType: 'booth_product',
        ownerId: boothId,
      });
      imageKey = fileKey;
    }

    const { name, price, isOnSale, description, groupId } = values;
    await updateProduct({
      productId,
      payload: { name, price, isOnSale, description, groupId, imageKey },
    });

    goBack();
  };

  return (
    <ProductFormScreen
      product={product}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
