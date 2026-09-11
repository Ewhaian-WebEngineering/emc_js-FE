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
  BoothCardThumbnailSm,
  BoothHomeCardContainer,
} from './style';
import Image from '../../Image';

/**
 * 홈화면 부스 카드 컴포넌트입니다.
 * 홈 > 실시간 인기 부스 섹션에서 사용됩니다.
 *
 * @param {string|number} boothNumber - 부스 번호
 * @param {string} boothName - 부스 이름
 * @param {Array<string>} [categories=[]] - 표시할 카테고리 목록
 * @param {string} [thumbnail] - 부스 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {Array<string>} [marks=[]] - 썸네일 위에 표시할 mark 아이콘 종류 목록
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
export default function BoothHomeCard({
  boothNumber,
  boothName,
  categories = [],
  thumbnailUrl,
  isVegan = false,
  isEco = false,
  onClick,
}) {
  const marks = [isEco && 'eco', isVegan && 'vegan'].filter(Boolean);

  return (
    <BoothHomeCardContainer onClick={onClick}>
      <BoothCardThumbnailSm>
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={boothName} />
        ) : (
          <CardPlaceholder />
        )}
        <BoothCardMarks>
          {marks.map((mark) => {
            const MarkIcon = MARK_ICON[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothCardMarks>
      </BoothCardThumbnailSm>
      <BoothCardContent>
        <BoothCardTextWrapper>
          <BoothCardNumber>No. {boothNumber}</BoothCardNumber>
          <BoothCardName>{boothName}</BoothCardName>
        </BoothCardTextWrapper>
        <BoothCardBadges>
          {categories.slice(0, 2).map((category) => (
            <Badge key={category} size="sm" variant={category} />
          ))}
          {categories.length > 2 && (
            <BoothCardMore>+{categories.length - 2}</BoothCardMore>
          )}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothHomeCardContainer>
  );
}
