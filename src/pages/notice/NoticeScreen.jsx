import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import CloseButton from '@/assets/svg/16px/ic_close.svg?react';
import Tag from '@/designsystem/components/tag/Tag';
import Divider from '@/designsystem/components/divider/Divider';
import { semantic } from '@/designsystem/tokens/semantic';
import GuideItem from './component/GuideItem';
import {
  NoticeContainer,
  ContentWrapper,
  Section,
  SectionTitle,
  TagRow,
  GuideList,
  NoticeDescription,
  DividerWrapper,
  NoticeSectionsGroup,
} from './style';

const ENTRY_TYPES = [
  { key: 'pre', label: '사전등록자' },
  { key: 'onsite', label: '현장등록자' },
  { key: 'event', label: '이벤트참가자' },
];

export default function NoticeScreen() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('pre');

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <NoticeContainer>
      <FillCenterHeader
        onBack={handleBack}
        title="안내사항"
        right={
          <CloseButton
            color={semantic.iconNormalNormal}
            onClick={handleClose}
          />
        }
      />

      <ContentWrapper>
        <Section>
          <SectionTitle>입장 안내</SectionTitle>
          <TagRow>
            {ENTRY_TYPES.map((type) => (
              <Tag
                key={type.key}
                label={type.label}
                variant="button"
                selected={selectedType === type.key}
                onClick={() => setSelectedType(type.key)}
              />
            ))}
          </TagRow>
          <GuideList>
            <GuideItem
              number="01"
              title="사전 등록 입장줄 대기"
              description="STAFF가 안내해주는 사전등록 입장줄에 대기해주세요."
            />
            <GuideItem
              number="02"
              title="사전 등록 확인"
              description="STAFF에게 [이름/전화번호 뒷자리 4개]를 말씀해주세요."
            />
            <GuideItem
              number="03"
              title="입장 도장 및 이벤트 도장판 수령"
              description=""
            />
          </GuideList>
        </Section>

        <DividerWrapper>
          <Divider size="sm" />
        </DividerWrapper>

        <NoticeSectionsGroup>
          <Section>
            <SectionTitle>재입장</SectionTitle>
            <NoticeDescription>
              재입장은 입구에 있는 스태프에게 손등의 도장을 보여주신 후 언제든
              가능합니다.
            </NoticeDescription>
          </Section>

          <Section>
            <SectionTitle>입장 시간 안내</SectionTitle>
            <NoticeDescription>
              사전 입장과 현장 입장은 11시로, 동시에 시작됩니다. 다만,
              사전등록자에 한하여, 빠른 입장을 위해 11시 이전 사전 등록 확인
              절차가 이루어질 예정입니다. 입장 대기는 10시 30분부터 가능합니다.
              현장 등록자가 11시 이전 입금 및 현장등록 구글폼을 작성하는 것은
              허용하나, 행사장 내부가 혼잡할 경우 바로 입장이 불가할 수
              있습니다.
            </NoticeDescription>
          </Section>

          <Section>
            <SectionTitle>관람 동선</SectionTitle>
            <NoticeDescription>
              1번 부스부터 현장 이벤트까지 차례대로 관람 후 출구로 퇴장
            </NoticeDescription>
          </Section>

          <Section>
            <SectionTitle>유의 사항</SectionTitle>
            <NoticeDescription>
              {`- 입장 도장은 스티커판 모으기 이벤트와 별개로 입장 및 재입장을 위한 용도입니다.
- 사후 이벤트에 관한 자세한 사항은 제 12회 종손 웹사이트 또는 추후 올라올 카드뉴스를 참고해주세요.
- 현장 사진 및 영상 촬영이 진행될 수 있다는 점 참고 부탁드립니다.
- 현장 문의는 현장 STAFF 또는 행사 사무국에게 해주시기 바랍니다.`}
            </NoticeDescription>
          </Section>
        </NoticeSectionsGroup>
      </ContentWrapper>
    </NoticeContainer>
  );
}
