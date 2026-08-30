import { useMutation } from '@tanstack/react-query';
import { admincodeApi } from './admincodeApi';

export function useAdminVerify() {
  return useMutation({
    mutationFn: admincodeApi.adminVerify,
  });
}
