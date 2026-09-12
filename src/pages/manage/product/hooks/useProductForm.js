import useModal from '@/hooks/modal/useModal';
import { useState } from 'react';

const getInitialValues = (product) => ({
  name: product?.name ?? '',
  price: product?.price ?? '',
  isOnSale: product?.isOnSale ?? true,
  description: product?.description ?? '',
  groupId: product?.groupId ?? null,
});

const FIELD_ERROR_MESSAGES = {
  name: '내용을 입력해주세요.',
  price: '가격을 입력해주세요.',
  description: '내용을 입력해주세요.',
  thumbnail: '이미지를 업로드 해주세요.',
};

export function useProductForm({
  product,
  submitLabel,
  onSubmit,
  hasThumbnail,
}) {
  const isCreateMode = submitLabel === 'create';
  const { showModal } = useModal();

  const [initialValues, setInitialValues] = useState(() =>
    getInitialValues(product),
  );
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const updateField = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const fieldErrors = {
    name: formValues.name.trim() === '',
    price: formValues.price === '',
    description: formValues.description.trim() === '',
    thumbnail: !hasThumbnail,
  };

  const isFormValid = !Object.values(fieldErrors).some(Boolean);

  const isDirty =
    !isCreateMode &&
    JSON.stringify(formValues) !== JSON.stringify(initialValues);

  const isSubmittable = isCreateMode ? isFormValid : isDirty && isFormValid;

  const isButtonDisabled = isCreateMode
    ? !isFormValid || isSubmitting
    : !isDirty || isSubmitting;

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);
    if (isSubmitting || !isSubmittable) return;
    setIsSubmitting(true);

    const trimmedValues = {
      ...formValues,
      name: formValues.name.trim(),
      description: formValues.description.trim(),
      price: Number(String(formValues.price).replace(/[^0-9]/g, '')),
    };

    try {
      await onSubmit(trimmedValues);
      setFormValues(trimmedValues);
      setInitialValues(trimmedValues);
    } catch (error) {
      await showModal({
        variant: 'confirmation',
        title:
          submitLabel === 'create'
            ? '등록에 실패했어요.'
            : '저장에 실패했어요.',
        description: error.message || '잠시 후 다시 시도해주세요.',
        confirmText: '확인',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadError = async (retryUploadFn) => {
    const { confirmed } = await showModal({
      variant: 'confirmation',
      title: '이미지 업로드에 실패했습니다',
      description: '지원하지 않는 파일 형식이거나,\n용량이 초과되었어요.',
      cancelText: '닫기',
      confirmText: '재업로드',
    });

    if (confirmed && retryUploadFn) {
      retryUploadFn();
    }
  };

  const visibleErrors = hasAttemptedSubmit
    ? Object.fromEntries(
        Object.entries(fieldErrors).map(([key, hasError]) => [
          key,
          hasError ? FIELD_ERROR_MESSAGES[key] : undefined,
        ]),
      )
    : {};

  return {
    formValues,
    updateField,
    visibleErrors,
    isButtonDisabled,
    handleSubmit,
    handleUploadError,
  };
}
