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
const PRODUCT_IMAGE_SLOT_COUNT = THUMBNAIL_SLOT_COUNT - 1;

/**
 * 부스 목록 카드 컴포넌트입니다.
 * 부스 목록, 부스 검색 결과, 부스 스크랩 화면에서 사용됩니다.
 *
 * @param {string|number} boothNumber - 부스 번호
 * @param {string} boothName - 부스 이름
 * @param {string} boothDescription - 부스 설명
 * @param {Array<string>} [categories=[]] - 표시할 배지 타입 목록
 * @param {Array<string>} [productImages=[]] - 부스 제품 이미지 URL 목록, 비어있으면 각 자리에 placeholder 표시
 * @param {Array<string>} [marks=[]] - 첫 번째 썸네일 위에 표시할 mark 아이콘 종류 목록
 * @param {boolean} [isBookmarked=false] - 북마크 여부
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 * @param {function} [onBookmarkClick] - 북마크 아이콘 클릭 시 호출되는 함수
 */
export default function BoothListCard({
  boothNumber,
  boothName,
  boothDescription,
  categories = [],
  thumbnailUrl,
  productImages = [],
  isVegan = false,
  isEco = false,
  isBookmarked = false,
  onClick,
  onBookmarkClick,
}) {
  const displayThumbnails = [
    thumbnailUrl ?? null,
    ...Array.from(
      { length: PRODUCT_IMAGE_SLOT_COUNT },
      (_, index) => productImages[index] ?? null,
    ),
  ];
  const marks = [isEco && 'eco', isVegan && 'vegan'].filter(Boolean);
  const formattedBoothNumber = String(boothNumber).padStart(2, '0');

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
              <BoothListCardTitle>{formattedBoothNumber}.</BoothListCardTitle>
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
          {boothDescription && (
            <BoothListCardDescription>
              {boothDescription}
            </BoothListCardDescription>
          )}
        </BoothCardTextWrapper>
        <BoothCardBadges>
          {categories.map((category) => (
            <Badge key={category} size="sm" variant={category} />
          ))}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothListCardContainer>
  );
}
