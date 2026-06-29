import Badge from '../../badge/Badge';
import EcoMark from '../../../../assets/svg/badge/ic_eco_mark_sm.svg?react';
import VeganMark from '../../../../assets/svg/badge/ic_vegan_mark_sm.svg?react';

import CardPlaceholder from '../CardPlaceholder';
import {
  BoothCardBadges,
  BoothCardContent,
  BoothCardMarks,
  BoothCardMore,
  BoothCardName,
  BoothCardNumber,
  BoothCardThumbnail,
  BoothHomeCardContainer,
} from './style';

const MARK_ICON = {
  eco: EcoMark,
  vegan: VeganMark,
};

export default function BoothHomeCard({
  boothNumber,
  boothName,
  badges = [],
  thumbnail,
  marks = [],
  onClick,
}) {
  return (
    <BoothHomeCardContainer onClick={onClick}>
      <BoothCardThumbnail>
        {thumbnail ? (
          <img src={thumbnail} alt={boothName} />
        ) : (
          <CardPlaceholder />
        )}
        <BoothCardMarks>
          {marks.map((mark) => {
            const MarkIcon = MARK_ICON[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothCardMarks>
      </BoothCardThumbnail>
      <BoothCardContent>
        <BoothCardNumber>No. {boothNumber}</BoothCardNumber>
        <BoothCardName>{boothName}</BoothCardName>
        <BoothCardBadges>
          {badges.slice(0, 2).map((badge) => (
            <Badge key={badge} size="sm" type={badge} />
          ))}
          {badges.length > 2 && (
            <BoothCardMore>+{badges.length - 2}</BoothCardMore>
          )}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothHomeCardContainer>
  );
}
