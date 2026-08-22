import { useState } from 'react';

const REQUIRED_FIELDS = [
  { key: 'tags', check: (form) => form.tags.length > 0, label: '카테고리' },
  {
    key: 'marks',
    check: (form) => form.marks.length > 0,
    label: '비건 / 친환경 카테고리',
  },
  {
    key: 'operatingTime',
    check: (form) => form.operatingTime !== null,
    label: '운영 시간',
  },
  {
    key: 'cash',
    check: (form) => form.cash !== undefined && form.cash !== null,
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

export function useBoothForm(initialData) {
  const [boothForm, setBoothForm] = useState(() => ({
    representativeImage: initialData.representativeImage,
    boothName: initialData.boothName,
    tags: initialData.tags,
    marks: initialData.marks,
    operatingTime: initialData.operatingTime,
    cash: initialData.cash,
    location: initialData.location,
    url: initialData.url,
    inquiryUrl: initialData.inquiryUrl,
    description: initialData.description,
    allergyInfo: initialData.allergyInfo,
    notice: initialData.notice,
    announcement: initialData.announcement,
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
    // TODO: 공지사항 수정 로직 구현
    alert(`공지사항 ${noticeId} 수정`);
  };

  const handleDeleteNotice = (noticeId) => {
    setBoothForm((prev) => ({
      ...prev,
      notice: prev.notice.filter((notice) => notice.id !== noticeId),
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
