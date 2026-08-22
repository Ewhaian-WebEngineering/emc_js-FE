import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import useModal from '@/hooks/modal/useModal';
import { BannerFormContainer, ContentContainer } from './style';
import { ADMIN_ROUTES } from '@/constants/routes';

const urlRegExp =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;

const normalizeUrl = (url) => {
  const trimmed = url.trim();

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 등록/수정 완료 시 호출되는 콜백
 */

function createInitialFormData(initialData) {
  return {
    imageUrl: initialData?.imageUrl ?? '',
    title: initialData?.title ?? '',
    period: initialData?.period ?? { start: null, end: null },
    url: initialData?.url ?? '',
  };
}

export default function BannerForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );
  const [touched, setTouched] = useState({
    title: false,
    url: false,
  });
  const { imageUrl, title, period, url } = formData;

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isUrlInvalid =
    url.trim() !== '' &&
    !url.trim().startsWith('/') &&
    !urlRegExp.test(url.trim());

  const hasError =
    !title.trim() ||
    !period.start ||
    !period.end ||
    !url.trim() ||
    isUrlInvalid;

  const handleSubmit = () => {
    onSubmit?.({
      ...formData,
      title: title.trim(),
      url: normalizeUrl(url),
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

  const getUrlHelperText = () => {
    if (!touched.url) return '';
    if (!url.trim()) return '내용을 입력해주세요.';
    if (isUrlInvalid) return '잘못된 URL 형식입니다.';
    return '';
  };

  return (
    <BannerFormContainer>
      <FillCenterHeader
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
        title="배너"
      />
      <MainImageUploader
        imageUrl={imageUrl}
        onDelete={() => updateField('imageUrl')('')}
        onUpload={updateField('imageUrl')}
      />
      <ContentContainer>
        <TextField
          maxLength={36}
          onChange={(e) => updateField('title')(e.target.value)}
          onBlur={handleBlur('title')}
          placeholder="배너 제목을 작성해주세요."
          required
          title="제목"
          value={title}
          hasError={touched.title && !title.trim()}
          helperText={
            touched.title && !title.trim() ? '내용을 입력해주세요.' : ''
          }
        />

        <DatePicker
          label="기간 설정"
          required
          value={period}
          onChange={updateField('period')}
        />

        <TextField
          onChange={(e) => updateField('url')(e.target.value)}
          onBlur={handleBlur('url')}
          placeholder="https:// 또는 /path 형태로 입력해주세요."
          required
          title="URL"
          value={url}
          hasError={touched.url && (!url.trim() || isUrlInvalid)}
          helperText={getUrlHelperText()}
        />
      </ContentContainer>
    </BannerFormContainer>
  );
}
