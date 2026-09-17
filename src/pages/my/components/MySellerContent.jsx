import { useNavigate } from 'react-router-dom';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';
import { MANAGE_ROUTES } from '../../../constants/routes';
import BannerCarousel from './BannerCarousel';

const MOCK_BOOTH = {
  id: 'mock-booth-id',
  name: '[목업] 테스트 부스',
  scrapCount: 0,
  totalUv: 0,
};

export default function MySellerContent({ data }) {
  const navigate = useNavigate();
  const booth = data.booth ?? MOCK_BOOTH;

  const handleBoothLinkClick = (id) => {
    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(id));
  };

  return (
    <>
      <BannerCarousel banners={data.banners ?? []} />
      <ManagementBoothCard
        boothName={booth.name}
        onLinkClick={() => handleBoothLinkClick(booth.id)}
        scrapCount={booth.scrapCount}
        visitorCount={booth.totalUv}
      />
      <InquiryList />
    </>
  );
}
