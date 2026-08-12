import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { BOOTH_ROUTE } from '@/constants/routes';
import NoticeForm from './components/NoticeForm';
import {
  NoticeDeleteWrapper,
  NoticeFormContainer,
  NoticeFormContent,
} from './style';
import {
  deleteConfirmModal,
  exitConfirmModal,
  submitFailModal,
} from './constants/noticeForm';
import {
  createBoothNotice,
  deleteBoothNotice,
  fetchBoothNotice,
  updateBoothNotice,
} from '@/api/notice';

/**
 * 부스 공지사항 등록/수정 화면입니다.
 *
 * @param {'register'|'edit'} mode - 화면 모드
 */
export default function BoothNoticeFormScreen({ mode }) {
  const { boothId, noticeId } = useParams();
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const { showModal } = useModal();

  const isEdit = mode === 'edit';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [initial, setInitial] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({ title: false, content: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    fetchBoothNotice({ boothId, noticeId }).then((notice) => {
      setTitle(notice.title);
      setContent(notice.content);
      setInitial({ title: notice.title, content: notice.content });
    });
  }, [boothId, noticeId, isEdit]);

  const isFormFilled = title.trim().length > 0 && content.trim().length > 0;
  const hasChanges = title !== initial.title || content !== initial.content;
  const isDirty = isEdit ? hasChanges : isFormFilled;
  const isSubmitEnabled = isEdit ? hasChanges : isFormFilled;

  const handleFieldChange = (field, value) => {
    if (field === 'title') setTitle(value);
    else setContent(value);
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleExit = async () => {
    if (!isDirty) {
      handleBack();
      return;
    }

    const result = await showModal(exitConfirmModal);
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
      if (isEdit) {
        await updateBoothNotice({ boothId, noticeId, title, content });
      } else {
        await createBoothNotice({ boothId, title, content });
      }
      navigate(BOOTH_ROUTE(boothId));
    } catch {
      await showModal(submitFailModal);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const result = await showModal(deleteConfirmModal);
    if (!result.confirmed) return;

    await deleteBoothNotice({ boothId, noticeId });
    navigate(BOOTH_ROUTE(boothId));
  };

  const actionLabel = isEdit ? '저장' : '등록';

  return (
    <NoticeFormContainer>
      <FillCenterHeader
        onBack={handleExit}
        title={isEdit ? '공지사항' : '공지사항'}
        right={
          <TextButton
            variant="primary"
            size="sm"
            disabled={!isSubmitEnabled || isSubmitting}
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

      {isEdit && (
        <NoticeDeleteWrapper>
          <TextButton variant="secondary" size="sm" onClick={handleDelete}>
            삭제하기
          </TextButton>
        </NoticeDeleteWrapper>
      )}
    </NoticeFormContainer>
  );
}
