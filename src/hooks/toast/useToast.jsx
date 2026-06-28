import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export function useToast() {
  const { toast } = useToastContext();
  return { toast };
}
