import { ScrimContainer } from './style';

/**
 * 배경을 어둡게 덮어 콘텐츠를 강조하는 Scrim 컴포넌트입니다.
 * 배경 영역(바깥쪽)을 클릭하면 onClick이 호출됩니다.
 *
 * @param {React.ReactNode} children - Scrim 위에 표시할 콘텐츠
 * @param {function} [onClick] - 배경 클릭 시 호출되는 함수
 * @param {boolean} [visible=true] - Scrim의 가시성
 */
export default function Scrim({ children, onClick, visible = true }) {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) onClick?.();
  };

  return (
    <ScrimContainer onClick={handleClick} visible={visible}>
      {children}
    </ScrimContainer>
  );
}
