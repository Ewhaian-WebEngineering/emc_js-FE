import { useNavigate } from 'react-router-dom';
import {
  TrendingBoothWrapper,
  Ranking,
  BoothName,
  TrendingBoothGrid,
} from '../style';

export default function TrendingBoothList({ trendingBooths }) {
  const navigate = useNavigate();

  return (
    <TrendingBoothGrid>
      {trendingBooths.slice(0, 10).map((booth) => (
        <TrendingBooth
          key={booth.id}
          ranking={booth.rank}
          boothName={booth.name}
          onClick={() => navigate(`/booth/${booth.id}`)}
        />
      ))}
    </TrendingBoothGrid>
  );
}

function TrendingBooth({ ranking, boothName, onClick }) {
  return (
    <TrendingBoothWrapper onClick={onClick}>
      <Ranking ranking={ranking}>{ranking}</Ranking>
      <BoothName>{boothName}</BoothName>
    </TrendingBoothWrapper>
  );
}
