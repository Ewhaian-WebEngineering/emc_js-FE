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
