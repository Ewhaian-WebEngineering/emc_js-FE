import { createContext, useCallback, useRef, useState } from 'react';
import Modal from './Modal';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState(null);
  const resolverRef = useRef(null);

  const showModal = useCallback((options) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setModalState(options);
    });
  }, []);

  const handleConfirm = useCallback((value) => {
    resolverRef.current?.({ confirmed: true, value });
    resolverRef.current = null;
    setModalState(null);
  }, []);

  const handleCancel = useCallback(() => {
    resolverRef.current?.({ confirmed: false });
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
        />
      )}
    </ModalContext.Provider>
  );
}

export default ModalContext;
