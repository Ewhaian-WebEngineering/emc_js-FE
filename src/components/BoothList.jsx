import { Fragment } from 'react';
import BoothListCard from '@/designsystem/components/card/booth/BoothListCard';
import Divider from '@/designsystem/components/divider/Divider';
import { BoothListCardWrapper, BoothListWrapper } from './style';

export default function BoothList({ booths }) {
  return (
    <BoothListWrapper>
      {booths.map((booth, index) => (
        <Fragment key={booth.id}>
          <BoothListCardWrapper>
            <BoothListCard
              boothNumber={booth.boothNumber}
              boothName={booth.boothName}
              boothDescription={booth.boothDescription}
              badges={booth.badges}
              thumbnails={booth.thumbnails}
              marks={booth.marks}
              isBookmarked={booth.isBookmarked}
              onClick={() => {
                // TODO: 부스 상세 페이지로 이동
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
