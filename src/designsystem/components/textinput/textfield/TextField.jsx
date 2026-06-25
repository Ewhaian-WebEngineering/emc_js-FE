import {
  TextFieldContainer,
  TextFieldDescription,
  TextFieldHeadLine,
  TextFieldLabel,
  TextFieldRequired,
  TextFieldInput,
  TextFieldBottomLine,
  TextFieldHelperText,
  TextFieldMaxLength,
  TextFieldInputWrapper,
  TextFieldIcon,
} from '../style';
import { semantic } from '../../../tokens/semantic';
import SearchIcon from '../../../../assets/svg/20px/ic_search.svg?react';
import DeleteIcon from '../../../../assets/svg/20px/ic_circle_close.svg?react';

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
    <TextFieldContainer>
      <TextFieldHeadLine>
        <TextFieldLabel>
          {title} {required && <TextFieldRequired>*</TextFieldRequired>}
        </TextFieldLabel>
        <TextFieldDescription>{description}</TextFieldDescription>
      </TextFieldHeadLine>
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
      <TextFieldBottomLine>
        <TextFieldHelperText hasError={hasError}>
          {helperText}
        </TextFieldHelperText>
        <TextFieldMaxLength>
          {value.length}/{maxLength}
        </TextFieldMaxLength>
      </TextFieldBottomLine>
    </TextFieldContainer>
  );
}
