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
import Image from '@/designsystem/components/Image';

export default function SponsorList({ list }) {
  const navigate = useNavigate();
  const [selectedSponsor, setSelectedSponsor] = useState(list[0]?.name);
  const selected = list.find((s) => s.name === selectedSponsor);

  return (
    <SponsorListSection>
      <ListScroll>
        {list.map((sponsor) => (
          <SponsorItem
            key={sponsor.id}
            name={sponsor.name}
            imageUrl={sponsor.imageUrl}
            isSelected={selectedSponsor === sponsor.name}
            onClick={() => setSelectedSponsor(sponsor.name)}
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

const splitKoEn = (name) =>
  name
    .replace(/([가-힣])\s+(?=[A-Za-z])/g, '$1\n')
    .replace(/([A-Za-z,.])\s+(?=[가-힣])/g, '$1\n');

function SponsorItem({ name, imageUrl, isSelected, onClick }) {
  return (
    <SponsorItemContainer onClick={onClick}>
      <SponsorItemThumbnail isSelected={isSelected}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} />
        ) : (
          <Placeholder width={70} height={70} />
        )}
      </SponsorItemThumbnail>
      <SponsorName isSelected={isSelected}>{splitKoEn(name)}</SponsorName>
    </SponsorItemContainer>
  );
}
