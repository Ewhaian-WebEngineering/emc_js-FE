import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SponsorFormScreen from './SponsorFormScreen';
import { mockSponsor } from './mocks/mockSponsor';

export default function SponsorEditScreen() {
  const { sponsorId } = useParams();
  const location = useLocation();
  const stateSponsor = location.state?.sponsorData;

  const [sponsor, setSponsor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stateSponsor) {
      setSponsor(stateSponsor);
      setIsLoading(false);
      return;
    }

    // TODO: API 연동 시 sponsorId로 협찬사 정보 가져오기
    setSponsor(mockSponsor);
    setIsLoading(false);
  }, [sponsorId, stateSponsor]);

  const handleSubmit = async (values) => {
    // TODO: API 연동 시 협찬사 정보 업데이트
    setSponsor(values);
  };

  if (isLoading) {
    // TODO: 로딩 화면 교체
    return <div>Loading...</div>;
  }

  return (
    <SponsorFormScreen
      sponsor={sponsor}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
