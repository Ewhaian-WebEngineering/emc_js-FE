import { formatDate } from '@/utils/formatDate';
import CardPlaceholder from '../../Placeholder';
import {
  EventCardContainer,
  EventCardContent,
  EventCardDate,
  EventCardInfoWrapper,
  EventCardThumbnail,
  EventCardTitle,
  EventCardStatus,
} from './style';
import Image from '../../Image';

/**
 * 이벤트 정보를 표시하는 카드 컴포넌트입니다.
 * 홈 > 이벤트 섹션, 이벤트 목록 화면에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 이벤트 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} eventTitle - 이벤트 제목
 * @param {string} startDate - 이벤트 시작일
 * @param {string} [endDate] - 이벤트 종료일, 없으면 시작일만 표시
 * @param {string} status - 이벤트 상태 (STATUS_LABEL)
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
export default function EventCard({
  thumbnail,
  eventTitle,
  startDate,
  endDate,
  status,
  onClick,
}) {
  return (
    <EventCardContainer status={status} onClick={onClick}>
      <EventCardThumbnail>
        {thumbnail ? (
          <Image src={thumbnail} alt={eventTitle} width={1200} />
        ) : (
          <CardPlaceholder />
        )}
      </EventCardThumbnail>
      <EventCardContent>
        <EventCardInfoWrapper>
          <EventCardTitle>{eventTitle}</EventCardTitle>
          <EventCardDate>
            {formatDate(startDate)}
            {endDate &&
              formatDate(endDate) !== formatDate(startDate) &&
              ` - ${formatDate(endDate)}`}
          </EventCardDate>
        </EventCardInfoWrapper>
        <EventCardStatus status={status}>{status}</EventCardStatus>
      </EventCardContent>
    </EventCardContainer>
  );
}
