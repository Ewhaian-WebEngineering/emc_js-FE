import { MARK_ICON } from '@/constants/marks';
import Badge from '../../badge/Badge';
import CardPlaceholder from '../../Placeholder';
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
import Image from '../../Image';

/**
 * 부스 상세 카드 컴포넌트입니다.
 * 부스 상세 > 부스 추천 섹션에서 사용됩니다.
 *
 * @param {string|number} boothNumber - 부스 번호
 * @param {string} boothName - 부스 이름
 * @param {Array<string>} [badges=[]] - 표시할 배지 타입 목록
 * @param {string} [thumbnail] - 부스 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {Array<string>} [marks=[]] - 썸네일 위에 표시할 mark 아이콘 종류 목록
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
export default function BoothDetailCard({
  boothNumber,
  boothName,
  isEco = false,
  isVegan = false,
  categories = [],
  thumbnail,
  onClick,
}) {
  const marks = [isEco && 'eco', isVegan && 'vegan'].filter(Boolean);

  return (
    <BoothDetailCardContainer onClick={onClick}>
      <BoothCardThumbnailMd>
        {thumbnail ? (
          <Image src={thumbnail} alt={boothName} />
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
          {categories.slice(0, 1).map((category) => (
            <Badge key={category} size="sm" variant={category} />
          ))}
          {categories.length > 1 && (
            <BoothCardMore>+{categories.length - 1}</BoothCardMore>
          )}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothDetailCardContainer>
  );
}
