import BADGE_MAP from '@/constants/badges';
import { BadgeLabel, BadgeWrapper } from './style';

/**
 * @typedef {'performance'|'stationery'|'craft'|'fashionBeauty'|'food'|'eco'|'vegan'} BadgeVariant
 */

/**
 * 부스 카테고리를 나타내는 Badge 컴포넌트입니다.
 *
 * @param {'sm'|'md'} [size='sm'] - Badge의 크기
 * @param {BadgeVariant} variant - Badge의 종류
 */
export default function Badge({ size = 'sm', variant }) {
  const { label, color, backgroundColor } = BADGE_MAP[variant];

  return (
    <BadgeWrapper
      $size={size}
      $color={color}
      $backgroundColor={backgroundColor}
    >
      <BadgeLabel>{label}</BadgeLabel>
    </BadgeWrapper>
  );
}
