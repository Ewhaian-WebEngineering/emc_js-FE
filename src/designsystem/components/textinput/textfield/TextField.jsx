import { TextFieldInput, TextFieldInputWrapper, TextFieldIcon } from '../style';
import TextInputLayout from '../TextInputLayout';
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
