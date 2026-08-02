import {
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
} from './style';

/**
 * 좌/중앙/우 영역으로 구성된 Header 컴포넌트입니다.
 *
 * @param {React.ReactNode} [left] - 왼쪽 영역에 표시할 콘텐츠
 * @param {React.ReactNode} [center] - 가운데 영역에 표시할 콘텐츠
 * @param {React.ReactNode} [right] - 오른쪽 영역에 표시할 콘텐츠
 * @param {boolean} [gap=false] - 영역 사이 간격 적용 여부
 * @param {boolean} [border=false] - 하단 보더 표시 여부
 * @param {boolean} [transparent=false] - 배경 투명 처리 여부
 */
export default function Header({
  left,
  center,
  right,
  gap = false,
  border = false,
  transparent = false,
  overlay = false,
  ...rest
}) {
  return (
    <HeaderContainer
      $gap={gap}
      $border={border}
      $transparent={transparent}
      $overlay={overlay}
      {...rest}
    >
      <HeaderLeft $gap={gap}>{left}</HeaderLeft>
      <HeaderCenter $gap={gap}>{center}</HeaderCenter>
      <HeaderRight $gap={gap}>{right}</HeaderRight>
    </HeaderContainer>
  );
}
