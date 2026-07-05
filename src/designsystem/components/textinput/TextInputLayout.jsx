import {
  TextInputBottomLine,
  TextInputContainer,
  TextInputDescription,
  TextInputHeadLine,
  TextInputHelperText,
  TextInputLabel,
  TextInputMaxLength,
  TextInputRequired,
} from './style';

/**
 * TextField, TextArea 등에서 공통으로 사용하는 입력창 레이아웃 컴포넌트입니다.
 *
 * @param {string} [title] - 입력창 상단 제목
 * @param {boolean} [required] - 제목 옆 필수 표시(*) 여부
 * @param {string} [description] - 제목 아래 설명 텍스트
 * @param {string} [helperText] - 하단에 표시할 안내/에러 문구
 * @param {boolean} [hasError] - 에러 상태 표시 여부
 * @param {number} [maxLength] - 입력 가능한 최대 글자 수
 * @param {string} value - 입력된 값 (글자 수 표시에 사용)
 * @param {React.ReactNode} children - 실제 입력 요소(TextField, TextArea 등)
 */
export default function TextInputLayout({
  title,
  required,
  description,
  helperText,
  hasError,
  maxLength,
  value,
  children,
}) {
  return (
    <TextInputContainer>
      <TextInputHeadLine>
        <TextInputLabel>
          {title} {required && <TextInputRequired>*</TextInputRequired>}
        </TextInputLabel>
        <TextInputDescription>{description}</TextInputDescription>
      </TextInputHeadLine>

      {children}

      <TextInputBottomLine>
        <TextInputHelperText hasError={hasError}>
          {helperText}
        </TextInputHelperText>
        <TextInputMaxLength>
          {value.length}/{maxLength}
        </TextInputMaxLength>
      </TextInputBottomLine>
    </TextInputContainer>
  );
}
