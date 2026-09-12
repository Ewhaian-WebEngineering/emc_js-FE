import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from './productApi';

export const useProductDetail = (productId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProduct(productId),
    enabled: enabled && !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, payload }) => updateProduct(productId, payload),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};
