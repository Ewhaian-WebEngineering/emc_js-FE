import { BannerContainer } from './style';
import Placeholder from '../../../assets/img/img_checker.png';

export default function Banner({ src }) {
  return (
    <BannerContainer>
      <img src={src || Placeholder} alt="Banner" />
    </BannerContainer>
  );
}
