import {
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
} from './style';

export default function Header({
  left,
  center,
  right,
  gap = false,
  border = false,
  transparent = false,
}) {
  return (
    <HeaderContainer $gap={gap} $border={border} $transparent={transparent}>
      <HeaderLeft>{left}</HeaderLeft>
      <HeaderCenter>{center}</HeaderCenter>
      <HeaderRight>{right}</HeaderRight>
    </HeaderContainer>
  );
}
