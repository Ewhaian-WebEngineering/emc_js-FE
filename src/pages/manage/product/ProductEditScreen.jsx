import { useGoBack } from '@/hooks/useGoBack';
import { useLocation, useParams } from 'react-router-dom';
import { useBoothDraftStore } from '../store/useBoothDraftStore';
import { useProductDetail } from '@/api/feature/product/useProductData';
import { useMemo } from 'react';
import { upsertProductDraft } from '../store/boothDraftStore';
import ProductFormScreen from './ProductFormScreen';

export default function ProductEditScreen() {
  const { productId } = useParams();
  const location = useLocation();
  const goBack = useGoBack();
  const draft = useBoothDraftStore();

  const stateProduct = location.state?.productData;
  const isTemp = productId.startsWith('temp-product-');

  const { data: fetchedProduct, isPending } = useProductDetail(productId, {
    enabled: !stateProduct && !isTemp,
  });

  const draftEntry = draft.products[productId];

  const product = useMemo(() => {
    const base = stateProduct ?? fetchedProduct;
    if (!base) return null;
    return draftEntry ? { ...base, ...draftEntry.data } : base;
  }, [stateProduct, fetchedProduct, draftEntry]);

  if (!isTemp && !stateProduct && isPending) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values, thumbnailFile) => {
    const { name, price, isOnSale, description, groupId } = values;

    upsertProductDraft(productId, {
      status: isTemp ? 'created' : 'updated',
      data: {
        name,
        price,
        isOnSale,
        description,
        groupId,
        imageKey: product.imageKey,
      },
      file: thumbnailFile ?? draftEntry?.file ?? null,
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
