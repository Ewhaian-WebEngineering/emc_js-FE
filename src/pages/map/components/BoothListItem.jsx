import { forwardRef } from 'react';
import { BoothListItemWrapper, BoothNumber, BoothName } from '../style';

const BoothListItem = forwardRef(
  ({ boothNumber, boothName, onClick, focused }, ref) => (
    <BoothListItemWrapper ref={ref} onClick={onClick}>
      <BoothNumber>{boothNumber.toString().padStart(2, '0')}</BoothNumber>
      <BoothName data-focused={focused}>{boothName}</BoothName>
    </BoothListItemWrapper>
  ),
);

BoothListItem.displayName = 'BoothListItem';

export default BoothListItem;
