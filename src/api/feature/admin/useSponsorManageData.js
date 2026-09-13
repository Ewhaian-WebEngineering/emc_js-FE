import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSponsor,
  updateSponsor,
  deleteSponsor,
  updateSponsorProduct,
  createSponsorProduct,
  deleteSponsorProduct,
  getSponsorProduct,
  createSponsorProductGroup,
  getSponsorProductGroup,
  updateSponsorProductGroup,
  deleteSponsorProductGroup,
} from './sponsorManageApi';

export const useSponsorDetail = (sponsorId) => {
  return useQuery({
    queryKey: ['sponsor-detail', sponsorId],
    queryFn: () => getSponsor(sponsorId),
    enabled: !!sponsorId,
  });
};

export const useUpdateSponsor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, payload }) => updateSponsor(sponsorId, payload),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};

export const useDeleteSponsor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSponsor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsor-list'] });
    },
  });
};

export const useSponsorProductGroupDetail = (
  sponsorId,
  groupId,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: ['sponsor-product-group-detail', sponsorId, groupId],
    queryFn: () => getSponsorProductGroup(sponsorId, groupId),
    enabled: enabled && !!sponsorId && !!groupId,
  });
};

export const useCreateSponsorProductGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, payload }) =>
      createSponsorProductGroup(sponsorId, payload),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};

export const useUpdateSponsorProductGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, groupId, payload }) =>
      updateSponsorProductGroup(sponsorId, groupId, payload),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};

export const useDeleteSponsorProductGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, groupId }) =>
      deleteSponsorProductGroup(sponsorId, groupId),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};

export const useSponsorProductDetail = (
  sponsorId,
  productId,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: ['sponsor-product-detail', sponsorId, productId],
    queryFn: () => getSponsorProduct(sponsorId, productId),
    enabled: enabled && !!sponsorId && !!productId,
  });
};

export const useCreateSponsorProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, payload }) =>
      createSponsorProduct(sponsorId, payload),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};

export const useUpdateSponsorProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, productId, payload }) =>
      updateSponsorProduct(sponsorId, productId, payload),
    onSuccess: (_, { sponsorId, productId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
      queryClient.invalidateQueries({
        queryKey: ['sponsor-product-detail', sponsorId, productId],
      });
    },
  });
};

export const useDeleteSponsorProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sponsorId, productId }) =>
      deleteSponsorProduct(sponsorId, productId),
    onSuccess: (_, { sponsorId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
    },
  });
};
