import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';
import { useGoBack } from '@/hooks/useGoBack';
import { EVENT_ROUTES, SPONSOR_ROUTES } from '@/constants/routes';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatEventPeriod } from '@/utils/formatDate';
import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import KakaoIcon from '@/assets/svg/20px/ic_kakao.svg?react';
import LinkIcon from '@/assets/svg/28px/ic_link.svg?react';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import { useEventDetail } from '@/api/feature/event/useEvents';
import { eventDetailMessages, eventTypeLabel } from './constants/eventDetail';
import * as S from './style';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useToast } from '@/hooks/toast/useToast';
import DOMPurify from 'dompurify';
import { QueryBoundary } from '@/components/common/QueryBoundary';

export default function EventDetailScreen() {
  const { id } = useParams();
  const handleBack = useGoBack(EVENT_ROUTES.LIST);

  return (
    <>
      <FillCenterHeader title="이벤트 상세" onBack={handleBack} border />
      <QueryBoundary notFoundText="존재하지 않는 이벤트입니다.">
        <EventDetailContent id={id} />
      </QueryBoundary>
    </>
  );
}

function EventDetailContent({ id }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: event } = useEventDetail(id);

  const handleSponsorClick = () => {
    navigate(SPONSOR_ROUTES.LIST);
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: event.title,
      text: formatEventPeriod(event.eventType, event.startDate, event.endDate),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        toast({ message: '이 브라우저에서는 지원하지 않는 기능이에요.' });
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast({ message: '❌ 공유에 실패했어요. 다시 시도해주세요.' });
      }
    }
  };

  const trimmedCaution = event.caution?.trim();
  const hasCaution = Boolean(trimmedCaution);

  return (
    <>
      <S.EventHero>
        <S.EventTypeBadge>{eventTypeLabel[event.eventType]}</S.EventTypeBadge>
        <S.EventTitle>{event.title}</S.EventTitle>
        <S.RowBox gap={measurement.spacing4}>
          <S.EventPeriodLabel>진행 기간</S.EventPeriodLabel>
          <S.EventPeriodValue>
            {formatEventPeriod(event.eventType, event.startDate, event.endDate)}
          </S.EventPeriodValue>
        </S.RowBox>
      </S.EventHero>

      {event.description && (
        <S.EventContent
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(event.description),
          }}
        />
      )}

      {event.organizer !== 'EMC' && (
        <S.SponsorSection>
          <S.SponsorContent>
            <S.SponsorTitle>
              이번 행사와 함께하는 <br />
              협찬사들을 만나보세요
            </S.SponsorTitle>
            <S.SponsorButton
              variant="primary"
              size="md"
              onClick={handleSponsorClick}
            >
              협찬사 둘러보기
              <ArrowRightIcon />
            </S.SponsorButton>
          </S.SponsorContent>
        </S.SponsorSection>
      )}

      <Divider size="lg" />

      <S.ShareSection>
        <S.ShareBox>
          <S.ShareTitle>{eventDetailMessages.shareTitle}</S.ShareTitle>
          <S.ShareActions>
            <S.ShareAction>
              <S.KakaoShareIconCircle
                aria-label="카카오톡 공유하기"
                onClick={handleNativeShare}
              >
                <KakaoIcon />
              </S.KakaoShareIconCircle>
              <S.ShareActionLabel>
                카카오톡
                <br />
                공유하기
              </S.ShareActionLabel>
            </S.ShareAction>
            <S.ShareAction>
              <CopyToClipboard
                text={window.location.href}
                onCopy={(text, result) => {
                  toast({
                    message: result
                      ? '✅ 링크가 복사되었어요.'
                      : '❌ 복사에 실패했어요. 다시 시도해주세요.',
                  });
                }}
              >
                <S.LinkShareIconCircle aria-label="링크 복사하기">
                  <LinkIcon color={semantic.secondaryYellowDefault} />
                </S.LinkShareIconCircle>
              </CopyToClipboard>
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
          <S.RowBox gap={measurement.spacing6}>
            <InfoIcon color={semantic.iconNormalAssistive} />
            <S.NoticeTitle>이벤트 유의사항</S.NoticeTitle>
          </S.RowBox>
          <S.NoticeText>
            {hasCaution ? trimmedCaution : eventDetailMessages.noNotice}
          </S.NoticeText>
        </S.ColumnBox>
      </S.NoticeBox>
    </>
  );
}
