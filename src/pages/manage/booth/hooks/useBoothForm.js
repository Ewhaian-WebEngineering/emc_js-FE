import { useEffect, useState } from 'react';
import { useBoothDraftStore } from '../../store/useBoothDraftStore';
import {
  initDraft,
  markNoticeDeleted,
  updateBoothField,
} from '../../store/boothDraftStore';
import { getBoothMarks, marksToFlags } from '@/utils/formatBooth';
import { BOOTH_ROUTES } from '@/constants/routes';

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

function buildNotices(serverNotices, draftNotices) {
  const base = serverNotices
    .map((notice) => {
      const entry = draftNotices[notice.id];
      if (entry?.status === 'deleted') return null;
      return entry?.status === 'updated'
        ? { ...notice, ...entry.data }
        : notice;
    })
    .filter(Boolean);

  const created = Object.entries(draftNotices)
    .filter(([, entry]) => entry.status === 'created')
    .map(([tempId, entry]) => ({ id: tempId, ...entry.data }));

  return [...base, ...created];
}

export function useBoothForm(booth, boothId) {
  const draft = useBoothDraftStore();

  useEffect(() => {
    initDraft(boothId, booth);
  }, [boothId]);

  const [errors, setErrors] = useState({});

  const fields = draft.boothFields ?? booth;
  const boothForm = {
    ...fields,
    marks: getBoothMarks(fields),
    name: booth.name,
    location: booth.location,
    notices: buildNotices(booth.notices, draft.notices),
  };

  const updateField = (field) => (value) => {
    if (field === 'marks') {
      const { isVegan, isEco } = marksToFlags(value);
      updateBoothField('isVegan', isVegan);
      updateBoothField('isEco', isEco);
    } else if (field !== 'notices') {
      updateBoothField(field, value);
    }
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleEditNotice = (noticeId, navigate) => {
    const targetNotice = boothForm.notices.find(
      (notice) => notice.id === noticeId,
    );
    if (!targetNotice) return;
    navigate(BOOTH_ROUTES.EDIT(boothId, noticeId), {
      state: { noticeData: targetNotice },
    });
  };

  const handleDeleteNotice = (noticeId) => {
    markNoticeDeleted(noticeId);
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
    handleEditNotice,
    handleDeleteNotice,
    errors,
    validate,
  };
}
