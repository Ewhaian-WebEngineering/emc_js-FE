import { useToastContext } from '@/designsystem/components/toast/ToastContext';

/**
 * 토스트 메시지를 띄우는 함수를 제공하는 훅입니다.
 *
 * @returns {{ toast: function }} 토스트를 띄우는 함수
 */
export function useToast() {
  const { toast } = useToastContext();
  return { toast };
}
