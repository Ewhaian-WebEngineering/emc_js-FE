import { useContext } from 'react';
import ModalContext from '../../designsystem/components/modal/ModalContext';

/**
 * ModalProvider의 컨텍스트 값을 가져오는 훅입니다.
 *
 * @returns {object} ModalContext에 담긴 모달 제어 값
 */
export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
