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
import { SPONSOR_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

export default function SponsorList({ list }) {
  const navigate = useNavigate();
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
            navigate(SPONSOR_ROUTES.DETAIL(selected.id));
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
