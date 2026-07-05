import { MARK_ICON } from '../../../../constants/marks';
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

/**
 * 홈화면 부스 카드 컴포넌트입니다.
 * 홈 > 실시간 인기 부스 섹션에서 사용됩니다.
 *
 * @param {string|number} boothNumber - 부스 번호
 * @param {string} boothName - 부스 이름
 * @param {Array<string>} [badges=[]] - 표시할 배지 타입 목록
 * @param {string} [thumbnail] - 부스 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {Array<string>} [marks=[]] - 썸네일 위에 표시할 mark 아이콘 종류 목록
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
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
      <BoothCardThumbnailSm>
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
      </BoothCardThumbnailSm>
      <BoothCardContent>
        <BoothCardTextWrapper>
          <BoothCardNumber>No. {boothNumber}</BoothCardNumber>
          <BoothCardName>{boothName}</BoothCardName>
        </BoothCardTextWrapper>
        <BoothCardBadges>
          {badges.slice(0, 2).map((badge) => (
            <Badge key={badge} size="sm" variant={badge} />
          ))}
          {badges.length > 2 && (
            <BoothCardMore>+{badges.length - 2}</BoothCardMore>
          )}
        </BoothCardBadges>
      </BoothCardContent>
    </BoothHomeCardContainer>
  );
}
