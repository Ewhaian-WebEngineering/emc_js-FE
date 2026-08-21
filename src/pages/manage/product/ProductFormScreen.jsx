import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useState } from 'react';

const getInitialValues = (product) => ({
  name: product?.name ?? '',
  price: product?.price ?? '',
  status: product?.status ?? 'ON_SALE',
  description: product?.description ?? '',
  thumbnail: product?.thumbnail ?? '',
  groupId: product?.groupId ?? null,
});

export default function ProductFormScreen({ product, onSubmit, submitLabel }) {
  const isCreateMode = submitLabel === 'create';

  const [initialValues] = useState(() => getInitialValues(product));
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    alert('go back');
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
      setIsSubmitting(true);
      await onSubmit(formValues);
    } catch (error) {
      // TODO: 에러 핸들링
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FillCenterHeader
        onBack={handleBack}
        title="제품"
        right={
          <TextButton onClick={handleSubmit} disabled={!isSubmittable}>
            {submitLabel === 'create' ? '등록' : '저장'}
          </TextButton>
        }
        border
      />
    </>
  );
}
