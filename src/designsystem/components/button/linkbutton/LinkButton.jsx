import { LinkButtonContainer } from '../style';

export default function LinkButton({
  type,
  size,
  href,
  children,
  onClick,
  ...rest
}) {
  return (
    <LinkButtonContainer
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      $type={type}
      $size={size}
      onClick={onClick}
      {...rest}
    >
      {children}
    </LinkButtonContainer>
  );
}
