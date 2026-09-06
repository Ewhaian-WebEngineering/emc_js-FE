import InfoIcon from '@/assets/svg/16px/ic_information.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { NoticeContent, NoticeTabContainer, NoticeTabHeader } from './style';

export default function NoticeTab({ content }) {
  if (!content) return null;

  return (
    <NoticeTabContainer>
      <NoticeTabHeader>
        <InfoIcon color={semantic.iconNormalAssistive} />
        <h2>안내 사항</h2>
      </NoticeTabHeader>
      <NoticeContent>{content}</NoticeContent>
    </NoticeTabContainer>
  );
}
