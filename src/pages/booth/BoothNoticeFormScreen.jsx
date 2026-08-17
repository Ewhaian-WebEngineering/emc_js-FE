import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { BOOTH_ROUTES } from '@/constants/routes';
import NoticeForm from './components/NoticeForm';
import {
  NoticeFormContainer,
  NoticeFormContent,
  NavigationBarWrapper,
} from './style';
import { exitConfirmModal, submitFailModal } from './constants/noticeForm';
import {
  createBoothNotice,
  fetchBoothNotice,
  updateBoothNotice,
} from '../mock/notice';
import NavigationBar from '@/designsystem/components/navigationbar/NavigationBar';

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

  const handleFieldChange = (field, value) => {
    if (field === 'title') setTitle(value);
    else setContent(value);
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleExit = async () => {
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
      navigate(BOOTH_ROUTES.DETAIL(boothId));
    } catch {
      await showModal(submitFailModal);
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
        right={
          <TextButton
            variant="primary"
            size="sm"
            disabled={!isDirty || isSubmitting}
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

      {/* TODO: '마이' 탭 활성화 필요 — NavigationBar의 활성 경로 매칭 처리 필요 */}
      <NavigationBarWrapper>
        <NavigationBar />
      </NavigationBarWrapper>
    </NoticeFormContainer>
  );
}
