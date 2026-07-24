import Placeholder from '@/designsystem/components/Placeholder';
import {
  ListScroll,
  SponsorDescriptionButton,
  SponsorItemContainer,
  SponsorItemThumbnail,
  SponsorListSection,
  SponsorName,
} from '../style';
import { useState } from 'react';
import ArrowRightIcon from '@/assets/svg/20px/ic_arrow_right.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';

export default function SponsorList({ list }) {
  const [selectedSponsor, setSelectedSponsor] = useState(list[0]?.sponsorName);
  const selected = list.find((s) => s.sponsorName === selectedSponsor);

  return (
    <SponsorListSection>
      <ListScroll>
        {list.map((sponsor) => (
          <SponsorItem
            key={sponsor.sponsorName}
            sponsorName={sponsor.sponsorName}
            thumbnail={sponsor.thumbnail}
            isSelected={selectedSponsor === sponsor.sponsorName}
            onClick={() => setSelectedSponsor(sponsor.sponsorName)}
          />
        ))}
      </ListScroll>
      {selected && (
        <SponsorDescriptionButton
          onClick={() => {
            // TODO: 스폰서 상세 페이지 이동
            alert(`Sponsor ${selected.sponsorName} clicked`);
          }}
        >
          <p>{selected.description}</p>
          <ArrowRightIcon color={semantic.iconNormalNormal} />
        </SponsorDescriptionButton>
      )}
    </SponsorListSection>
  );
}

function SponsorItem({ sponsorName, thumbnail, isSelected, onClick }) {
  return (
    <SponsorItemContainer onClick={onClick}>
      <SponsorItemThumbnail isSelected={isSelected}>
        {thumbnail ? (
          <img src={thumbnail} alt={sponsorName} />
        ) : (
          <Placeholder width={70} height={70} />
        )}
      </SponsorItemThumbnail>
      <SponsorName isSelected={isSelected}>{sponsorName}</SponsorName>
    </SponsorItemContainer>
  );
}
