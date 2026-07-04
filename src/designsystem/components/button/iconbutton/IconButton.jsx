import { IconButtonContainer } from '../style';

export default function IconButton({
  variant = 'primary',
  size,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <IconButtonContainer
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </IconButtonContainer>
  );
}
