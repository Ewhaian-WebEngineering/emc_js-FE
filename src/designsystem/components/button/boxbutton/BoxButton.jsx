import { BoxButtonContainer } from '../style';

export default function BoxButton({
  variant = 'primary',
  size,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <BoxButtonContainer
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </BoxButtonContainer>
  );
}
