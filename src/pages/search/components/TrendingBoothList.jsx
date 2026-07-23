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
      {trendingBooths.slice(0, 10).map((booth, index) => (
        <TrendingBooth
          key={booth.boothId}
          ranking={index + 1}
          boothName={booth.boothName}
          onClick={() => navigate(`/booth/${booth.boothId}`)}
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
