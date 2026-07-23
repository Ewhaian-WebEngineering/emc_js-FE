import Header from './Header';
import { HeaderTitle } from './style';
import ArrowLeftIcon from '@/assets/svg/28px/ic_arrow_left.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';

/**
 * 뒤로가기와 타이틀을 기본으로 하고, 오른쪽 버튼 영역은 외부에서 주입받는 Header입니다.
 *
 * @param {function} [onBack] - 뒤로가기 버튼 클릭 이벤트 핸들러, 생략하면 뒤로가기 버튼을 표시하지 않음
 * @param {string} title - 타이틀 텍스트
 * @param {React.ReactNode} [right] - 오른쪽 영역에 표시할 콘텐츠, 생략하면 비워둠
 */
export default function FillCenterHeader({
  onBack,
  title,
  right,
  border = false,
}) {
  return (
    <Header
      left={
        onBack && (
          <ArrowLeftIcon onClick={onBack} color={semantic.iconNormalNormal} />
        )
      }
      center={<HeaderTitle>{title}</HeaderTitle>}
      right={right}
      border={border}
    />
  );
}
