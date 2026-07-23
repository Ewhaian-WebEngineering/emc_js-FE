import {
  TrendingBoothWrapper,
  Ranking,
  BoothName,
  TrendingBoothGrid,
} from '../style';

export default function TrendingBoothList({ trendingBooths }) {
  return (
    <TrendingBoothGrid>
      {trendingBooths.slice(0, 10).map((booth, index) => (
        <TrendingBooth
          key={booth.boothId}
          ranking={index + 1}
          boothName={booth.boothName}
        />
      ))}
    </TrendingBoothGrid>
  );
}

function TrendingBooth({ ranking, boothName }) {
  return (
    <TrendingBoothWrapper>
      <Ranking ranking={ranking}>{ranking}</Ranking>
      <BoothName>{boothName}</BoothName>
    </TrendingBoothWrapper>
  );
}
