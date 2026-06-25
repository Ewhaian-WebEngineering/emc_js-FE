import { TextAreaInput, TextAreaWrapper } from '../style';
import TextInputLayout from '../TextInputLayout';

export default function TextArea({
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
  rows,
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
      <TextAreaWrapper hasError={hasError}>
        <TextAreaInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          disabled={disabled}
          hasError={hasError}
          rows={rows}
        />
      </TextAreaWrapper>
    </TextInputLayout>
  );
}
