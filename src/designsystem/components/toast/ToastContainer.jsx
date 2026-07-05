import { createPortal } from 'react-dom';
import { useToastContext } from './ToastContext';
import { ToastPortal } from './style';
import { Toast } from './Toast';

/**
 * ToastContext에 등록된 Toast 목록을 document.body에 렌더링하는 컴포넌트입니다.
 */
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
