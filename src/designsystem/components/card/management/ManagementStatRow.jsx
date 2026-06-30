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
