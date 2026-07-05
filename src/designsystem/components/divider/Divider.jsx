import { DividerLine } from './style';

/**
 * 구분선을 보여주는 Divider 컴포넌트입니다.
 *
 * @param {'sm'|'lg'} [size='sm'] - 구분선의 두께
 */
export default function Divider({ size = 'sm' }) {
  return <DividerLine $size={size} />;
}
