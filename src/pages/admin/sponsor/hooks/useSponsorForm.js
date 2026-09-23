import { useEffect, useState } from 'react';
import useModal from '@/hooks/modal/useModal';
import { useSponsorDraftStore } from './useSponsorDraftStore';
import {
  initSponsorDraft,
  isSponsorDraftDirty,
  removeSponsorThumbnail,
  setSponsorThumbnail,
  updateSponsorField,
} from '../store/sponsorDraftStore';

const isEditorContentEmpty = (html) => {
  if (!html) return true;
  const textOnly = html.replace(/<[^>]*>/g, '').trim();
  return textOnly === '';
};

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!values.operationTime) errors.operationTime = '운영 시간을 선택해주세요.';
  if (!values.introShort.trim())
    errors.introShort = '한 줄 소개를 입력해주세요.';
  if (isEditorContentEmpty(values.description))
    errors.description = '협찬사 소개를 입력해주세요.';
  if (!values.imageUrl) errors.imageUrl = '프로필 이미지를 등록해주세요.';

  return errors;
};

export function useSponsorForm({ sponsor, onSubmit }) {
  const { showModal } = useModal();
  const draft = useSponsorDraftStore();

  useEffect(() => {
    initSponsorDraft(sponsor);
  }, [sponsor?.id]);

  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const fields = draft.sponsorFields ?? {
    name: '',
    location: '',
    operationTime: 'all_day',
    snsUrl: '',
    externalUrl: '',
    introShort: '',
    description: '',
  };

  const formValues = { ...fields, imageUrl: draft.thumbnail.preview };

  const updateField = (field, value) => {
    if (field === 'imageUrl') {
      if (value instanceof File) {
        setSponsorThumbnail(value, URL.createObjectURL(value));
      } else {
        removeSponsorThumbnail();
      }
    } else {
      updateSponsorField(field, value);
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const visibleErrors = hasAttemptedSubmit ? errors : {};

  const isButtonDisabled = !isSponsorDraftDirty();

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
    isDirty: isSponsorDraftDirty(),
    handleSubmit,
    handleUploadError,
  };
}
