// src/hooks/useFarmerOrders.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { farmerApi } from '../lib/farmerApi';

// Query keys
export const farmerOrderKeys = {
  all: ['farmer-orders'],
  lists: () => [...farmerOrderKeys.all, 'list'],
  list: (filters) => [...farmerOrderKeys.lists(), { filters }],
  details: () => [...farmerOrderKeys.all, 'detail'],
  detail: (id) => [...farmerOrderKeys.details(), id],
};

// Main hook for fetching orders
export const useFarmerOrder = (filters = {}) => {
  return useQuery({
    queryKey: farmerOrderKeys.list(filters),
    queryFn: async () => {
      const response = await farmerApi.getOrders();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for updating order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, statusData }) =>
      farmerApi.updateOrderStatus(orderId, statusData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({
        queryKey: farmerOrderKeys.lists(),
      });

      // Update specific order in cache if needed
      if (variables && variables.orderId) {
        queryClient.setQueryData(
          farmerOrderKeys.detail(variables.orderId),
          data
        );
      }
    },
    onError: (error) => {
      console.error('Failed to update order status:', error);
    },
  });
};

// Hook for fetching single order
export const useOrder = (orderId) => {
  return useQuery({
    queryKey: farmerOrderKeys.detail(orderId),
    queryFn: async () => {
      const response = await farmerApi.getOrder(orderId);
      return response.data;
    },
    enabled: !!orderId, // Only fetch if orderId exists
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
