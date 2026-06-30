import { formatDate } from '../../../../utils/formatDate';
import { STATUS_LABEL } from '../../../../constants/eventStatus';
import CardPlaceholder from '../CardPlaceholder';
import {
  EventCardContainer,
  EventCardContent,
  EventCardDate,
  EventCardInfoWrapper,
  EventCardThumbnail,
  EventCardTitle,
  EventCardStatus,
} from './style';

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
          <img src={thumbnail} alt={eventTitle} />
        ) : (
          <CardPlaceholder />
        )}
      </EventCardThumbnail>
      <EventCardContent>
        <EventCardInfoWrapper>
          <EventCardTitle>{eventTitle}</EventCardTitle>
          <EventCardDate>
            {formatDate(startDate)}
            {endDate && ` - ${formatDate(endDate)}`}
          </EventCardDate>
        </EventCardInfoWrapper>
        <EventCardStatus status={status}>
          {STATUS_LABEL[status]}
        </EventCardStatus>
      </EventCardContent>
    </EventCardContainer>
  );
}
