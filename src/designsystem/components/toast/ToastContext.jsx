import { createContext, useReducer, useCallback, useContext } from 'react';

const ToastContext = createContext();

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
 */
export function useToastContext() {
  return useContext(ToastContext);
}
