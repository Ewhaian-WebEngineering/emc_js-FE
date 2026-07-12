import {
  TextFieldIcon,
  TextFieldIconGroup,
  TextFieldInput,
  TextFieldInputWrapper,
} from './style';
import DeleteIcon from '@/assets/svg/20px/ic_circle_close.svg?react';
import VisibleIcon from '@/assets/svg/20px/ic_visible.svg?react';
import VisibilityOffIcon from '@/assets/svg/20px/ic_visibility_off.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { useState } from 'react';

/**
 * 기본 입력창 컴포넌트입니다.
 *
 * @param {boolean} [isPassword=false] - true이면 비밀번호 보이기/가리기 토글 아이콘을 표시합니다.
 * @param {string} [placeholder] - 입력값이 없을 때 표시할 문구
 * @param {string} value - 입력된 값
 * @param {function} onChange - 입력값이 변경될 때 호출되는 함수
 * @param {function} [onBlur] - 입력창 포커스가 해제될 때 호출되는 함수
 * @param {number} [maxLength] - 입력 가능한 최대 글자 수
 * @param {boolean} [disabled] - 비활성화 여부. true이면 아이콘 그룹이 표시되지 않습니다.
 * @param {boolean} [hasError] - 에러 상태 표시 여부
 */
export default function TextInput({
  isPassword = false,
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength,
  disabled,
  hasError,
}) {
  const [isMasked, setIsMasked] = useState(false);

  return (
    <TextFieldInputWrapper hasError={hasError}>
      <TextFieldInput
        type={isPassword && isMasked ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        disabled={disabled}
      />
      {!disabled && (
        <TextFieldIconGroup>
          {isPassword && (
            <TextFieldIcon
              type="button"
              onClick={() => setIsMasked((prev) => !prev)}
              aria-label={isMasked ? '입력값 보이기' : '입력값 가리기'}
            >
              {isMasked ? (
                <VisibleIcon color={semantic.iconNormalNormal} />
              ) : (
                <VisibilityOffIcon color={semantic.iconNormalNormal} />
              )}
            </TextFieldIcon>
          )}
          {value && (
            <TextFieldIcon
              type="button"
              onClick={
                value ? () => onChange({ target: { value: '' } }) : undefined
              }
              style={{ cursor: value ? 'pointer' : 'default' }}
            >
              <DeleteIcon color={semantic.iconNormalAssistive} />
            </TextFieldIcon>
          )}
        </TextFieldIconGroup>
      )}
    </TextFieldInputWrapper>
  );
}
