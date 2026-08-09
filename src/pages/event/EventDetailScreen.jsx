import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';
import { useGoBack } from '@/hooks/useGoBack';
import { EVENT_ROUTES, SPONSOR_ROUTES } from '@/constants/routes';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatEventPeriod } from './utils/formatEventPeriod';
import KakaoIconContainer from './image/kakaoIconContainer.png';
import LinkIconContainer from './image/linkIconContainer.png';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import {
  eventDetailMessages,
  eventTypeLabel,
  getEventById,
} from './constants/eventDetail';
import * as S from './style';

const eventTitleMaxLength = 36;

const EventContentImage = styled.img`
  width: 335px;
  object-fit: contain;
`;

export default function EventDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = useGoBack(EVENT_ROUTES.LIST);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const event = getEventById(id);

  const handleSponsorClick = () => {
    if (!event?.sponsor) return;
    window.scrollTo(0, 0);
    navigate(SPONSOR_ROUTES.DETAIL(event.sponsor.id));
  };

  const handleKakaoShare = async () => {
    if (!navigator.share) {
      alert(eventDetailMessages.kakaoUnsupported);
      return;
    }
    try {
      await navigator.share({
        title: event.eventTitle,
        text: event.eventTitle,
        url: window.location.href,
      });
    } catch {
      return;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(eventDetailMessages.linkCopied);
    } catch {
      alert(eventDetailMessages.linkCopyFailed);
    }
  };

  if (!event) {
    return (
      <>
        <FillCenterHeader title="이벤트 상세" onBack={handleBack} border />
        <S.EventContent>{eventDetailMessages.notFound}</S.EventContent>
      </>
    );
  }

  const hasSponsor = Boolean(event.sponsor);
  const hasNotice = Boolean(event.notice?.trim());

  return (
    <>
      <FillCenterHeader title="이벤트 상세" onBack={handleBack} border />

      <S.HeaderSpacer />

      <S.EventHero>
        <S.EventTypeBadge>{eventTypeLabel[event.eventType]}</S.EventTypeBadge>
        <S.Text
          as="h1"
          typo="headline1Semibold"
          color="textNormalStrong"
          align="center"
          mb={measurement.spacing20}
          maxWidth={326}
          lineClamp={2}
        >
          {event.eventTitle?.slice(0, eventTitleMaxLength)}
        </S.Text>
        <S.RowBox gap={measurement.spacing4}>
          <S.Text typo="body2Regular" color="textNormalNormal">
            진행기간
          </S.Text>
          <S.Text typo="body2Medium" color="textNormalStrong">
            {formatEventPeriod(event.eventType, event.startDate, event.endDate)}
          </S.Text>
        </S.RowBox>
      </S.EventHero>

      <S.EventContent>
        {event.content?.map((block, index) => {
          if (block.type === 'image') {
            return block.image ? (
              <EventContentImage key={index} src={block.image} alt="" />
            ) : null;
          }
          return (
            <S.Text
              key={index}
              typo="caption1Regular"
              color="textNormalNormal"
              align="center"
            >
              {block.text}
            </S.Text>
          );
        })}
      </S.EventContent>

      {hasSponsor && (
        <S.SponsorSection>
          <S.SponsorContent>
            <S.Text
              as="h2"
              typo="title3Semibold"
              color="textNormalStrong"
              lineHeight={46}
            >
              {event.sponsor.name}에 대해
              <br />더 궁금하다면?
            </S.Text>
            <S.SponsorButton
              variant="primary"
              size="md"
              onClick={handleSponsorClick}
            >
              {event.sponsor.name} 부스 바로가기
              <ArrowRightIcon />
            </S.SponsorButton>
          </S.SponsorContent>
        </S.SponsorSection>
      )}

      <Divider size="lg" />

      <S.ShareSection>
        <S.ShareBox>
          <S.Text
            as="h2"
            typo="body1Medium"
            color="textNormalStrong"
            align="center"
          >
            {eventDetailMessages.shareTitle}
          </S.Text>
          <S.ShareActions>
            <S.ShareAction onClick={handleKakaoShare}>
              <S.ShareActionIcon src={KakaoIconContainer} alt="카카오톡" />
              <S.Text
                typo="body2Medium"
                color="textNormalNormal"
                align="center"
              >
                카카오톡 공유하기
              </S.Text>
            </S.ShareAction>
            <S.ShareAction onClick={handleCopyLink}>
              <S.ShareActionIcon src={LinkIconContainer} alt="링크" />
              <S.Text
                typo="body2Medium"
                color="textNormalNormal"
                align="center"
              >
                링크
                <br />
                복사하기
              </S.Text>
            </S.ShareAction>
          </S.ShareActions>
        </S.ShareBox>
      </S.ShareSection>

      <S.NoticeBox>
        <S.ColumnBox gap={measurement.spacing16} width={343}>
          <S.RowBox gap={measurement.spacing2}>
            <InfoIcon color={semantic.iconNormalAssistive} />
            <S.Text as="h2" typo="body2Semibold" color="textNormalStrong">
              이벤트 유의사항
            </S.Text>
          </S.RowBox>
          <S.Text
            as="p"
            typo="caption1Regular"
            color="textNormalStrong"
            maxWidth={335}
          >
            {hasNotice ? event.notice : eventDetailMessages.noNotice}
          </S.Text>
        </S.ColumnBox>
      </S.NoticeBox>
    </>
  );
}
