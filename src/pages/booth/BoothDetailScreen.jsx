import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Placeholder from '@/designsystem/components/Placeholder';
import BookMarkStroke from '@/assets/svg/24px/ic_scrap_stroke.svg?react';
import BookMarkFill from '@/assets/svg/24px/ic_scrap_fill.svg?react';
import NoticeIcon from '@/assets/svg/16px/ic_announce.svg?react';
import { useGoBack } from '@/hooks/useGoBack';
import { useParams } from 'react-router-dom';
import { DUMMY_BOOTH_DETAIL } from './constants/dummyBoothDetail';
import { Badges, BoothMarks, RepresentativeImageWrapper } from './style';
import { MARK_ICON_LG } from '@/constants/marks';
import { semantic } from '@/designsystem/tokens/semantic';
import Badge from '@/designsystem/components/badge/Badge';
import {
  BoothInfo,
  BoothInfoHeader,
  BoothName,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  NoticeCard,
  NoticeContent,
} from './style';
import { OPERATING_TIME_OPTIONS } from '@/constants/filter';
import LinkButton from '@/designsystem/components/button/linkbutton/LinkButton';
import Divider from '@/designsystem/components/divider/Divider';

export default function BoothDetailScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();

  // TODO: 실제 데이터로 교체
  const booth = DUMMY_BOOTH_DETAIL;

  return (
    <>
      <RepresentativeImageWrapper>
        <TransparentHeader onBack={handleBack} />
        {booth.representativeImage ? (
          <img src={booth.representativeImage} alt="대표 이미지" />
        ) : (
          <Placeholder logoSize="30%" />
        )}
        <BoothMarks key={boothId}>
          {booth.marks?.map((mark) => {
            const MarkIcon = MARK_ICON_LG[mark];
            return <MarkIcon key={mark} />;
          })}
        </BoothMarks>
      </RepresentativeImageWrapper>
      <BoothInfo>
        <BoothInfoHeader>
          <BoothName>{booth.boothName}</BoothName>
          {booth.isBookmarked ? (
            <BookMarkFill color={semantic.iconPrimaryNormal} />
          ) : (
            <BookMarkStroke color={semantic.iconNormalAssistive} />
          )}
        </BoothInfoHeader>
        <Badges>
          {booth.tags?.map((tag) => (
            <Badge key={tag} size="sm" variant={tag} />
          ))}
        </Badges>
        <InfoList>
          <InfoRow>
            <InfoLabel>운영 시간</InfoLabel>
            <InfoValue>
              {OPERATING_TIME_LABEL[booth.operatingTime] || booth.operatingTime}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>현금 사용</InfoLabel>
            <InfoValue>{CASH_USAGE_LABEL[booth.cash] || booth.cash}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>위치</InfoLabel>
            <LinkButton size="sm" variant="secondary">
              {booth.location}번 부스
            </LinkButton>
          </InfoRow>
          <InfoRow>
            <InfoLabel>URL</InfoLabel>
            <LinkButton size="sm" variant="secondary" href={booth.url}>
              {booth.url}
            </LinkButton>
          </InfoRow>
        </InfoList>
        <NoticeCard>
          <NoticeIcon color={semantic.iconPrimaryNormal} />
          <NoticeContent announcement={booth.announcement}>
            {booth.announcement[0] || '등록된 공지가 없습니다.'}
          </NoticeContent>
        </NoticeCard>
      </BoothInfo>
      <Divider size="lg" />
    </>
  );
}

const OPERATING_TIME_LABEL = Object.fromEntries(
  OPERATING_TIME_OPTIONS.map(({ label, value }) => [value, label]),
);

const CASH_USAGE_LABEL = {
  true: '가능',
  false: '불가능',
};
