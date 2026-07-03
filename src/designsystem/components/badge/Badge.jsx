import BADGE_MAP from '../../../constants/badges';
import { BadgeWrapper } from './style';

export default function Badge({ size = 'sm', variant }) {
  const { label, color, backgroundColor } = BADGE_MAP[variant];

  return (
    <BadgeWrapper
      $size={size}
      $color={color}
      $backgroundColor={backgroundColor}
    >
      {label}
    </BadgeWrapper>
  );
}
