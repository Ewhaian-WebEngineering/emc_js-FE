import { LinkButtonContainer } from '../style';

export default function LinkButton({
  variant,
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
      $variant={variant}
      $size={size}
      onClick={onClick}
      {...rest}
    >
      {children}
    </LinkButtonContainer>
  );
}
