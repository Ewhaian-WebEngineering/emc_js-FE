import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useProductForm } from './hooks/useProductForm';

export default function ProductFormScreen({ product, onSubmit, submitLabel }) {
  const {
    isCreateMode,
    formValues,
    updateField,
    isSubmitting,
    isSubmittable,
    handleSubmit,
  } = useProductForm({ product, submitLabel, onSubmit });

  const handleBack = () => {
    // TODO: 뒤로가기 모달 추가
    alert('go back');
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
