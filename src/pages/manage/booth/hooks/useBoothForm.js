import { useEffect, useState } from 'react';
import { useBoothDraftStore } from '../../store/useBoothDraftStore';
import { initDraft, updateBoothField } from '../../store/boothDraftStore';
import { getBoothMarks, marksToFlags } from '@/utils/formatBooth';

const REQUIRED_FIELDS = [
  { key: 'categories', check: (form) => form.categories.length > 0 },
  { key: 'marks', check: (form) => form.marks.length > 0 },
  { key: 'operationTime', check: (form) => form.operationTime !== null },
  {
    key: 'isCash',
    check: (form) => form.isCash !== undefined && form.isCash !== null,
  },
  { key: 'description', check: (form) => form.description?.trim() },
  { key: 'inquiryUrl', check: (form) => form.inquiryUrl?.trim() },
];

const REQUIRED_MESSAGE = '내용을 입력해주세요.';

export function useBoothForm(booth, boothId) {
  const draft = useBoothDraftStore();

  useEffect(() => {
    initDraft(boothId, booth);
  }, [boothId]);

  const [errors, setErrors] = useState({});

  const fields = draft.boothFields ?? booth;
  const boothForm = {
    ...fields,
    marks: getBoothMarks(fields).length > 0 ? getBoothMarks(fields) : ['none'],
    name: booth.name,
    location: booth.location,
  };

  const updateField = (field) => (value) => {
    if (field === 'marks') {
      const { isVegan, isEco } = marksToFlags(value);
      updateBoothField('isVegan', isVegan);
      updateBoothField('isEco', isEco);
    } else {
      updateBoothField(field, value);
    }
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach(({ key, check }) => {
      if (!check(boothForm)) nextErrors[key] = REQUIRED_MESSAGE;
    });
    setErrors(nextErrors);
    return nextErrors;
  };

  return {
    boothForm,
    updateField,
    errors,
    validate,
  };
}
