import BADGE_MAP from '../../../constants/badges';
import { BadgeWrapper } from './style';

export default function Badge({ size, type }) {
  const { label, color, backgroundColor } = BADGE_MAP[type];

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
