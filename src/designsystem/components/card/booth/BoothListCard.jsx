import Badge from '../../badge/Badge';
import BookmarkStrokeIcon from '@/assets/svg/24px/ic_scrap_stroke.svg?react';
import BookmarkFillIcon from '@/assets/svg/24px/ic_scrap_fill.svg?react';
import {
  BoothCardBadges,
  BoothCardContent,
  BoothCardMarks,
  BoothCardTextWrapper,
  BoothListCardInfoWrapper,
  BoothListCardTitle,
  BoothListCardTitleWrapper,
  BoothListCardDescription,
  BoothListCardBookmarkIcon,
  BoothListCardThumbnailsWrapper,
  BoothListCardContainer,
  BoothListCardThumbnail,
} from './style';
import CardPlaceholder from '../../Placeholder';
import { MARK_ICON } from '@/constants/marks';

const THUMBNAIL_SLOT_COUNT = 4;

/**
 * 부스 목록 카드 컴포넌트입니다.
 * 부스 목록, 부스 검색 결과, 부스 스크랩 화면에서 사용됩니다.
 *
 * @param {string|number} boothNumber - 부스 번호
 * @param {string} boothName - 부스 이름
 * @param {string} boothDescription - 부스 설명
 * @param {Array<string>} [badges=[]] - 표시할 배지 타입 목록
 * @param {Array<string>} [thumbnails=[]] - 부스 썸네일 이미지 URL 목록, 비어있으면 각 자리에 placeholder 표시
 * @param {Array<string>} [marks=[]] - 첫 번째 썸네일 위에 표시할 mark 아이콘 종류 목록
 * @param {boolean} [isBookmarked=false] - 북마크 여부
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 * @param {function} [onBookmarkClick] - 북마크 아이콘 클릭 시 호출되는 함수
 */
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
  const displayThumbnails = Array.from(
    { length: THUMBNAIL_SLOT_COUNT },
    (_, index) => thumbnails[index] ?? null,
  );

  return (
    <BoothListCardContainer onClick={onClick}>
      <BoothListCardThumbnailsWrapper>
        {displayThumbnails.map((thumbnail, index) => (
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
            <Badge key={badge} size="sm" variant={badge} />
          ))}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothListCardContainer>
  );
}
