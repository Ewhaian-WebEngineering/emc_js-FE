import {
  GuideItemWrapper,
  GuideItemBadge,
  GuideItemBadgeText,
  GuideItemContent,
  GuideItemTitle,
  GuideItemDescription,
} from './style';

export default function GuideItem({ number, title, description }) {
  return (
    <GuideItemWrapper>
      <GuideItemBadge>
        <GuideItemBadgeText>{number}</GuideItemBadgeText>
      </GuideItemBadge>
      <GuideItemContent>
        <GuideItemTitle>{title}</GuideItemTitle>
        <GuideItemDescription>{description}</GuideItemDescription>
      </GuideItemContent>
    </GuideItemWrapper>
  );
}
