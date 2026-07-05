import Header from './Header';
import { HeaderTitle } from './style';

/**
 * 타이틀과 닫기 버튼으로 구성된 Header입니다.
 *
 * @param {string} title - 타이틀 텍스트
 * @param {React.ReactNode} right - 오른쪽 영역에 표시할 콘텐츠
 */
export default function FillRightHeader({ title, right }) {
  return <Header left={<HeaderTitle>{title}</HeaderTitle>} right={right} />;
}
