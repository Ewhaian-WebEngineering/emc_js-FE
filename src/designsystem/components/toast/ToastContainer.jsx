import { createPortal } from 'react-dom';
import { useToastContext } from './ToastContext';
import { ToastPortal } from './style';
import { Toast } from './Toast';

export function ToastContainer() {
  const { toasts } = useToastContext();

  return createPortal(
    <ToastPortal>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastPortal>,

    document.body,
  );
}
