import { BannerContainer } from './style';
import Placeholder from '@/assets/img/img_checker.png';

/**
 * 배너 이미지를 표시하는 컴포넌트입니다.
 * src가 제공되지 않으면 기본 이미지로 대체됩니다.
 *
 * @param {string} [src] - 배너 이미지 경로
 * @param {string} [alt='Banner'] - 이미지 대체 텍스트
 */
export default function Banner({ src, alt = 'Banner' }) {
  return (
    <BannerContainer>
      <img src={src || Placeholder} alt={alt} />
    </BannerContainer>
  );
}
