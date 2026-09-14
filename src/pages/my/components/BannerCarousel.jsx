import { useEffect, useMemo, useRef, useState } from 'react';
import Image from '@/designsystem/components/Image';
import {
  BannerCarouselContainer,
  BannerSlideTrack,
  BannerSlide,
} from './style';
import Placeholder from '@/assets/img/img_checker.png';

const AUTO_INTERVAL_MS = 4000;

function isBannerActive(banner) {
  const today = new Date().toISOString().slice(0, 10);
  if (banner.startDate && today < banner.startDate) return false;
  if (banner.endDate && today > banner.endDate) return false;
  return true;
}

/**
 * 배너 이미지를 한 방향으로 무한 자동 전환하며 보여주는 캐러셀 컴포넌트입니다.
 * 클릭 시 배너의 linkUrl로 이동합니다.
 *
 * @param {Array<{ id: string, title: string, imageUrl: string, linkUrl?: string, startDate?: string, endDate?: string, displayOrder?: number }>} banners - 배너 목록
 */
export default function BannerCarousel({ banners = [] }) {
  const visibleBanners = useMemo(
    () =>
      [...banners]
        .filter(isBannerActive)
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    [banners],
  );

  const slides = useMemo(
    () =>
      visibleBanners.length > 1
        ? [...visibleBanners, visibleBanners[0]]
        : visibleBanners,
    [visibleBanners],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
    setWithTransition(true);
  }, [visibleBanners.length]);

  useEffect(() => {
    if (visibleBanners.length <= 1) return undefined;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTO_INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, [visibleBanners.length]);

  useEffect(() => {
    if (withTransition) return undefined;
    const id = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(id);
  }, [withTransition]);

  const handleTransitionEnd = () => {
    if (currentIndex === visibleBanners.length) {
      setWithTransition(false);
      setCurrentIndex(0);
    }
  };

  const handleBannerClick = (banner) => {
    if (!banner.linkUrl) return;
    window.location.href = banner.linkUrl;
  };

  if (visibleBanners.length === 0) return null;

  return (
    <BannerCarouselContainer>
      <BannerSlideTrack
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: withTransition ? undefined : 'none',
        }}
      >
        {slides.map((banner, index) => (
          <BannerSlide
            key={`${banner.id}-${index}`}
            onClick={() => handleBannerClick(banner)}
            clickable={!!banner.linkUrl}
          >
            <Image
              src={banner.imageUrl || Placeholder}
              alt={banner.title ?? 'Banner'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </BannerSlide>
        ))}
      </BannerSlideTrack>
    </BannerCarouselContainer>
  );
}
