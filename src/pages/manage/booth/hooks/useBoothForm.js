import { useState } from 'react';

const REQUIRED_FIELDS = [
  { check: (form) => form.tags.length > 0, label: '카테고리' },
  { check: (form) => form.marks.length > 0, label: '비건 / 친환경 카테고리' },
  { check: (form) => form.operatingTime !== null, label: '운영 시간' },
  {
    check: (form) => form.cash !== undefined && form.cash !== null,
    label: '현금 사용 여부',
  },
  { check: (form) => form.description?.trim(), label: '부스 소개' },
  { check: (form) => form.inquiryUrl?.trim(), label: '고객 문의 창구' },
];

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

  const updateField = (field) => (value) => {
    setBoothForm((prev) => ({ ...prev, [field]: value }));
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

  const getValidationError = () => {
    const missing = REQUIRED_FIELDS.find(({ check }) => !check(boothForm));
    return missing ? `${missing.label}을(를) 입력해주세요.` : null;
  };

  return {
    boothForm,
    updateField,
    handleEditNotice,
    handleDeleteNotice,
    getValidationError,
  };
}
