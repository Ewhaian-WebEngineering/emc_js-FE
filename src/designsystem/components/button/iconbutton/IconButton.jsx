import { IconButtonContainer } from '../style';

/**
 * 아이콘 버튼 컴포넌트입니다.
 *
 * @param {'primary'|'secondary'|'transparent'} [variant='primary'] - 버튼 스타일
 * @param {'md'|'sm'} [size='md'] - 버튼 크기
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 * @param {boolean} [disabled=false] - 버튼 비활성화 여부
 * @param {React.ReactNode} children - 버튼 내부에 표시될 내용
 * @returns
 */
export default function IconButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
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
