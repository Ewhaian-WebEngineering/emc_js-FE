import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import NoticeForm from './components/NoticeForm';
import { NoticeFormContainer, NoticeFormContent } from './style';
import { useNoticeList } from '@/api/feature/booth/useBoothData';
import { useBoothDraftStore } from '../manage/store/useBoothDraftStore';
import { upsertNoticeDraft } from '../manage/store/boothDraftStore';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function BoothNoticeFormScreen({ mode }) {
  const { boothId, noticeId } = useParams();
  const location = useLocation();
  const { data: noticeList } = useNoticeList(boothId);
  const draft = useBoothDraftStore();
  const { toast } = useToastContext();
  const handleBack = useGoBack();
  const { showModal } = useModal();

  const isEdit = mode === 'edit';

  const [createdId, setCreatedId] = useState(null);
  const targetId = isEdit ? noticeId : createdId;
  const isEditing = targetId !== null;

  const draftEntry = isEdit ? draft.notices[noticeId] : null;
  const noticeData =
    draftEntry?.data ??
    location.state?.noticeData ??
    noticeList?.find((notice) => notice.id === noticeId);

  const initialTitle = isEdit && noticeData ? noticeData.title : '';
  const initialContent = isEdit && noticeData ? noticeData.content : '';

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [initial, setInitial] = useState({
    title: initialTitle,
    content: initialContent,
  });
  const [errors, setErrors] = useState({ title: false, content: false });

  const isFormFilled = title.trim().length > 0 && content.trim().length > 0;
  const hasChanges = title !== initial.title || content !== initial.content;
  const isDirty = hasChanges;
  const canSubmit = isEditing ? hasChanges : isFormFilled;

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

  const handleSubmit = () => {
    const nextErrors = {
      title: title.trim().length === 0,
      content: content.trim().length === 0,
    };
    setErrors(nextErrors);
    if (nextErrors.title || nextErrors.content) return;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const data = { title: trimmedTitle, content: trimmedContent };

    if (isEditing) {
      const existing = draft.notices[targetId];
      const status = existing?.status === 'created' ? 'created' : 'updated';
      upsertNoticeDraft(targetId, { status, data });
    } else {
      const tempId = `temp-notice-${crypto.randomUUID()}`;
      upsertNoticeDraft(tempId, { status: 'created', data });
      setCreatedId(tempId);
    }

    setTitle(trimmedTitle);
    setContent(trimmedContent);
    setInitial(data);

    toast({ message: '변경사항이 저장되었어요.' });

    if (!isEdit) {
      handleBack();
      return;
    }
  };

  const actionLabel = isEditing ? '저장' : '등록';

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
            disabled={!canSubmit}
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
