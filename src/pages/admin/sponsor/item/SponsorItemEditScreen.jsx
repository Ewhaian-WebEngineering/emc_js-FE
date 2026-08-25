import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import { mockSponsorItem } from '../mocks/mockSponsorItem';

export default function SponsorItemEditScreen() {
  const { sponsorId, itemId } = useParams();
  const location = useLocation();
  const stateItem = location.state?.itemData;

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stateItem) {
      setItem(stateItem);
      setIsLoading(false);
      return;
    }
    setItem(mockSponsorItem);
    setIsLoading(false);
  }, [sponsorId, itemId, stateItem]);

  if (isLoading) return <div>Loading...</div>;
  const handleSubmit = async (values) => {
    // TODO: API 연동 시 협찬품 정보 업데이트
    setItem(values);
  };

  return (
    <SponsorItemFormScreen
      item={item}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
