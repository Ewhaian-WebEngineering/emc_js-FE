import { createContext, useReducer, useCallback, useContext } from 'react';

const ToastContext = createContext(null);

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
}

/**
 * Toast 상태를 관리하고 하위 컴포넌트에서 사용할 수 있도록 제공하는 Context Provider입니다.
 *
 * @param {React.ReactNode} children - Provider 하위에서 렌더링할 콘텐츠
 */
export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const toast = useCallback(({ message, action, duration = 3000 }) => {
    const id = crypto.randomUUID();
    dispatch({
      type: 'ADD',
      toast: { id, message, action, duration },
    });
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * ToastContext가 제공하는 값(toasts, toast, removeToast)을 반환하는 훅입니다.
 * ToastProvider 하위가 아닌 곳에서 사용하면 에러를 던집니다.
 *
 * @returns {{ toasts: object[], toast: function, removeToast: function }} Toast 상태와 제어 함수들
 */
export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
}
