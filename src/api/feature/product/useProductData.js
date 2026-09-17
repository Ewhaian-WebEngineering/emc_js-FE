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

export const useProductDetail = (
  productId,
  boothId,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: ['product-detail', productId, boothId],
    queryFn: () => getProduct(productId, boothId),
    enabled: enabled && !!productId,
  });
};

export const useCreateProduct = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createProduct(payload, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useUpdateProduct = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, payload }) =>
      updateProduct(productId, payload, boothId),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId],
      });
    },
  });
};

export const useDeleteProduct = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => deleteProduct(productId, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useProductGroupList = (boothId) => {
  return useQuery({
    queryKey: ['product-groups', boothId],
    queryFn: () => getProductGroups(boothId),
    enabled: !!boothId,
  });
};

export const useCreateProductGroup = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createProductGroup(payload, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useUpdateProductGroup = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, payload }) =>
      updateProductGroup(groupId, payload, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useDeleteProductGroup = (boothId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId) => deleteProductGroup(groupId, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};
