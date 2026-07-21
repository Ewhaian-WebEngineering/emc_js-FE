import ArrowRightIcon from '@/assets/svg/16px/ic_arrow_right.svg?react';
import { ViewAllButtonWrapper } from '../style';
import { semantic } from '@/designsystem/tokens/semantic';

export default function ViewAllButton({ onClick }) {
  return (
    <ViewAllButtonWrapper onClick={onClick}>
      <p>전체보기</p>
      <ArrowRightIcon color={semantic.iconNormalNormal} />
    </ViewAllButtonWrapper>
  );
}
