import { useState, useEffect } from 'react';
import { useToastContext } from './ToastContext';
import { ToastWrapper, ToastActionButton, ToastMessage } from './style';

export function Toast({ id, message, action, duration }) {
  const { removeToast } = useToastContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 50);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => removeToast(id), 300);
    }, duration);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(timer);
    };
  }, [id, duration, removeToast]);

  function handleAction() {
    action?.onClick?.();
    setVisible(false);
    setTimeout(() => removeToast(id), 300);
  }

  return (
    <ToastWrapper visible={visible}>
      <ToastMessage>{message}</ToastMessage>
      {action && (
        <ToastActionButton onClick={handleAction}>
          {action.label}
        </ToastActionButton>
      )}
    </ToastWrapper>
  );
}
