import Banner from '../../../designsystem/components/banner/Banner';
import InquiryList from './InquiryList';

export default function MyDefaultContent({ data }) {
  const banner = data.banners?.[0];

  return (
    <>
      {banner && <Banner src={banner.imageUrl} />}
      <InquiryList />
    </>
  );
}
