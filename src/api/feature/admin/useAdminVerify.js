import { useMutation } from '@tanstack/react-query';
import { adminCodeApi } from './adminCodeApi';

export function useAdminVerify() {
  return useMutation({
    mutationFn: adminCodeApi.adminVerify,
  });
}
