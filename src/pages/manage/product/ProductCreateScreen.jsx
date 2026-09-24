import { useGoBack } from '@/hooks/useGoBack';
import { upsertProductDraft } from '../store/boothDraftStore';
import ProductFormScreen from './ProductFormScreen';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

function createTempProductId() {
  return `temp-product-${crypto.randomUUID()}`;
}

export default function ProductCreateScreen() {
  const goBack = useGoBack();
  const { toast } = useToastContext();

  const handleSubmit = async (values, thumbnailFile) => {
    const { name, price, isOnSale, description, groupId } = values;
    const tempId = createTempProductId();

    upsertProductDraft(tempId, {
      status: 'created',
      data: {
        name,
        price,
        isOnSale,
        description,
        groupId,
        imageUrl: thumbnailFile ? URL.createObjectURL(thumbnailFile) : '',
      },
      file: thumbnailFile,
    });

    toast({ message: '변경사항이 저장되었어요.' });
    goBack();
  };

  return <ProductFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
