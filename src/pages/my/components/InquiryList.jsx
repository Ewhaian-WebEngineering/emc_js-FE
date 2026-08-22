import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import IconButton from '../../../designsystem/components/button/iconbutton/IconButton';
import { semantic } from '@/designsystem/tokens/semantic';
import {
  InquiryListWrapper,
  InquiryItem,
  InquiryTextGroup,
  InquiryTitle,
  InquirySubtitle,
} from './style.js';

export default function InquiryList() {
  return (
    <InquiryListWrapper>
      <InquiryItem>
        <InquiryTextGroup>
          <InquiryTitle>EMC에게 문의하기</InquiryTitle>
          <InquirySubtitle>종합선물세트 행사 관련 문의하기</InquirySubtitle>
        </InquiryTextGroup>
        <IconButton
          size="md"
          variant="transparent"
          color={semantic.iconNormalInverse}
        >
          <ArrowRightIcon />
        </IconButton>
      </InquiryItem>
      <InquiryItem>
        <InquiryTextGroup>
          <InquiryTitle>사이트 오류 신고하기</InquiryTitle>
          <InquirySubtitle>사이트 관련 불편한점 접수하기</InquirySubtitle>
        </InquiryTextGroup>
        <IconButton
          size="md"
          variant="transparent"
          color={semantic.iconNormalInverse}
        >
          <ArrowRightIcon />
        </IconButton>
      </InquiryItem>
    </InquiryListWrapper>
  );
}
