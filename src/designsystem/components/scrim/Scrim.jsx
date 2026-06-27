import { ScrimContainer } from './style';

export default function Scrim({ children, onClick }) {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) onClick?.();
  };

  return <ScrimContainer onClick={handleClick}>{children}</ScrimContainer>;
}
