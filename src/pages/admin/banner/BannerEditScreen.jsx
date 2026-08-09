import BannerForm from './BannerForm';
import { mockBanner } from '../constants/mockBanner';

export default function BannerEditScreen() {
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
  };

  return (
    <BannerForm mode="edit" initialData={mockBanner} onSubmit={handleSubmit} />
  );
}
