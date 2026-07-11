import { useState } from 'react';
import {
  TextFieldInput,
  TextFieldInputWrapper,
  CodeInputWrapper,
  CodeInputIconGroup,
  CodeInputIconButton,
} from '../style';
import TextInputLayout from '../TextInputLayout';
import { semantic } from '../../../tokens/semantic';
import VisibleIcon from '../../../../assets/svg/20px/ic_visible.svg?react';
import InvisibleIcon from '../../../../assets/svg/20px/ic_visibility_off.svg?react';
import DeleteIcon from '../../../../assets/svg/20px/ic_circle_close.svg?react';

export default function CodeInput({
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <CodeInputWrapper>
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
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={maxLength}
            disabled={disabled}
          />
          {!disabled && (
            <CodeInputIconGroup>
              <CodeInputIconButton
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                style={{ cursor: 'pointer' }}
              >
                {isVisible ? (
                  <InvisibleIcon color={semantic.iconNormalAssistive} />
                ) : (
                  <VisibleIcon color={semantic.iconNormalAssistive} />
                )}
              </CodeInputIconButton>

              {value && (
                <CodeInputIconButton
                  type="button"
                  onClick={() => onChange({ target: { value: '' } })}
                  style={{ cursor: 'pointer' }}
                >
                  <DeleteIcon color={semantic.iconNormalAssistive} />
                </CodeInputIconButton>
              )}
            </CodeInputIconGroup>
          )}
        </TextFieldInputWrapper>
      </TextInputLayout>
    </CodeInputWrapper>
  );
}
