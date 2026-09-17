import { useNavigate } from 'react-router-dom';
import Banner from '../../../designsystem/components/banner/Banner';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';
import { MANAGE_ROUTES } from '../../../constants/routes';

const MOCK_BOOTH = {
  id: 'mock-booth-id',
  name: '[목업] 테스트 부스',
  scrapCount: 0,
  totalUv: 0,
};

export default function MySellerContent({ data }) {
  const navigate = useNavigate();
  const banner = data.banners?.[0];
  const booth = data.booth ?? MOCK_BOOTH;

  const handleBoothLinkClick = (id) => {
    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(id));
  };

  return (
    <>
      <Banner src={banner?.imageUrl} />
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
