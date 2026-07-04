import {
  StatRowActionButton,
  StatRowContainer,
  StatRowContent,
  StatRowLabel,
  StatRowLabelWrapper,
  StatRowTooltipButton,
  StatRowUnit,
  StatRowValue,
  StatRowValueWrapper,
} from './style';
import InfoMarkIcon from '../../../../assets/svg/16px/ic_information_mark.svg?react';
import SwapIcon from '../../../../assets/svg/20px/ic_swap.svg?react';
import { semantic } from '../../../tokens/semantic';
import { formatNumber } from '../../../../utils/formatNumber';

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
  return (
    <StatRowContainer>
      <StatRowContent>
        {icon}
        <StatRowLabelWrapper>
          <StatRowLabel>{label}</StatRowLabel>
          <StatRowTooltipButton
            onClick={(e) => {
              e.stopPropagation();
              {
                /* Tooltip content */
              }
              alert(tooltip);
            }}
          >
            <InfoMarkIcon />
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
