import { useParams } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';
import { useGoBack } from '@/hooks/useGoBack';
import { EVENT_ROUTES } from '@/constants/routes';
import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { formatEventPeriod } from '@/utils/formatDate';
import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import KakaoIcon from '@/assets/svg/20px/ic_kakao.svg?react';
import LinkIcon from '@/assets/svg/28px/ic_link.svg?react';
import { useEventDetail } from '@/api/feature/event/useEvents';
import { eventDetailMessages, eventTypeLabel } from './constants/eventDetail';
import * as S from './style';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useToast } from '@/hooks/toast/useToast';
import DOMPurify from 'dompurify';

export default function EventDetailScreen() {
  const { id } = useParams();
  const handleBack = useGoBack(EVENT_ROUTES.LIST);
  const { toast } = useToast();

  const { data: event } = useEventDetail(id);

  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연결
  };

  const hasCaution = Boolean(event.caution?.trim());

  return (
    <>
      <FillCenterHeader title="이벤트 상세" onBack={handleBack} border />

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
            {hasCaution ? event.caution.trim() : eventDetailMessages.noNotice}
          </S.NoticeText>
        </S.ColumnBox>
      </S.NoticeBox>
    </>
  );
}
