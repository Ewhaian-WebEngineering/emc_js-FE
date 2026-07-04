import { BoxButtonContainer } from '../style';

/**
 * 박스 형태의 버튼 컴포넌트입니다.
 *
 * @param {'primary'|'secondary'|'error'} [variant='primary'] - 버튼 스타일
 * @param {'lg'|'md'|'sm'} [size='md'] - 버튼 크기
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 * @param {boolean} [disabled=false] - 버튼 비활성화 여부
 * @param {React.ReactNode} children - 버튼 내부에 표시될 내용
 * @returns
 */
export default function BoxButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
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
