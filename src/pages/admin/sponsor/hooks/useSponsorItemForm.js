import useModal from '@/hooks/modal/useModal';
import { useState } from 'react';

const getInitialValues = (item) => ({
  name: item?.name ?? '',
  description: item?.description ?? '',
  thumbnail: item?.thumbnail ?? '',
  groupId: item?.groupId ?? null,
});

const FIELD_ERROR_MESSAGES = {
  name: '내용을 입력해주세요.',
  description: '내용을 입력해주세요.',
  thumbnail: '이미지를 업로드 해주세요.',
};

export function useSponsorItemForm({ item, submitLabel, onSubmit }) {
  const isCreateMode = submitLabel === 'create';
  const { showModal } = useModal();

  const [initialValues, setInitialValues] = useState(() =>
    getInitialValues(item),
  );
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const updateField = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const fieldErrors = {
    name: formValues.name.trim() === '',
    description: formValues.description.trim() === '',
    thumbnail: formValues.thumbnail === '',
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
    };

    try {
      await onSubmit(trimmedValues);
      setFormValues(trimmedValues);
      setInitialValues(trimmedValues);
    } catch (error) {
      // TODO: 에러 핸들링
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
