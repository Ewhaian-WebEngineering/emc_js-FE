import TextField from '@/designsystem/components/textinput/textfield/TextField';
import TextArea from '@/designsystem/components/textinput/textarea/TextArea';
import { noticeForm } from '../constants/noticeForm';

/**
 * 공지사항 등록/수정 화면에서 공통으로 사용하는 폼 컴포넌트입니다.
 *
 * @param {string} title - 공지 제목
 * @param {string} content - 공지 내용
 * @param {{ title: boolean, content: boolean }} errors - 필드별 에러 여부
 * @param {function} onChange - 필드 값이 변경될 때 호출되는 함수 (field, value)
 */
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
