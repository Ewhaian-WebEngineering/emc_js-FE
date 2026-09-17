import { useNavigate } from 'react-router-dom';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';
import { MANAGE_ROUTES } from '../../../constants/routes';
import BannerCarousel from './BannerCarousel';

export default function MySellerContent({ data }) {
  const navigate = useNavigate();
  const { booth } = data;

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
