import BoothHomeCard from '@/designsystem/components/card/booth/BoothHomeCard';
import {
  RankingItemContainer,
  RankingNumber,
  RankingPage,
  RankingScroll,
} from '../style';

const BOOTH_PER_PAGE = 5;

function chunkArray(array, size) {
  return Array.from(
    {
      length: Math.ceil(array.length / size),
    },
    (_, index) => array.slice(index * size, (index + 1) * size),
  );
}

export default function PopularBoothRanking({ list }) {
  const pages = chunkArray(list, BOOTH_PER_PAGE);

  return (
    <RankingScroll>
      {pages.map((page, pageIndex) => (
        <RankingPage key={pageIndex}>
          {page.map((booth, boothIndex) => (
            <RankingItem
              key={boothIndex}
              rank={pageIndex * BOOTH_PER_PAGE + boothIndex + 1}
              booth={booth}
            />
          ))}
        </RankingPage>
      ))}
    </RankingScroll>
  );
}

function RankingItem({ rank, booth }) {
  return (
    <RankingItemContainer>
      <RankingNumber rank={rank}>{rank}</RankingNumber>
      <BoothHomeCard
        boothNumber={booth.boothNumber}
        boothName={booth.boothName}
        badges={booth.badges}
        thumbnails={booth.thumbnails}
        marks={booth.marks}
        onClick={booth.onClick}
      />
    </RankingItemContainer>
  );
}
