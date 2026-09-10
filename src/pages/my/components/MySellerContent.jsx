import Banner from '../../../designsystem/components/banner/Banner';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';

export default function MySellerContent({ data }) {
  const banner = data.banners?.[0];
  const { booth } = data;

  return (
    <>
      {banner && <Banner src={banner.imageUrl} />}
      <ManagementBoothCard
        boothName={booth.name}
        onLinkClick={() => {}}
        scrapCount={booth.scrapCount}
        visitorCount={booth.totalUv}
      />
      <InquiryList />
    </>
  );
}
