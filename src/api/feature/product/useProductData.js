import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  createProductGroup,
  deleteProduct,
  deleteProductGroup,
  getProduct,
  getProductGroups,
  updateProduct,
  updateProductGroup,
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

export const useProductGroupList = () => {
  return useQuery({
    queryKey: ['product-groups'],
    queryFn: getProductGroups,
  });
};

export const useCreateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useUpdateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, payload }) => updateProductGroup(groupId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useDeleteProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};
