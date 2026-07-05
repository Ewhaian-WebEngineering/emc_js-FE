import { useState, useEffect } from 'react';
import { useToastContext } from './ToastContext';
import { ToastWrapper, ToastActionButton, ToastMessage } from './style';

/**
 * 화면 하단에 잠시 표시되는 개별 Toast 메시지 컴포넌트입니다.
 *
 * @param {string} id - Toast를 식별하는 고유 id
 * @param {string} message - 표시할 메시지
 * @param {{label: string, onClick: function}} [action] - Toast에 표시할 액션 버튼 정보
 * @param {number} duration - Toast가 표시되는 시간(ms)
 */
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
