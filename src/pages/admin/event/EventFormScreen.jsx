import { useState } from 'react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import MainImageUploader from '@/designsystem/components/fileuploader/MainImageUploader';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import Tag from '@/designsystem/components/tag/Tag';
import DatePicker from '@/designsystem/components/datepicker/DatePicker';
import {
  EventFormContainer,
  CategoryContainer,
  ContentContainer,
  CategoryTitle,
  TagGroup,
} from './style';

const EVENT_TYPES = ['사전', '현장', '사후'];
const HOST_TYPES = ['EMC 주최', '협찬사 주최'];

export default function EventFormScreen() {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState([]); // 다중 선택
  const [host, setHost] = useState(null); // 단일 선택
  const [content, setContent] = useState('');
  const [notice, setNotice] = useState('');

  const toggleEventType = (type) => {
    setEventType((prev) =>
      prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type],
    );
  };
  return (
    <EventFormContainer>
      <FillCenterHeader
        onBack={() => {}}
        right={
          <TextButton onClick={() => {}} size="sm" variant="primary">
            등록
          </TextButton>
        }
        title="이벤트"
      />
      <MainImageUploader imageUrl="" onDelete={() => {}} onUpload={() => {}} />
      <ContentContainer>
        <TextField
          maxLength={36}
          onChange={() => {}}
          placeholder="이벤트 제목을 작성해주세요."
          required
          title="제목"
          value=""
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
        <DatePicker label="기간 설정" required />
        <CategoryContainer>
          <CategoryTitle>
            내용
            <span>*</span>
          </CategoryTitle>
        </CategoryContainer>
        <TextArea
          maxLength={1000} //이거 없앨 수 있나요??
          onChange={() => {}}
          placeholder="이벤트 유의사항을 작성해주세요."
          rows={4}
          title="유의사항"
          value=""
        />
      </ContentContainer>
    </EventFormContainer>
  );
}
