import { BoxButtonContainer } from '../style';

export default function BoxButton({
  type,
  size,
  label,
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
      {label}
    </BoxButtonContainer>
  );
}
