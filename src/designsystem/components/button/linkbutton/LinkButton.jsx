import { LinkButtonContainer, LinkButtonLabel } from '../style';

/**
 * 링크 버튼 컴포넌트입니다.
 *
 * @param {'primary'|'secondary'} [variant='primary'] - 버튼 스타일
 * @param {'lg'|'md'|'sm'} [size='md'] - 버튼 크기
 * @param {string} href - 링크 URL
 * @param {'_self'|'_blank'} [target='_self'] - 링크 열기 방식
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 * @param {React.ReactNode} children - 버튼 내부에 표시될 내용
 */
export default function LinkButton({
  variant = 'primary',
  size = 'md',
  href,
  target = '_self',
  onClick,
  children,
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
      <LinkButtonLabel>{children}</LinkButtonLabel>
    </LinkButtonContainer>
  );
}
