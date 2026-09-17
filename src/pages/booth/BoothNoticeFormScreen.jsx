import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { MANAGE_ROUTES } from '@/constants/routes';
import NoticeForm from './components/NoticeForm';
import { NoticeFormContainer, NoticeFormContent } from './style';
import {
  useCreateNotice,
  useNoticeList,
  useUpdateNotice,
} from '@/api/feature/booth/useBoothData';

export default function BoothNoticeFormScreen({ mode }) {
  const { boothId, noticeId } = useParams();
  const location = useLocation();
  const { data: noticeList } = useNoticeList(boothId);
  const noticeData =
    location.state?.noticeData ??
    noticeList?.find((notice) => notice.id === noticeId);

  const navigate = useNavigate();
  const handleBack = useGoBack();
  const { showModal } = useModal();
  const createNoticeMutation = useCreateNotice(boothId);
  const updateNoticeMutation = useUpdateNotice(boothId);

  const isEdit = mode === 'edit';

  const [title, setTitle] = useState(
    isEdit && noticeData ? noticeData.title : '',
  );
  const [content, setContent] = useState(
    isEdit && noticeData ? noticeData.content : '',
  );
  const [initial] = useState({
    title: isEdit && noticeData ? noticeData.title : '',
    content: isEdit && noticeData ? noticeData.content : '',
  });
  const [errors, setErrors] = useState({ title: false, content: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormFilled = title.trim().length > 0 && content.trim().length > 0;
  const hasAnyInput = title.trim().length > 0 || content.trim().length > 0;
  const hasChanges = title !== initial.title || content !== initial.content;
  const isDirty = isEdit ? hasChanges : hasAnyInput;
  const canSubmit = isEdit ? hasChanges : isFormFilled;

  const handleFieldChange = (field, value) => {
    if (field === 'title') setTitle(value);
    else setContent(value);
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleExit = async () => {
    if (isSubmitting) return;
    if (!isDirty) {
      handleBack();
      return;
    }
    const result = await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      cancelText: '나가기',
      confirmText: '계속 작성하기',
    });
    if (!result.confirmed) {
      handleBack();
    }
  };

  const handleSubmit = async () => {
    const nextErrors = {
      title: title.trim().length === 0,
      content: content.trim().length === 0,
    };
    setErrors(nextErrors);
    if (nextErrors.title || nextErrors.content) return;

    setIsSubmitting(true);
    try {
      const trimmedTitle = title.trim();
      const trimmedContent = content.trim();
      if (isEdit) {
        await updateNoticeMutation.mutateAsync({
          nid: noticeId,
          title: trimmedTitle,
          content: trimmedContent,
        });
        navigate(MANAGE_ROUTES.BOOTH_EDIT(boothId));
      } else {
        await createNoticeMutation.mutateAsync({
          title: trimmedTitle,
          content: trimmedContent,
        });
        navigate(MANAGE_ROUTES.BOOTH_EDIT(boothId));
      }
    } catch {
      await showModal({
        variant: 'alert',
        title: '등록에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요.',
        cancelText: '확인',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionLabel = isEdit ? '저장' : '등록';

  return (
    <NoticeFormContainer>
      <FillCenterHeader
        onBack={handleExit}
        title="공지사항"
        border
        right={
          <TextButton
            variant="primary"
            size="sm"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
          >
            {actionLabel}
          </TextButton>
        }
      />

      <NoticeFormContent>
        <NoticeForm
          title={title}
          content={content}
          errors={errors}
          onChange={handleFieldChange}
        />
      </NoticeFormContent>
    </NoticeFormContainer>
  );
}
