import { TextButtonContainer } from '../style';

export default function TextButton({
  type,
  size,
  label,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <TextButtonContainer
      $type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {label}
    </TextButtonContainer>
  );
}
