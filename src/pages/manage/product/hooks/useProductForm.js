import { useState } from 'react';

const getInitialValues = (product) => ({
  name: product?.name ?? '',
  price: product?.price ?? '',
  status: product?.status ?? 'ON_SALE',
  description: product?.description ?? '',
  thumbnail: product?.thumbnail ?? '',
  groupId: product?.groupId ?? null,
});

export function useProductForm({ product, submitLabel, onSubmit }) {
  const isCreateMode = submitLabel === 'create';

  const [initialValues] = useState(() => getInitialValues(product));
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const isFormValid =
    formValues.name.trim() !== '' &&
    formValues.price !== '' &&
    formValues.status !== '' &&
    formValues.description.trim() !== '' &&
    formValues.thumbnail !== '';

  const isDirty =
    !isCreateMode &&
    JSON.stringify(formValues) !== JSON.stringify(initialValues);

  const isSubmittable = isCreateMode ? isFormValid : isDirty;

  const handleSubmit = async () => {
    if (isSubmitting || !isSubmittable) return;
    setIsSubmitting(true);

    try {
      await onSubmit(formValues);
    } catch (error) {
      // TODO: 에러 핸들링
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isCreateMode,
    formValues,
    updateField,
    isSubmitting,
    isSubmittable,
    handleSubmit,
  };
}
