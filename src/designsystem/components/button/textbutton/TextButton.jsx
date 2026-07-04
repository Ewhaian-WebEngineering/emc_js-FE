import { TextButtonContainer } from '../style';

export default function TextButton({
  variant = 'primary',
  size,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <TextButtonContainer
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </TextButtonContainer>
  );
}
