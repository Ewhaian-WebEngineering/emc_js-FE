import ToolTipTailIcon from '@/assets/svg/tooltip/ic_tail.svg?react';
import { ToolTipContainer, ToolTipTailSection, ToolTipWrapper } from './style';

/**
 * 안내 말풍선을 보여주는 ToolTip 컴포넌트입니다.
 *
 * @param {string} content - 표시할 안내 문구
 */
export default function ToolTip({ content }) {
  return (
    <ToolTipWrapper>
      <ToolTipTailSection>
        <ToolTipTailIcon />
      </ToolTipTailSection>
      <ToolTipContainer>{content}</ToolTipContainer>
    </ToolTipWrapper>
  );
}
