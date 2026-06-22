import { LinkButtonContainer } from '../style';

export default function LinkButton({
  type,
  size,
  href,
  target = '_self',
  children,
  onClick,
  ...rest
}) {
  return (
    <LinkButtonContainer
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      $type={type}
      $size={size}
      onClick={onClick}
      {...rest}
    >
      {children}
    </LinkButtonContainer>
  );
}
