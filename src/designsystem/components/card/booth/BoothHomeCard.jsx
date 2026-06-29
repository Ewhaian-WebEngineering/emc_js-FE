import Badge from '../../badge/Badge';
import EcoMark from '../../../../assets/svg/badge/ic_eco_mark_sm.svg?react';
import VeganMark from '../../../../assets/svg/badge/ic_vegan_mark_sm.svg?react';
import {
  BoothHomeCardContainer,
  BoothHomeCardContent,
  BoothHomeCardMarks,
  BoothHomeCardThumbnail,
  BoothHomeCardNumber,
  BoothHomeCardName,
  BoothHomeCardBadges,
  BoothHomeCardMore,
} from '../style';
import CardPlaceholder from '../CardPlaceholder';

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
      <BoothHomeCardThumbnail>
        {thumbnail ? (
          <img src={thumbnail} alt={boothName} />
        ) : (
          <CardPlaceholder />
        )}
        <BoothHomeCardMarks>
          {marks.map((mark) => {
            const MarkIcon = MARK_ICON[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothHomeCardMarks>
      </BoothHomeCardThumbnail>
      <BoothHomeCardContent>
        <BoothHomeCardNumber>No. {boothNumber}</BoothHomeCardNumber>
        <BoothHomeCardName>{boothName}</BoothHomeCardName>
        <BoothHomeCardBadges>
          {badges.slice(0, 2).map((badge) => (
            <Badge key={badge} size="sm" type={badge} />
          ))}
          {badges.length > 2 && (
            <BoothHomeCardMore>+{badges.length - 2}</BoothHomeCardMore>
          )}
        </BoothHomeCardBadges>
      </BoothHomeCardContent>
    </BoothHomeCardContainer>
  );
}
