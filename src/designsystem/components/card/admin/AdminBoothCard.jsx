import AdminCardActions from './AdminCardActions';
import {
  AdminBoothCardNumber,
  AdminBoothCardTextWrapper,
  AdminCardBottomContent,
  AdminCardColumnContainer,
  AdminCardContentOneLine,
  AdminCardTitle,
} from './style';

export default function AdminBoothCard({
  cardNumber,
  title,
  content,
  selected,
  onClick,
  onPreview,
  onEdit,
}) {
  const formattedNumber = String(cardNumber).padStart(2, '0');

  return (
    <AdminCardColumnContainer onClick={onClick} selected={selected}>
      <AdminBoothCardTextWrapper>
        <AdminBoothCardNumber>{formattedNumber}</AdminBoothCardNumber>
        <AdminCardTitle>{title}</AdminCardTitle>
      </AdminBoothCardTextWrapper>
      <AdminCardContentOneLine>{content}</AdminCardContentOneLine>
      <AdminCardBottomContent>
        <AdminCardActions onPreview={onPreview} onEdit={onEdit} />
      </AdminCardBottomContent>
    </AdminCardColumnContainer>
  );
}
