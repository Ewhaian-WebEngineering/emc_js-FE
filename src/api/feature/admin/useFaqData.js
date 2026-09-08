import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { createFaqApi, getFaqsApi, updateFaqApi } from './faqManageApi.js';

const FAQ_QUERY_KEY = ['faqs'];

export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFaqApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAQ_QUERY_KEY });
    },
  });
};

export const useFaq = (fid) => {
  return useSuspenseQuery({
    queryKey: FAQ_QUERY_KEY,
    queryFn: getFaqsApi,
    //TODO: 개별 조회 API 사용
    select: (faqs) => faqs.find((faq) => faq.id === fid),
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFaqApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAQ_QUERY_KEY });
    },
  });
};
