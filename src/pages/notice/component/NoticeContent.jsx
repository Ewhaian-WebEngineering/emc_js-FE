import { useState } from 'react';
import {
  ContentWrapper,
  EntrySection,
  NoticeSection,
  SectionTitle,
  TagRow,
  GuideList,
  NoticeDescription,
  NoticeSectionsGroup,
  DividerWrapper,
} from '../style';
import { ENTRY_TYPES, GUIDE_ITEMS, NOTICE_SECTIONS } from '../constants/notice';
import Tag from '@/designsystem/components/tag/Tag';
import GuideItem from './GuideItem';
import Divider from '@/designsystem/components/divider/Divider';

export default function NoticeContent() {
  const [selectedType, setSelectedType] = useState('pre');

  return (
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

      <DividerWrapper>
        <Divider size="sm" />
      </DividerWrapper>

      <NoticeSectionsGroup>
        {NOTICE_SECTIONS[selectedType].map((section) => (
          <NoticeSection key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <NoticeDescription>{section.content}</NoticeDescription>
          </NoticeSection>
        ))}
      </NoticeSectionsGroup>
    </ContentWrapper>
  );
}
