import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { modalStore } from '@/api/core/store/modalStore';

const ModalContext = createContext(null);

/**
 * showModal 함수를 통해 Modal을 Promise 기반으로 호출할 수 있게 해주는 Context Provider입니다.
 *
 * @param {React.ReactNode} children - Provider 하위에서 렌더링할 콘텐츠
 */
export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState(null);
  const resolverRef = useRef(null);

  const showModal = useCallback((options) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setModalState(options);
    });
  }, []);

  useEffect(() => {
    modalStore.register(showModal);
  }, [showModal]);

  const handleConfirm = useCallback(
    (value) => {
      modalState?.onConfirm?.(value);
      resolverRef.current?.({ confirmed: true, value });
      resolverRef.current = null;
      setModalState(null);
    },
    [modalState],
  );

  const handleCancel = useCallback(() => {
    modalState?.onCancel?.();
    resolverRef.current?.({ confirmed: false });
    resolverRef.current = null;
    setModalState(null);
  }, [modalState]);

  const handleDismiss = useCallback(() => {
    resolverRef.current?.({ confirmed: false, dismissed: true });
    resolverRef.current = null;
    setModalState(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modalState && (
        <Modal
          {...modalState}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onDismiss={handleDismiss}
        />
      )}
    </ModalContext.Provider>
  );
}

export default ModalContext;
