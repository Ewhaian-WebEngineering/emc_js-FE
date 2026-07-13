import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TAB_ROUTES } from '@/constants/routes';

import NoticeHeader from './component/NoticeHeader';
import NoticeChip from './component/NoticeChip';
import GuideItem from './component/GuideItem';

import {
  NoticeScreenContainer,
  Content,
  GuideSectionWrapper,
  NoticeSectionWrapper,
  SectionTitle,
  ChipGroup,
  GuideList,
  NoticeList,
  NoticeListItem,
} from './style';

const PRE_GUIDE = [
  {
    number: 1,
    description:
      '입장안내설명영역입니다.입장안내설명영역입니다.입장안내설명영역입니다.',
  },
  {
    number: 2,
    description:
      '입장안내설명영역입니다.입장안내설명영역입니다.입장안내설명영역입니다.입장안내설명영역입니다.',
  },
  {
    number: 3,
    description:
      '입장안내설명영역입니다.입장안내설명영역입니다.입장안내설명영역입니다.',
  },
];

const ONSITE_GUIDE = [
  {
    number: 1,
    description: '현장등록자 입장안내영역입니다.현장등록자 입장안내영역입니다.',
  },
  {
    number: 2,
    description: '현장등록자 입장안내영역입니다.현장등록자 입장안내영역입니다.',
  },
  {
    number: 3,
    description: '현장등록자 입장안내영역입니다.',
  },
];

const NOTICE_ITEMS = [
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
  '유의사항 영역입니다.유의사항 영역입니다.',
];

export default function NoticeScreen() {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('pre');

  const guideItems = selectedTab === 'pre' ? PRE_GUIDE : ONSITE_GUIDE;

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(TAB_ROUTES.HOME);
    }
  };

  return (
    <NoticeScreenContainer>
      <NoticeHeader title="안내사항" onBack={handleBack} onClose={handleBack} />

      <Content>
        <GuideSectionWrapper>
          <SectionTitle>입장 안내</SectionTitle>

          <ChipGroup>
            <NoticeChip
              selected={selectedTab === 'pre'}
              onClick={() => setSelectedTab('pre')}
            >
              사전 등록자
            </NoticeChip>

            <NoticeChip
              selected={selectedTab === 'onsite'}
              onClick={() => setSelectedTab('onsite')}
            >
              현장 등록자
            </NoticeChip>
          </ChipGroup>

          <GuideList>
            {guideItems.map((item) => (
              <GuideItem
                key={item.number}
                number={item.number}
                description={item.description}
              />
            ))}
          </GuideList>
        </GuideSectionWrapper>

        <NoticeSectionWrapper>
          <SectionTitle>유의사항</SectionTitle>

          <NoticeList>
            {NOTICE_ITEMS.map((item, index) => (
              <NoticeListItem key={index}>• {item}</NoticeListItem>
            ))}
          </NoticeList>
        </NoticeSectionWrapper>
      </Content>
    </NoticeScreenContainer>
  );
}
