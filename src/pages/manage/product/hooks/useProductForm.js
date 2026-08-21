import { useState } from 'react';

const getInitialValues = (product) => ({
  name: product?.name ?? '',
  price: product?.price ?? '',
  status: product?.status ?? 'ON_SALE',
  description: product?.description ?? '',
  thumbnail: product?.thumbnail ?? '',
  groupId: product?.groupId ?? null,
});

const FIELD_ERROR_MESSAGES = {
  name: '내용을 입력해주세요.',
  price: '가격을 입력해주세요.',
  description: '내용을 입력해주세요.',
  thumbnail: '이미지를 업로드 해주세요.',
};

export function useProductForm({ product, submitLabel, onSubmit }) {
  const isCreateMode = submitLabel === 'create';

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
    thumbnail: formValues.thumbnail === '',
  };

  const isFormValid = !Object.values(fieldErrors).some(Boolean);

  const isDirty =
    !isCreateMode &&
    JSON.stringify(formValues) !== JSON.stringify(initialValues);

  const isSubmittable = isCreateMode ? isFormValid : isDirty && isFormValid;

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);
    if (isSubmitting || !isSubmittable) return;
    setIsSubmitting(true);

    try {
      await onSubmit(formValues);
      setInitialValues(formValues);
    } catch (error) {
      // TODO: 에러 핸들링
    } finally {
      setIsSubmitting(false);
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
    isCreateMode,
    formValues,
    updateField,
    isSubmitting,
    isSubmittable,
    fieldErrors,
    visibleErrors,
    handleSubmit,
  };
}
