import { semantic } from '@/designsystem/tokens/semantic';
import InquiryIcon from '@/assets/svg/20px/ic_link.svg?react';
import ShareIcon from '@/assets/svg/20px/ic_share.svg?react';
import {
  ContactButton,
  ContactTabContainer,
  ContactTabTextWrapper,
  ContactUrl,
  InquiryIconWrapper,
} from './style';

export default function ContactTab({ contactUrl }) {
  return (
    <ContactTabContainer>
      <ContactTabTextWrapper>
        <h2>고객 문의</h2>
        <p>
          상품에 대해 궁금하신 점이나 환불, 교환 문의는 셀러가 등록한 문의
          창구를 이용해 주세요.
        </p>
      </ContactTabTextWrapper>
      <ContactButton
        onClick={() => {
          if (contactUrl) window.open(contactUrl, '_self');
        }}
      >
        <InquiryIconWrapper>
          <InquiryIcon color={semantic.secondaryYellowDefault} />
        </InquiryIconWrapper>
        <ContactUrl>{contactUrl || '등록된 문의 창구가 없습니다.'}</ContactUrl>
        <ShareIcon color={semantic.iconNormalNormal} />
      </ContactButton>
    </ContactTabContainer>
  );
}
