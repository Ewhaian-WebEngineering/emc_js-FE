import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  StatRowActionButton,
  StatRowContainer,
  StatRowContent,
  StatRowLabel,
  StatRowLabelWrapper,
  StatRowTooltipButton,
  StatRowTooltipPosition,
  StatRowUnit,
  StatRowValue,
  StatRowValueWrapper,
} from './style';
import InfoMarkIcon from '@/assets/svg/16px/ic_information_mark.svg?react';
import SwapIcon from '@/assets/svg/20px/ic_swap.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatNumber } from '@/utils/formatNumber';
import ToolTip from '../../tooltip/ToolTip';

const TOOLTIP_VISIBLE_DURATION = 2000;

/**
 * 관리 카드 내부에서 아이콘, 라벨, 값을 한 줄로 보여주는 통계 행 컴포넌트입니다.
 *
 * @param {React.ReactNode} icon - 행 좌측에 표시할 아이콘
 * @param {string} label - 통계 항목 라벨
 * @param {string} tooltip - 라벨 옆 툴팁 버튼 클릭 시 노출할 안내 문구
 * @param {number|string} value - 표시할 값, 숫자면 천 단위 구분 및 '명' 단위가 함께 표시됨
 * @param {string} [valueColor=semantic.textNormalStrong] - 값 텍스트 색상
 * @param {function} [onActionClick] - 우측 전환(swap) 버튼 클릭 시 호출되는 함수, 주어지지 않으면 버튼 미표시
 */
export default function ManagementStatRow({
  icon,
  label,
  tooltip,
  value,
  valueColor = semantic.textNormalStrong,
  onActionClick,
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(hideTimeoutRef.current), []);

  const handleTooltipButtonClick = (e) => {
    e.stopPropagation();
    setIsTooltipVisible(true);
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, TOOLTIP_VISIBLE_DURATION);
  };

  return (
    <StatRowContainer>
      <StatRowContent>
        {icon}
        <StatRowLabelWrapper>
          <StatRowLabel>{label}</StatRowLabel>
          <StatRowTooltipButton onClick={handleTooltipButtonClick}>
            <InfoMarkIcon />
            <AnimatePresence>
              {isTooltipVisible && (
                <StatRowTooltipPosition
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ToolTip content={tooltip} />
                </StatRowTooltipPosition>
              )}
            </AnimatePresence>
          </StatRowTooltipButton>
        </StatRowLabelWrapper>
      </StatRowContent>
      <StatRowValueWrapper>
        <StatRowValue color={valueColor}>
          <span>{formatNumber(value)}</span>
          {typeof value === 'number' && <StatRowUnit>명</StatRowUnit>}
        </StatRowValue>
        {onActionClick && (
          <StatRowActionButton onClick={onActionClick}>
            <SwapIcon />
          </StatRowActionButton>
        )}
      </StatRowValueWrapper>
    </StatRowContainer>
  );
}
