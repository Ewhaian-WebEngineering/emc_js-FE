import { CardPlaceholderWrapper } from './style';
import PlaceholderLogo from '../../../assets/svg/logo/ic_logo_cart_blue.svg?react';

export default function CardPlaceholder({ size = '50%' }) {
  return (
    <CardPlaceholderWrapper size={size}>
      <PlaceholderLogo />
    </CardPlaceholderWrapper>
  );
}
