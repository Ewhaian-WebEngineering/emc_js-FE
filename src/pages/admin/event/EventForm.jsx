import { useState } from 'react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import Tag from '@/designsystem/components/tag/Tag';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import Editor from '../components/Editor';
import {
  EventFormContainer,
  CategoryContainer,
  ContentContainer,
  CategoryTitle,
  TagGroup,
} from './style';

const EVENT_TYPES = ['사전', '현장', '사후'];
const HOST_TYPES = ['EMC 주최', '협찬사 주최'];

/**
 * @param {'create' | 'edit'} mode - 등록/수정 모드
 * @param {object} [initialData] - 수정 모드일 때 미리 채울 기존 데이터
 * @param {function} onSubmit - 등록/수정 완료 시 호출되는 콜백
 */

export default function EventForm({ mode = 'create', initialData, onSubmit }) {
  const isEdit = mode === 'edit';

  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [eventType, setEventType] = useState(initialData?.eventType ?? []);
  const [host, setHost] = useState(initialData?.host ?? null);
  const [period, setPeriod] = useState(
    initialData?.period ?? { start: null, end: null },
  );
  const [content, setContent] = useState(initialData?.content ?? '');
  const [notice, setNotice] = useState(initialData?.notice ?? '');

  const toggleEventType = (type) => {
    setEventType((prev) =>
      prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type],
    );
  };

  const isPeriodInvalid =
    period.start && period.end && period.start > period.end;

  const hasError =
    !title.trim() ||
    eventType.length === 0 ||
    !host ||
    !period.start ||
    !period.end ||
    isPeriodInvalid ||
    !content.trim();

  const handleSubmit = () => {
    if (hasError) return;

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

  return (
    <EventFormContainer>
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
          placeholder="이벤트 제목을 작성해주세요."
          required
          title="제목"
          value={title}
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
                selected={eventType.includes(type)}
                onClick={() => toggleEventType(type)}
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
