import { BoxButtonContainer } from '../style';

export default function BoxButton({
  type,
  size,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <BoxButtonContainer
      $type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </BoxButtonContainer>
  );
}
