import { useGoBack } from '@/hooks/useGoBack';
import { upsertProductDraft } from '../store/boothDraftStore';
import ProductFormScreen from './ProductFormScreen';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';
import { Navigate, useParams } from 'react-router-dom';
import { usePhase } from '@/hooks/config/usePhase';
import { MANAGE_ROUTES } from '@/constants/routes';
import { getUserRole } from '@/api/core/tokenStorage';

function createTempProductId() {
  return `temp-product-${crypto.randomUUID()}`;
}

export default function ProductCreateScreen() {
  const { boothId } = useParams();
  const goBack = useGoBack();
  const { toast } = useToastContext();
  const { isLocked: isPhaseLocked } = usePhase();
  const isLocked = isPhaseLocked && getUserRole() === 'seller';

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

  if (isLocked) {
    return <Navigate to={MANAGE_ROUTES.BOOTH_EDIT(boothId)} replace />;
  }

  return <ProductFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
