import { semantic } from '@/designsystem/tokens/semantic';
import { SpinnerCircle } from './style';

/**
 * 로딩 상태를 나타내는 원형 스피너입니다.
 *
 * @param {'sm'|'md'|'lg'} [size='md'] - 스피너 크기
 * @param {string} [color] - 회전하는 부분의 색상. 기본값은 primary 색상
 */
export default function Spinner() {
  return (
    <SpinnerCircle
      viewBox="0 0 50 50"
      width={48}
      height={48}
      role="status"
      aria-label="로딩 중"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={semantic.iconPrimaryNormal}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="94 32"
      />
    </SpinnerCircle>
  );
}
