import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '../../../designsystem/components/header/FillCenterHeader';
import TextButton from '../../../designsystem/components/button/textbutton/TextButton';
import TextField from '../../../designsystem/components/textinput/textfield/TextField';
import TextArea from '../../../designsystem/components/textinput/textarea/TextArea';
import useModal from '@/hooks/modal/useModal';
import { FaqFormContainer, ContentContainer } from './style';
import { ADMIN_ROUTES } from '@/constants/routes';

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 등록/수정 완료 시 호출되는 콜백
 */

function createInitialFormData(initialData) {
  return {
    que: initialData?.que ?? '',
    ans: initialData?.ans ?? '',
  };
}

export default function FaqForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );
  const [touched, setTouched] = useState({
    que: false,
    ans: false,
  });
  const { que, ans } = formData;

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasError = !que.trim() || !ans.trim();

  const handleSubmit = () => {
    if (hasError) {
      setTouched({ que: true, ans: true });
      return;
    }

    onSubmit?.({
      ...formData,
      que: que.trim(),
      ans: ans.trim(),
    });
  };

  const handleBack = async () => {
    const { confirmed } = await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      confirmText: '계속 작성하기',
      cancelText: '나가기',
    });

    if (!confirmed) {
      navigate(ADMIN_ROUTES.DASHBOARD);
    }
  };

  return (
    <FaqFormContainer>
      <FillCenterHeader
        border
        onBack={handleBack}
        right={
          <TextButton
            disabled={hasError}
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
          onChange={(e) => updateField('que')(e.target.value)}
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
          onChange={(e) => updateField('ans')(e.target.value)}
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
