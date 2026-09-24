import { useState, useRef, useMemo, useEffect } from 'react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import Tag from '@/designsystem/components/tag/Tag';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import Editor from '../components/Editor';
import useModal from '@/hooks/modal/useModal';
import { useGoBack } from '@/hooks/useGoBack';
import {
  EventFormContainer,
  CategoryContainer,
  ContentContainer,
  CategoryTitle,
  TagGroup,
} from './style';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useImageUpload } from '@/api/core/s3/useImageUpload';

const EVENT_TYPES = [
  { label: '사전', value: 'pre' },
  { label: '현장', value: 'live' },
  { label: '사후', value: 'post' },
];

const ORGANIZER_TYPES = [
  { label: 'EMC 주최', value: 'EMC' },
  { label: '협찬사 주최', value: 'SPONSOR' },
];

const LIVE_EVENT_DATE = new Date(2026, 9, 13);

const toDateString = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultPeriodForType = (type) => {
  if (type === 'live') {
    return { start: LIVE_EVENT_DATE, end: LIVE_EVENT_DATE };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return { start: today, end: tomorrow };
};

function createInitialFormData(initialData) {
  return {
    imageUrl: initialData?.imageUrl ?? '',
    imageS3Key: initialData?.imageS3Key ?? '',
    title: initialData?.title ?? '',
    eventType: initialData?.eventType ?? null,
    organizer: initialData?.organizer ?? null,
    period: {
      start: initialData?.startDate ? new Date(initialData.startDate) : null,
      end: initialData?.endDate ? new Date(initialData.endDate) : null,
    },
    description: initialData?.description ?? '',
    caution: initialData?.caution ?? '',
  };
}

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 저장 콜백. 성공 시 resolve, 실패 시 reject하는 Promise를 반환해야 함
 */
export default function EventForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const goBack = useGoBack(ADMIN_ROUTES.DASHBOARD);
  const { showModal } = useModal();

  const ownerIdRef = useRef(crypto.randomUUID());
  const ownerId = initialData?.id ?? ownerIdRef.current;

  const initialFormDataRef = useRef(createInitialFormData(initialData));

  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );
  const [imageFile, setImageFile] = useState(null);
  const [touched, setTouched] = useState({ title: false });
  const [isSaving, setIsSaving] = useState(false);

  const hasLoadedRef = useRef(!!initialData);

  useEffect(() => {
    if (initialData && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      const next = createInitialFormData(initialData);
      initialFormDataRef.current = next;
      setFormData(next);
      setImageFile(null);
    }
  }, [initialData]);

  const {
    imageUrl,
    title,
    eventType,
    organizer,
    period,
    description,
    caution,
  } = formData;

  const { mutateAsync: uploadImage, isPending: isUploading } = useImageUpload();

  const isLiveEvent = eventType === 'live';

  const isDirty = useMemo(() => {
    const initial = initialFormDataRef.current;
    if (imageFile) return true;
    if (title !== initial.title) return true;
    if (eventType !== initial.eventType) return true;
    if (organizer !== initial.organizer) return true;
    if (description !== initial.description) return true;
    if (caution !== initial.caution) return true;
    if (imageUrl !== initial.imageUrl) return true;
    if (
      toDateString(period.start) !== toDateString(initial.period.start) ||
      toDateString(period.end) !== toDateString(initial.period.end)
    ) {
      return true;
    }
    return false;
  }, [formData, imageFile]);

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEventTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      eventType: value,
      period: getDefaultPeriodForType(value),
    }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasError =
    !title.trim() ||
    !eventType ||
    !organizer ||
    !period.start ||
    !period.end ||
    !description.trim();

  const handleImageUpload = (file) => {
    setImageFile(file);
    setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, imageUrl: '', imageS3Key: '' }));
  };

  const handleSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      let imageS3Key = formData.imageS3Key;
      if (imageFile) {
        const { fileKey } = await uploadImage({
          file: imageFile,
          imageType: 'event_image',
          ownerId,
        });
        imageS3Key = fileKey;
      }

      const trimmed = {
        title: title.trim(),
        description: description.trim(),
        caution: caution.trim(),
      };

      await onSubmit?.({
        eventType,
        organizer,
        startDate: toDateString(period.start),
        endDate: toDateString(period.end),
        imageS3Key,
        ...trimmed,
      });

      const saved = { ...formData, ...trimmed, imageS3Key };
      initialFormDataRef.current = saved;
      setFormData(saved);
      setImageFile(null);
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
    <EventFormContainer>
      <FillCenterHeader
        onBack={handleBack}
        right={
          <TextButton
            disabled={hasError || isSaving || !isDirty}
            onClick={handleSubmit}
            size="sm"
            variant="primary"
          >
            {isUploading ? '업로드 중...' : isEdit ? '저장' : '등록'}
          </TextButton>
        }
        title="이벤트"
      />
      <MainImageUploader
        imageUrl={imageUrl}
        onDelete={handleImageDelete}
        onUpload={handleImageUpload}
      />
      <ContentContainer>
        <TextField
          maxLength={36}
          onChange={updateField('title')}
          onBlur={handleBlur('title')}
          placeholder="이벤트 제목을 작성해주세요."
          required
          title="제목"
          value={title}
          hasError={touched.title && !title.trim()}
          helperText={
            touched.title && !title.trim() ? '내용을 입력해주세요.' : ''
          }
        />

        <CategoryContainer>
          <CategoryTitle>
            이벤트 유형
            <span>*</span>
          </CategoryTitle>
          <TagGroup>
            {EVENT_TYPES.map(({ label, value }) => (
              <Tag
                key={value}
                label={label}
                variant="button"
                selected={eventType === value}
                onClick={() => handleEventTypeChange(value)}
              />
            ))}
          </TagGroup>
        </CategoryContainer>

        <CategoryContainer>
          <CategoryTitle>
            주최
            <span>*</span>
          </CategoryTitle>
          <TagGroup>
            {ORGANIZER_TYPES.map(({ label, value }) => (
              <Tag
                key={value}
                label={label}
                variant="button"
                selected={organizer === value}
                onClick={() => updateField('organizer')(value)}
              />
            ))}
          </TagGroup>
        </CategoryContainer>

        <DatePicker
          label="기간 설정"
          required
          disabled={isLiveEvent}
          value={period}
          onChange={updateField('period')}
        />

        <CategoryContainer>
          <CategoryTitle>
            내용
            <span>*</span>
          </CategoryTitle>
          <Editor
            content={description}
            onChange={updateField('description')}
            ownerId={ownerId}
            imageType="event_description"
          />
        </CategoryContainer>

        <TextArea
          maxLength={1000}
          onChange={updateField('caution')}
          placeholder="이벤트 유의사항을 작성해주세요."
          rows={4}
          title="유의사항"
          value={caution}
        />
      </ContentContainer>
    </EventFormContainer>
  );
}
