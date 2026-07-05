import { EmptyStateContainer, EmptyStateTextSm } from './style';

/**
 * 데이터가 없을 때 보여주는 EmptyState(Small) 컴포넌트입니다.
 *
 * @param {string} title - 표시할 텍스트
 */
export default function EmptyStateSm({ title }) {
  return (
    <EmptyStateContainer>
      <EmptyStateTextSm>{title}</EmptyStateTextSm>
    </EmptyStateContainer>
  );
}
