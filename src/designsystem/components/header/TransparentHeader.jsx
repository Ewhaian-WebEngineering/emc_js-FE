import Header from './Header';
import { HeaderTitle } from './style';
import ArrowLeftIcon from '@/assets/svg/28px/ic_arrow_left.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';

/**
 * 이미지나 그라데이션 배경 위에 겹쳐 쓰는 투명 배경 Header입니다.
 *
 * @param {function} [onBack] - 뒤로가기 버튼 클릭 이벤트 핸들러, 생략하면 뒤로가기 버튼을 표시하지 않음
 * @param {string} title - 타이틀 텍스트
 * @param {React.ReactNode} [right] - 오른쪽 영역에 표시할 콘텐츠, 생략하면 비워둠
 */
export default function TransparentHeader({ onBack, title, right }) {
  return (
    <Header
      left={
        onBack && (
          <ArrowLeftIcon
            onClick={onBack}
            color={semantic.iconNormalInverse}
            style={{ cursor: 'pointer' }}
          />
        )
      }
      center={<HeaderTitle $inverse>{title}</HeaderTitle>}
      right={right}
      transparent
      overlay
    />
  );
}
