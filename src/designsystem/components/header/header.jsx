import {
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
} from './style';

export default function Header({ left, center, right }) {
  return (
    <HeaderContainer>
      <HeaderLeft>{left}</HeaderLeft>
      <HeaderCenter>{center}</HeaderCenter>
      <HeaderRight>{right}</HeaderRight>
    </HeaderContainer>
  );
}
