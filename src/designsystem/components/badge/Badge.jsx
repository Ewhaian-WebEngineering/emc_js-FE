import BADGE_MAP from '../../../constants/badges';
import { BadgeWrapper } from './style';

/**
 * 부스 카테고리를 나타내는 Badge 컴포넌트입니다.
 *
 * @param {text} size - Badge의 크기 (sm, md) (기본값 sm)
 * @param {text} variant - Badge의 종류 (performance, stationery, craft, fashionBeauty, food, eco, vegan)
 */
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
