import BannerCarousel from './BannerCarousel';
import InquiryList from './InquiryList';

export default function MyDefaultContent({ data }) {
  return (
    <>
      <BannerCarousel banners={data.banners ?? []} />
      <InquiryList />
    </>
  );
}
