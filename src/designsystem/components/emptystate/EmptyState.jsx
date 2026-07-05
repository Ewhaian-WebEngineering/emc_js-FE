import BoxButton from '../button/boxbutton/BoxButton';
import { EmptyStateContainer, EmptyStateText } from './style';

/**
 * 데이터가 없을 때 보여주는 EmptyState 컴포넌트입니다.
 *
 * @param {React.ComponentType} [Icon] - 상단에 표시할 아이콘 컴포넌트
 * @param {string} [title] - 제목 텍스트
 * @param {string} [description] - 설명 텍스트
 * @param {string} [buttonText] - 버튼에 표시할 텍스트
 * @param {function} [onButtonClick] - 버튼 클릭 시 호출되는 함수
 */
export default function EmptyState({
  Icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <EmptyStateContainer>
      {Icon && <Icon />}
      <EmptyStateText>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </EmptyStateText>
      {buttonText && (
        <BoxButton variant="primary" size="sm" onClick={onButtonClick}>
          {buttonText}
        </BoxButton>
      )}
    </EmptyStateContainer>
  );
}
