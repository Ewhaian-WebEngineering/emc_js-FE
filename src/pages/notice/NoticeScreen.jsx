import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import CloseButton from '@/assets/svg/28px/ic_close.svg?react';
import Tag from '@/designsystem/components/tag/Tag';
import Divider from '@/designsystem/components/divider/Divider';
import { semantic } from '@/designsystem/tokens/semantic';
import GuideItem from './component/GuideItem';
import {
  NoticeContainer,
  ContentWrapper,
  EntrySection,
  NoticeSection,
  SectionTitle,
  TagRow,
  GuideList,
  NoticeDescription,
  NoticeSectionsGroup,
} from './style';

import { ENTRY_TYPES, GUIDE_ITEMS, NOTICE_SECTIONS } from './constants/notice';

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
        <EntrySection>
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
            {GUIDE_ITEMS[selectedType].map((item) => (
              <GuideItem
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
              />
            ))}
          </GuideList>
        </EntrySection>

        <Divider size="sm" />

        <NoticeSectionsGroup>
          {NOTICE_SECTIONS[selectedType].map((section) => (
            <NoticeSection key={section.title}>
              <SectionTitle>{section.title}</SectionTitle>
              <NoticeDescription>{section.content}</NoticeDescription>
            </NoticeSection>
          ))}
        </NoticeSectionsGroup>
      </ContentWrapper>
    </NoticeContainer>
  );
}
