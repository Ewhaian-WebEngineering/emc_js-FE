import { GuideItemWrapper, GuideItemBadge, GuideItemContent } from '../style';

export default function GuideItem({ number, title, description }) {
  return (
    <GuideItemWrapper>
      <GuideItemBadge>{number}</GuideItemBadge>
      <GuideItemContent>
        <span>{title}</span>
        <br />
        {description}
      </GuideItemContent>
    </GuideItemWrapper>
  );
}
