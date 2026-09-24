import { useState } from 'react';
import FillCenterHeader from '../../../designsystem/components/header/FillCenterHeader';
import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import TextField from '../../../designsystem/components/textinput/textfield/TextField';
import TextArea from '../../../designsystem/components/textinput/textarea/TextArea';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import { FaqFormContainer, ContentContainer } from './style';
import { ADMIN_ROUTES } from '@/constants/routes';

function createInitialFormData(initialData) {
  return {
    que: initialData?.que ?? '',
    ans: initialData?.ans ?? '',
  };
}

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 저장 콜백. 성공 시 resolve, 실패 시 reject하는 Promise를 반환해야 함
 */
export default function FaqForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const goBack = useGoBack(ADMIN_ROUTES.DASHBOARD);
  const { showModal } = useModal();

  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );
  const [baseline, setBaseline] = useState(() =>
    createInitialFormData(initialData),
  );
  const [touched, setTouched] = useState({ que: false, ans: false });
  const [isSaving, setIsSaving] = useState(false);

  const { que, ans } = formData;

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasError = !que.trim() || !ans.trim();
  const isDirty =
    que.trim() !== baseline.que.trim() || ans.trim() !== baseline.ans.trim();
  const isSubmitDisabled = hasError || !isDirty || isSaving;

  const handleSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const trimmed = { que: que.trim(), ans: ans.trim() };

    try {
      await onSubmit?.(trimmed);
      setFormData(trimmed);
      setBaseline(trimmed);
    } catch {
      // 공통 에러 모달
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (!isDirty) {
      goBack();
      return;
    }

    showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      confirmText: '계속 작성하기',
      cancelText: '나가기',
      onCancel: () => goBack(),
    });
  };

  return (
    <FaqFormContainer>
      <FillCenterHeader
        border
        onBack={handleBack}
        right={
          <TextButton
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            size="sm"
            variant="primary"
          >
            {isEdit ? '저장' : '등록'}
          </TextButton>
        }
        title="FAQ"
      />
      <ContentContainer>
        <TextField
          maxLength={25}
          onChange={(value) => updateField('que')(value)}
          onBlur={handleBlur('que')}
          placeholder="예) 종합손물세트가 무엇인가요?"
          required
          title="질문 내용"
          value={que}
          hasError={touched.que && !que.trim()}
          helperText={touched.que && !que.trim() ? '내용을 입력해주세요.' : ''}
        />

        <TextArea
          maxLength={1000}
          onChange={(value) => updateField('ans')(value)}
          onBlur={handleBlur('ans')}
          placeholder="답변 내용을 입력해주세요. (최대 1000자)"
          required
          title="답변 내용"
          value={ans}
          hasError={touched.ans && !ans.trim()}
          helperText={touched.ans && !ans.trim() ? '내용을 입력해주세요.' : ''}
        />
      </ContentContainer>
    </FaqFormContainer>
  );
}
