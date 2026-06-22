import { IconButtonContainer } from '../style';

export default function IconButton({
  type,
  size,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <IconButtonContainer
      $type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </IconButtonContainer>
  );
}
