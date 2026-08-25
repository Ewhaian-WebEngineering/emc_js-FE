import { useState } from 'react';

const getInitialValues = (sponsor) => ({
  name: sponsor?.name ?? '',
  location: sponsor?.location ?? '',
  operatingTime: sponsor?.operatingTime ?? 'allDay',
  url: sponsor?.url ?? '',
  shortDescription: sponsor?.shortDescription ?? '',
  description: sponsor?.description ?? '',
  profileImage: sponsor?.profileImage ?? '',
});

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!values.operatingTime) errors.operatingTime = '운영 시간을 선택해주세요.';
  if (!values.shortDescription.trim())
    errors.shortDescription = '한 줄 소개를 입력해주세요.';
  if (!values.description.trim())
    errors.description = '협찬사 소개를 입력해주세요.';
  if (!values.profileImage)
    errors.profileImage = '프로필 이미지를 등록해주세요.';

  return errors;
};

export function useSponsorForm({ sponsor, submitLabel, onSubmit }) {
  const [formValues, setFormValues] = useState(getInitialValues(sponsor));
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const updateField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const visibleErrors = hasAttemptedSubmit ? errors : {};

  const isButtonDisabled =
    !formValues.name.trim() ||
    !formValues.operatingTime ||
    !formValues.shortDescription.trim() ||
    !formValues.description.trim();

  const handleUploadError = (message) => {
    setUploadError(message);
  };

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);
    const nextErrors = validate(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(formValues);
  };

  return {
    formValues,
    updateField,
    visibleErrors,
    isButtonDisabled,
    handleSubmit,
    handleUploadError,
    uploadError,
  };
}
