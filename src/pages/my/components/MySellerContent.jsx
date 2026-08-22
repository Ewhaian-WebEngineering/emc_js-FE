import Banner from '../../../designsystem/components/banner/Banner';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import InquiryList from './InquiryList';

export default function MySellerContent({
  boothName,
  scrapCount,
  visitorCount,
}) {
  return (
    <>
      <Banner />
      <ManagementBoothCard
        boothName={boothName}
        onLinkClick={() => {}}
        scrapCount={scrapCount}
        visitorCount={visitorCount}
      />
      <InquiryList />
    </>
  );
}
