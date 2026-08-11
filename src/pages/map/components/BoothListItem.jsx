import { BoothListItemWrapper, BoothNumber, BoothName } from '../style';

export default function BoothListItem({ boothNumber, boothName, onClick }) {
  return (
    <BoothListItemWrapper onClick={onClick}>
      <BoothNumber>{boothNumber.toString().padStart(2, '0')}</BoothNumber>
      <BoothName>{boothName}</BoothName>
    </BoothListItemWrapper>
  );
}
