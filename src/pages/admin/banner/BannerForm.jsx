import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import useModal from '@/hooks/modal/useModal';
import { BannerFormContainer, ContentContainer } from './style';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useImageUpload } from '@/api/core/s3/useImageUpload';

const URL_REGEXP =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;

// 이미지가 없을 때 서버로 보내는 기본(placeholder) 이미지
const DEFAULT_IMAGE_KEY = '@/assets/img/img_checker.png';

// 서버에서 내려온 값이 기본 이미지인지 판별
const isDefaultImage = (imageS3Key) =>
  !imageS3Key || imageS3Key === DEFAULT_IMAGE_KEY;

const normalizeUrl = (url) => {
  const trimmed = url.trim();
  if (trimmed.startsWith('/') || /^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const toDateString = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getDefaultEnd = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

const createInitialFormData = (initialData) => {
  const rawImageS3Key = initialData?.imageS3Key ?? '';
  // 기본 이미지(checker)라면 실제 이미지가 없는 것으로 취급 → 화면에 노출하지 않음
  const hasRealImage = rawImageS3Key && !isDefaultImage(rawImageS3Key);

  return {
    imageUrl: hasRealImage ? (initialData?.imageUrl ?? '') : '',
    imageS3Key: hasRealImage ? rawImageS3Key : '',
    title: initialData?.title ?? '',
    period: {
      start: initialData?.startDate
        ? new Date(initialData.startDate)
        : getDefaultStart(),
      end: initialData?.endDate
        ? new Date(initialData.endDate)
        : getDefaultEnd(),
    },
    url: initialData?.linkUrl ?? '',
  };
};

export default function BannerForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { showModal } = useModal();

  // 최초 진입 시점의 폼 상태를 스냅샷으로 저장 (dirty 체크 기준)
  // createInitialFormData에서 이미 기본 이미지를 ''로 정규화했으므로
  // 이후 dirty 체크에서 별도 분기 없이 동일 기준으로 비교 가능
  const initialFormDataRef = useRef(createInitialFormData(initialData));
  const [formData, setFormData] = useState(() => initialFormDataRef.current);
  const [imageFile, setImageFile] = useState(null);
  const [touched, setTouched] = useState({ title: false, url: false });

  const { imageUrl, title, period, url } = formData;
  const { mutateAsync: uploadImage, isPending: isUploading } = useImageUpload();

  const updateField = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const trimmedUrl = url.trim();
  const isUrlInvalid =
    trimmedUrl !== '' &&
    !trimmedUrl.startsWith('/') &&
    !URL_REGEXP.test(trimmedUrl);

  // 필수 입력 항목: 제목, 기간, URL (이미지는 필수 아님)
  const hasError =
    !title.trim() ||
    !period.start ||
    !period.end ||
    !trimmedUrl ||
    isUrlInvalid;

  const handleImageUpload = (file) => {
    setImageFile(file);
    setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    // 기존에 붙어있던 imageS3Key도 함께 비워야 제출 시 "이미지 없음"으로 판단됨
    setFormData((prev) => ({ ...prev, imageUrl: '', imageS3Key: '' }));
  };

  const handleSubmit = async () => {
    let imageS3Key = DEFAULT_IMAGE_KEY;

    if (imageFile) {
      // 새로 업로드한 이미지가 있는 경우
      imageS3Key = (
        await uploadImage({ file: imageFile, imageType: 'banner_image' })
      ).fileKey;
    } else if (formData.imageS3Key) {
      // 수정 화면에서 기존 실제 이미지를 그대로 유지하는 경우
      imageS3Key = formData.imageS3Key;
    }
    // 둘 다 없으면 (신규 등록 시 이미지 미첨부 / 수정 중 이미지 삭제) 기본 이미지 사용

    onSubmit?.({
      title: title.trim(),
      imageS3Key,
      linkUrl: trimmedUrl ? normalizeUrl(url) : '',
      startDate: toDateString(period.start),
      endDate: toDateString(period.end),
    });
  };

  // 초기 상태와 비교해 실제로 입력/수정된 내용이 있는지 확인
  // imageUrl/imageS3Key는 이미 기본 이미지가 ''로 정규화된 상태이므로
  // 기본 이미지 <-> 빈 값 전환은 dirty로 잡히지 않음
  const isFormDirty = () => {
    const initial = initialFormDataRef.current;

    if (imageFile) return true;
    if (imageUrl !== initial.imageUrl) return true;
    if (title.trim() !== initial.title.trim()) return true;
    if (trimmedUrl !== initial.url.trim()) return true;
    if (toDateString(period.start) !== toDateString(initial.period.start))
      return true;
    if (toDateString(period.end) !== toDateString(initial.period.end))
      return true;

    return false;
  };

  const handleBack = () => {
    if (!isFormDirty()) {
      navigate(ADMIN_ROUTES.DASHBOARD);
      return;
    }

    showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      confirmText: '계속 작성하기',
      cancelText: '나가기',
      onCancel: () => navigate(ADMIN_ROUTES.DASHBOARD),
    });
  };

  const getUrlHelperText = () => {
    if (!touched.url) return '';
    if (!trimmedUrl) return '내용을 입력해주세요.';
    if (isUrlInvalid) return '잘못된 URL 형식입니다.';
    return '';
  };

  return (
    <BannerFormContainer>
      <FillCenterHeader
        onBack={handleBack}
        right={
          <TextButton
            disabled={hasError || isUploading}
            onClick={handleSubmit}
            size="sm"
            variant="primary"
          >
            {isUploading ? '업로드 중...' : isEdit ? '저장' : '등록'}
          </TextButton>
        }
        title="배너"
      />

      <MainImageUploader
        imageUrl={imageUrl}
        onDelete={handleImageDelete}
        onUpload={handleImageUpload}
      />

      <ContentContainer>
        <TextField
          maxLength={50}
          onChange={updateField('title')}
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
          onChange={updateField('url')}
          onBlur={handleBlur('url')}
          placeholder="https:// 또는 /path 형태로 입력해주세요."
          required
          title="URL"
          value={url}
          hasError={touched.url && (!trimmedUrl || isUrlInvalid)}
          helperText={getUrlHelperText()}
        />
      </ContentContainer>
    </BannerFormContainer>
  );
}
