import { Fragment } from 'react';
import BoothListCard from '@/designsystem/components/card/booth/BoothListCard';
import Divider from '@/designsystem/components/divider/Divider';
import { BoothListCardWrapper, BoothListWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import { BOOTH_ROUTES } from '@/constants/routes';

export default function BoothList({ booths }) {
  const navigate = useNavigate();

  return (
    <BoothListWrapper>
      {booths.map((booth, index) => (
        <Fragment key={booth.id}>
          <BoothListCardWrapper>
            <BoothListCard
              boothNumber={booth.boothNumber}
              boothName={booth.name}
              boothDescription={booth.description}
              categories={booth.categories}
              productImages={booth.productImages}
              isVegan={booth.isVegan}
              isEco={booth.isEco}
              isBookmarked={booth.isScrapped}
              onClick={() => {
                navigate(BOOTH_ROUTES.DETAIL(booth.id));
              }}
              onBookmarkClick={() => {
                // TODO: 북마크 API 호출
              }}
            />
          </BoothListCardWrapper>
          {index < booths.length - 1 && <Divider size="sm" />}
        </Fragment>
      ))}
    </BoothListWrapper>
  );
}
