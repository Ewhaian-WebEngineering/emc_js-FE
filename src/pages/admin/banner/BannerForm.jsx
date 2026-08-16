import { useState } from 'react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import { BannerFormContainer, ContentContainer } from './style';

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

  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );
  const { imageUrl, title, period, url } = formData;

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isPeriodInvalid =
    period.start && period.end && period.start > period.end;

  const hasError =
    !title.trim() ||
    !period.start ||
    !period.end ||
    isPeriodInvalid ||
    !url.trim();

  const handleSubmit = () => {
    if (hasError) return;

    onSubmit?.({
      ...formData,
      title: title.trim(),
      url: url.trim(),
    });
  };

  return (
    <BannerFormContainer>
      <FillCenterHeader
        onBack={() => {}}
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
          placeholder="배너 제목을 작성해주세요."
          required
          title="제목"
          value={title}
          hasError={isEdit && !title.trim()}
          helperText={isEdit && !title.trim() ? '내용을 입력해주세요' : ''}
        />

        <DatePicker
          label="기간 설정"
          required
          value={period}
          onChange={updateField('period')}
        />

        <TextField
          onChange={(e) => updateField('url')(e.target.value)}
          placeholder="https:// 또는 /path 형태로 입력해주세요."
          required
          title="URL"
          value={url}
          hasError={isEdit && !url.trim()}
          helperText={isEdit && !url.trim() ? '내용을 입력해주세요' : ''}
        />
      </ContentContainer>
    </BannerFormContainer>
  );
}
