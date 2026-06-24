import BoxButton from '../button/boxbutton/BoxButton';
import { EmptyStateContainer, EmptyStateText } from './style';

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
        <BoxButton type="primary" size="sm" onClick={onButtonClick}>
          {buttonText}
        </BoxButton>
      )}
    </EmptyStateContainer>
  );
}
