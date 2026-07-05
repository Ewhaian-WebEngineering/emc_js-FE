import { TextFieldInput, TextFieldInputWrapper, TextFieldIcon } from '../style';
import TextInputLayout from '../TextInputLayout';
import { semantic } from '@/designsystem/tokens/semantic';
import SearchIcon from '@/assets/svg/20px/ic_search.svg?react';
import DeleteIcon from '@/assets/svg/20px/ic_circle_close.svg?react';

/**
 * 한 줄 텍스트를 입력하는 TextField 컴포넌트입니다.
 *
 * @param {string} [title] - 입력창 상단 제목
 * @param {boolean} [required] - 제목 옆 필수 표시(*) 여부
 * @param {string} [description] - 제목 아래 설명 텍스트
 * @param {string} [placeholder] - 입력값이 없을 때 표시할 문구
 * @param {string} [value=''] - 입력된 값
 * @param {function} onChange - 입력값이 변경될 때 호출되는 함수
 * @param {function} [onBlur] - 입력창 포커스가 해제될 때 호출되는 함수
 * @param {boolean} [hasError] - 에러 상태 표시 여부
 * @param {string} [helperText] - 하단에 표시할 안내/에러 문구
 * @param {number} [maxLength] - 입력 가능한 최대 글자 수
 * @param {boolean} [disabled] - 비활성화 여부
 */
export default function TextField({
  title,
  required,
  description,
  placeholder,
  value = '',
  onChange,
  onBlur,
  hasError,
  helperText,
  maxLength,
  disabled,
}) {
  return (
    <TextInputLayout
      title={title}
      required={required}
      description={description}
      helperText={helperText}
      hasError={hasError}
      maxLength={maxLength}
      value={value}
    >
      <TextFieldInputWrapper hasError={hasError}>
        <TextFieldInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          disabled={disabled}
        />
        {!disabled && (
          <TextFieldIcon
            type="button"
            onClick={
              value ? () => onChange({ target: { value: '' } }) : undefined
            }
            style={{ cursor: value ? 'pointer' : 'default' }}
          >
            {value ? (
              <DeleteIcon color={semantic.iconNormalAssistive} />
            ) : (
              <SearchIcon />
            )}
          </TextFieldIcon>
        )}
      </TextFieldInputWrapper>
    </TextInputLayout>
  );
}
