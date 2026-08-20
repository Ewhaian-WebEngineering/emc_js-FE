import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import Tag from '@/designsystem/components/tag/Tag';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import Editor from '../components/Editor';
import useModal from '@/hooks/modal/useModal';
import {
  EventFormContainer,
  CategoryContainer,
  ContentContainer,
  CategoryTitle,
  TagGroup,
} from './style';
import { ADMIN_ROUTES } from '@/constants/routes';

const EVENT_TYPES = ['사전', '현장', '사후'];
const HOST_TYPES = ['EMC 주최', '협찬사 주최'];

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 등록/수정 완료 시 호출되는 콜백
 */

export default function EventForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const [touched, setTouched] = useState({
    title: false,
  });
  const { showModal } = useModal();

  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [eventType, setEventType] = useState(initialData?.eventType ?? null);
  const [host, setHost] = useState(initialData?.host ?? null);
  const [period, setPeriod] = useState(
    initialData?.period ?? { start: null, end: null },
  );
  const [content, setContent] = useState(initialData?.content ?? '');
  const [notice, setNotice] = useState(initialData?.notice ?? '');

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasError =
    !title.trim() ||
    eventType.length === 0 ||
    !host ||
    !period.start ||
    !period.end ||
    !content.trim();

  const handleSubmit = () => {
    if (hasError) {
      setTouched({ title: true });
      return;
    }

    onSubmit?.({
      imageUrl,
      title,
      eventType,
      host,
      period,
      content,
      notice,
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
    <EventFormContainer>
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
        title="이벤트"
      />
      <MainImageUploader
        imageUrl={imageUrl}
        onDelete={() => setImageUrl('')}
        onUpload={(url) => setImageUrl(url)}
      />
      <ContentContainer>
        <TextField
          maxLength={36}
          onChange={(e) => setTitle(e.target.value)}
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
            {EVENT_TYPES.map((type) => (
              <Tag
                key={type}
                label={type}
                variant="button"
                selected={eventType === type}
                onClick={() => setEventType(type)}
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
            {HOST_TYPES.map((h) => (
              <Tag
                key={h}
                label={h}
                variant="button"
                selected={host === h}
                onClick={() => setHost(h)}
              />
            ))}
          </TagGroup>
        </CategoryContainer>

        <DatePicker
          label="기간 설정"
          required
          value={period}
          onChange={setPeriod}
        />

        <CategoryContainer>
          <CategoryTitle>
            내용
            <span>*</span>
          </CategoryTitle>
          <Editor content={content} onChange={setContent} />
        </CategoryContainer>

        <TextArea
          maxLength={1000}
          onChange={(e) => setNotice(e.target.value)}
          placeholder="이벤트 유의사항을 작성해주세요."
          rows={4}
          title="유의사항"
          value={notice}
        />
      </ContentContainer>
    </EventFormContainer>
  );
}
