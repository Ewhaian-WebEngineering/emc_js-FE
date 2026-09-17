import { useNavigate } from 'react-router-dom';
import Banner from '../../../designsystem/components/banner/Banner';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';
import { MANAGE_ROUTES } from '../../../constants/routes';

export default function MySellerContent({ data }) {
  const navigate = useNavigate();
  const banner = data.banners?.[0];
  const { booth } = data;

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
