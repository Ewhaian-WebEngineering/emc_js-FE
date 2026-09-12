import { BOOTH_ROUTES } from '@/constants/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REQUIRED_FIELDS = [
  {
    key: 'categories',
    check: (form) => form.categories.length > 0,
    label: '카테고리',
  },
  {
    key: 'marks',
    check: (form) => form.marks.length > 0,
    label: '비건 / 친환경 카테고리',
  },
  {
    key: 'operationTime',
    check: (form) => form.operationTime !== null,
    label: '운영 시간',
  },
  {
    key: 'isCash',
    check: (form) => form.isCash !== undefined && form.isCash !== null,
    label: '현금 사용 여부',
  },
  {
    key: 'description',
    check: (form) => form.description?.trim(),
    label: '부스 소개',
  },
  {
    key: 'inquiryUrl',
    check: (form) => form.inquiryUrl?.trim(),
    label: '고객 문의 창구',
  },
];

const REQUIRED_MESSAGE = '내용을 입력해주세요.';

export function useBoothForm(initialData, boothId) {
  const navigate = useNavigate();

  const [boothForm, setBoothForm] = useState(() => ({
    representativeImage: initialData.representativeImage,
    name: initialData.name,
    categories: initialData.categories,
    marks: initialData.marks,
    operationTime: initialData.operationTime,
    isCash: initialData.isCash,
    location: initialData.location,
    externalUrl: initialData.externalUrl,
    inquiryUrl: initialData.inquiryUrl,
    description: initialData.description,
    allergenInfo: initialData.allergenInfo,
    notices: initialData.notices,
    guides: initialData.guides,
  }));

  const [errors, setErrors] = useState({});

  const updateField = (field) => (value) => {
    setBoothForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleEditNotice = (noticeId) => {
    const targetNotice = boothForm.notices.find(
      (notice) => notice.id === noticeId,
    );

    if (!targetNotice) return;

    navigate(BOOTH_ROUTES.EDIT(boothId, noticeId), {
      state: { noticeData: targetNotice },
    });
  };

  const handleDeleteNotice = (noticeId) => {
    setBoothForm((prev) => ({
      ...prev,
      notices: prev.notices.filter((notice) => notice.id !== noticeId),
    }));
  };

  const validate = () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach(({ key, check }) => {
      if (!check(boothForm)) {
        nextErrors[key] = REQUIRED_MESSAGE;
      }
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
