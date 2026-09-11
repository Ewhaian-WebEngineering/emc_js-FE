import { Fragment } from 'react';
import BoothListCard from '@/designsystem/components/card/booth/BoothListCard';
import Divider from '@/designsystem/components/divider/Divider';
import { BoothListCardWrapper, BoothListWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import { BOOTH_ROUTES } from '@/constants/routes';
import { useBoothScrap } from '@/api/feature/scrap/useScrap';

export default function BoothList({ booths }) {
  const navigate = useNavigate();

  return (
    <BoothListWrapper>
      {booths.map((booth, index) => (
        <Fragment key={booth.id}>
          <BoothListCardWrapper>
            <BoothListItem
              booth={booth}
              onClick={() => navigate(BOOTH_ROUTES.DETAIL(booth.id))}
            />
          </BoothListCardWrapper>
          {index < booths.length - 1 && <Divider size="sm" />}
        </Fragment>
      ))}
    </BoothListWrapper>
  );
}

function BoothListItem({ booth, onClick }) {
  const { mutate: scrapBooth, isPending } = useBoothScrap(booth.id);

  return (
    <BoothListCard
      boothNumber={booth.boothNumber}
      boothName={booth.name}
      boothDescription={booth.description}
      categories={booth.categories}
      thumbnailUrl={booth.thumbnailUrl}
      productImages={booth.productImages}
      isVegan={booth.isVegan}
      isEco={booth.isEco}
      isBookmarked={booth.isScrapped}
      onClick={onClick}
      onBookmarkClick={() => {
        if (isPending) return;
        scrapBooth();
      }}
    />
  );
}
