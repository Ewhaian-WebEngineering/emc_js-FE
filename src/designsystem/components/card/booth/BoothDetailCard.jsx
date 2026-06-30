import { MARK_ICON } from '../../../../constants/marks';
import Badge from '../../badge/Badge';
import CardPlaceholder from '../CardPlaceholder';
import {
  BoothCardBadges,
  BoothCardContent,
  BoothCardMarks,
  BoothCardMore,
  BoothCardName,
  BoothCardNumber,
  BoothCardTextWrapper,
  BoothCardThumbnailMd,
  BoothDetailCardContainer,
} from './style';

export default function BoothDetailCard({
  boothNumber,
  boothName,
  badges = [],
  thumbnail,
  marks = [],
  onClick,
}) {
  return (
    <BoothDetailCardContainer onClick={onClick}>
      <BoothCardThumbnailMd>
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
      </BoothCardThumbnailMd>
      <BoothCardContent>
        <BoothCardTextWrapper>
          <BoothCardNumber>No. {boothNumber}</BoothCardNumber>
          <BoothCardName>{boothName}</BoothCardName>
        </BoothCardTextWrapper>
        <BoothCardBadges>
          {badges.slice(0, 1).map((badge) => (
            <Badge key={badge} size="sm" type={badge} />
          ))}
          {badges.length > 1 && (
            <BoothCardMore>+{badges.length - 1}</BoothCardMore>
          )}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothDetailCardContainer>
  );
}
