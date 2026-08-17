import { useState } from 'react';
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
import { createBoothNotice, updateBoothNotice } from '../mock/notice';
import NavigationBar from '@/designsystem/components/navigationbar/NavigationBar';

export default function BoothNoticeFormScreen({ mode }) {
  const { boothId, noticeId } = useParams();
  // TODO: API 연동 시 number 타입 변환 필요 — const parsedBoothId = Number(boothId);
  const navigate = useNavigate();
  const handleBack = useGoBack();
  const { showModal } = useModal();

  const isEdit = mode === 'edit';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [initial, setInitial] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({ title: false, content: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormFilled = title.trim().length > 0 && content.trim().length > 0;
  const hasChanges = title !== initial.title || content !== initial.content;
  const isDirty = isEdit ? hasChanges : isFormFilled;

  const handleFieldChange = (field, value) => {
    if (field === 'title') setTitle(value);
    else setContent(value);
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleExit = async () => {
    const result = await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요',
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
        await updateBoothNotice({
          boothId,
          noticeId,
          title: trimmedTitle,
          content: trimmedContent,
        });
        navigate(BOOTH_ROUTES.DETAIL(boothId));
      } else {
        const res = await createBoothNotice({
          boothId,
          title: trimmedTitle,
          content: trimmedContent,
        });
        navigate(BOOTH_ROUTES.EDIT(boothId, res.id));
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
