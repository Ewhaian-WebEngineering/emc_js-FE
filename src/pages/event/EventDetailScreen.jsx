import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';
import { useGoBack } from '@/hooks/useGoBack';
import { EVENT_ROUTES, SPONSOR_ROUTES } from '@/constants/routes';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatEventPeriod } from '@/utils/formatDate';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import KakaoIcon from '@/assets/svg/20px/ic_kakao.svg?react';
import LinkIcon from '@/assets/svg/20px/ic_link.svg?react';
import {
  eventDetailMessages,
  eventTypeLabel,
  getEventById,
} from './constants/eventDetail';
import * as S from './style';

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

      <S.EventHero>
        <S.EventTypeBadge>{eventTypeLabel[event.eventType]}</S.EventTypeBadge>
        <S.EventTitle as="h1">{event.eventTitle}</S.EventTitle>
        <S.RowBox gap={measurement.spacing4}>
          <S.EventPeriodLabel>진행 기간</S.EventPeriodLabel>
          <S.EventPeriodValue>
            {formatEventPeriod(event.eventType, event.startDate, event.endDate)}
          </S.EventPeriodValue>
        </S.RowBox>
      </S.EventHero>

      <S.EventContent>{/* TODO: RTE 데이터 가져오기 */}</S.EventContent>

      {hasSponsor && (
        <S.SponsorSection>
          <S.SponsorContent>
            <S.SponsorTitle as="h2">
              {event.sponsor.name}에 대해
              <br />더 궁금하다면?
            </S.SponsorTitle>
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
          <S.ShareTitle as="h2">{eventDetailMessages.shareTitle}</S.ShareTitle>
          <S.ShareActions>
            <S.ShareAction onClick={handleKakaoShare}>
              <S.KakaoShareIconCircle>
                <KakaoIcon />
              </S.KakaoShareIconCircle>
              <S.ShareActionLabel>카카오톡 공유하기</S.ShareActionLabel>
            </S.ShareAction>
            <S.ShareAction onClick={handleCopyLink}>
              <S.LinkShareIconCircle>
                <LinkIcon color={semantic.secondaryYellowDefault} />
              </S.LinkShareIconCircle>
              <S.ShareActionLabel>
                링크
                <br />
                복사하기
              </S.ShareActionLabel>
            </S.ShareAction>
          </S.ShareActions>
        </S.ShareBox>
      </S.ShareSection>

      <S.NoticeBox>
        <S.ColumnBox gap={measurement.spacing16}>
          <S.RowBox gap={measurement.spacing2}>
            <InfoIcon color={semantic.iconNormalAssistive} />
            <S.NoticeTitle as="h2">이벤트 유의사항</S.NoticeTitle>
          </S.RowBox>
          <S.NoticeText>
            {hasNotice ? event.notice : eventDetailMessages.noNotice}
          </S.NoticeText>
        </S.ColumnBox>
      </S.NoticeBox>
    </>
  );
}
