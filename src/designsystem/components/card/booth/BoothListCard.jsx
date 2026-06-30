import Badge from '../../badge/Badge';
import BookmarkStrokeIcon from '../../../../assets/svg/24px/ic_scrap_stroke.svg?react';
import BookmarkFillIcon from '../../../../assets/svg/24px/ic_scrap_fill.svg?react';
import {
  BoothCardBadges,
  BoothCardContent,
  BoothCardMarks,
  BoothCardTextWrapper,
  BoothCardThumbnailMd,
  BoothListCardInfoWrapper,
  BoothListCardTitle,
  BoothListCardTitleWrapper,
  BoothListCardDescription,
  BoothListCardBookmarkIcon,
  BoothListCardThumbnailsWrapper,
  BoothListCardContainer,
  BoothListCardThumbnail,
} from './style';
import CardPlaceholder from '../CardPlaceholder';
import { MARK_ICON } from '../../../../constants/marks';

export default function BoothListCard({
  boothNumber,
  boothName,
  boothDescription,
  badges = [],
  thumbnails = [],
  marks = [],
  isBookmarked = false,
  onClick,
  onBookmarkClick,
}) {
  return (
    <BoothListCardContainer onClick={onClick}>
      <BoothListCardThumbnailsWrapper>
        {thumbnails.map((thumbnail, index) => (
          <BoothListCardThumbnail key={index}>
            {thumbnail ? (
              <img src={thumbnail} alt={boothName} />
            ) : (
              <CardPlaceholder />
            )}
            {index === 0 && (
              <BoothCardMarks>
                {marks.map((mark) => {
                  const MarkIcon = MARK_ICON[mark];
                  return <MarkIcon key={mark} />;
                })}
              </BoothCardMarks>
            )}
          </BoothListCardThumbnail>
        ))}
      </BoothListCardThumbnailsWrapper>
      <BoothCardContent>
        <BoothCardTextWrapper>
          <BoothListCardInfoWrapper>
            <BoothListCardTitleWrapper>
              <BoothListCardTitle>{boothNumber}.</BoothListCardTitle>
              <BoothListCardTitle>{boothName}</BoothListCardTitle>
            </BoothListCardTitleWrapper>
            <BoothListCardBookmarkIcon
              isBookmarked={isBookmarked}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick?.();
              }}
            >
              {isBookmarked ? <BookmarkFillIcon /> : <BookmarkStrokeIcon />}
            </BoothListCardBookmarkIcon>
          </BoothListCardInfoWrapper>
          <BoothListCardDescription>
            {boothDescription}
          </BoothListCardDescription>
        </BoothCardTextWrapper>
        <BoothCardBadges>
          {badges.map((badge) => (
            <Badge key={badge} size="sm" type={badge} />
          ))}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothListCardContainer>
  );
}
