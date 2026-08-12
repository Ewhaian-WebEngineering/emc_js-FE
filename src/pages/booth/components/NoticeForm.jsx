import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import { noticeForm } from '../constants/noticeForm';

export default function NoticeForm({ title, content, errors, onChange }) {
  return (
    <>
      <TextField
        title="공지 제목"
        required
        value={title}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder={noticeForm.titlePlaceholder}
        maxLength={noticeForm.titleMaxLength}
        hasError={errors.title}
        helperText={errors.title ? noticeForm.emptyFieldError : ''}
      />
      <TextArea
        title="공지 내용"
        required
        value={content}
        onChange={(e) => onChange('content', e.target.value)}
        placeholder={noticeForm.contentPlaceholder}
        maxLength={noticeForm.contentMaxLength}
        hasError={errors.content}
        helperText={errors.content ? noticeForm.emptyFieldError : ''}
      />
    </>
  );
}
