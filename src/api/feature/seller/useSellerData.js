import { useMutation } from '@tanstack/react-query';
import { verifySellerCode } from './sellerApi';

export const useSellerVerify = () => {
  return useMutation({
    mutationFn: verifySellerCode,
  });
};
