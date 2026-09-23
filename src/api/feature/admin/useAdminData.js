import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { adminCodeApi } from './adminCodeApi';
import {
  getAdminDashboardApi,
  updateCongestionApi,
  deleteEventApi,
  deleteSponsorApi,
  deleteBannerApi,
  deleteFaqApi,
} from './adminDashboardApi';
import {
  useUpdateCongestion as useUpdateCongestionBase,
  useCongestionStream,
} from './useCongestion';
import { updateSponsor } from './sponsorManageApi';

export function useAdminVerify() {
  return useMutation({
    mutationFn: adminCodeApi.adminVerify,
  });
}

export function useAdminDashboard() {
  return useSuspenseQuery({
    queryKey: ['adminDashboard'],
    queryFn: getAdminDashboardApi,
  });
}

export const useUpdateCongestion = () =>
  useUpdateCongestionBase(updateCongestionApi);
export { useCongestionStream };

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
}

export function useDeleteSponsor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSponsorApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
}

export function useDeleteBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBannerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaqApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
}

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
