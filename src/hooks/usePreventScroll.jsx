import { useEffect } from 'react';

/**
 * isOpen이 true인 동안 배경 스크롤을 막는 훅입니다.
 * 바텀시트, 모달 등이 열려 있을 때 사용합니다.
 *
 * @param {boolean} isOpen - 스크롤을 막을지 여부
 */
export const usePreventScroll = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);
};
