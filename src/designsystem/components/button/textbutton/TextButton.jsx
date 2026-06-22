import { TextButtonContainer } from '../style';

export default function TextButton({
  type,
  size,
  children,
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
      {children}
    </TextButtonContainer>
  );
}
