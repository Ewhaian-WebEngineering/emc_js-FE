import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { MANAGE_ROUTES } from '@/constants/routes';
import NoticeForm from './components/NoticeForm';
import { NoticeFormContainer, NoticeFormContent } from './style';
import { useNoticeList } from '@/api/feature/booth/useBoothData';
import { useBoothDraftStore } from '../manage/store/useBoothDraftStore';
import { upsertNoticeDraft } from '../manage/store/boothDraftStore';

export default function BoothNoticeFormScreen({ mode }) {
  const { boothId, noticeId } = useParams();
  const location = useLocation();
  const { data: noticeList } = useNoticeList(boothId);
  const draft = useBoothDraftStore();

  const isEdit = mode === 'edit';
  const draftEntry = isEdit ? draft.notices[noticeId] : null;

  const noticeData =
    draftEntry?.data ??
    location.state?.noticeData ??
    noticeList?.find((notice) => notice.id === noticeId);

  const navigate = useNavigate();
  const handleBack = useGoBack();
  const { showModal } = useModal();

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

    if (isEdit) {
      const status = draftEntry?.status === 'created' ? 'created' : 'updated';
      upsertNoticeDraft(noticeId, {
        status,
        data: { title: trimmedTitle, content: trimmedContent },
      });
    } else {
      const tempId = `temp-notice-${crypto.randomUUID()}`;
      upsertNoticeDraft(tempId, {
        status: 'created',
        data: { title: trimmedTitle, content: trimmedContent },
      });
    }

    navigate(MANAGE_ROUTES.BOOTH_EDIT(boothId));
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
