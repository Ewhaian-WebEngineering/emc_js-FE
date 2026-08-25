import { useNavigate, useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';
import EmptyState from '@/designsystem/components/emptystate/EmptyState';
import { useGoBack } from '@/hooks/useGoBack';
import { EVENT_ROUTES, SPONSOR_ROUTES } from '@/constants/routes';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatEventPeriod } from '@/utils/formatDate';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import KakaoIcon from '@/assets/svg/20px/ic_kakao.svg?react';
import LinkIcon from '@/assets/svg/28px/ic_link.svg?react';
import {
  eventDetailMessages,
  eventTypeLabel,
  getEventById,
} from './constants/eventDetail';
import * as S from './style';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useToast } from '@/hooks/toast/useToast';
import DOMPurify from 'dompurify';

export default function EventDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = useGoBack(EVENT_ROUTES.LIST);
  const { toast } = useToast();

  const event = getEventById(id);

  const handleSponsorClick = () => {
    if (!event?.sponsor) return;
    navigate(SPONSOR_ROUTES.DETAIL(event.sponsor.id));
  };

  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연결
  };

  if (!event) {
    return (
      <>
        <FillCenterHeader title="이벤트 상세" onBack={handleBack} border />
        {/* TODO: 엣지 케이스 디자인 확정 시 수정 */}
        <EmptyState title={eventDetailMessages.notFound} />
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
        <S.EventTitle>{event.eventTitle}</S.EventTitle>
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

      {hasSponsor && (
        <S.SponsorSection>
          <S.SponsorContent>
            <S.SponsorTitle>
              {event.sponsor.name}에 대해
              <br />더 궁금하다면?
            </S.SponsorTitle>
            <S.SponsorButton
              variant="primary"
              size="md"
              onClick={handleSponsorClick}
            >
              협찬사 바로가기
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
                onClick={handleKakaoShare}
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
                  if (result) {
                    toast({ message: '✅ 링크가 복사되었어요.' });
                  } else {
                    toast({
                      message: '❌ 복사에 실패했어요. 다시 시도해주세요.',
                    });
                  }
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
            {hasNotice ? event.notice.trim() : eventDetailMessages.noNotice}
          </S.NoticeText>
        </S.ColumnBox>
      </S.NoticeBox>
    </>
  );
}
