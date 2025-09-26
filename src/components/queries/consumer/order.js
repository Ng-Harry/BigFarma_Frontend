import {
  getOrderByIdHandler,
  getOrderIssuesHandler,
  getOrdersHandler,
  getOrderTimelineHandler,
} from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useConsumerOrders = ({ status, search } = {}) =>
  useQuery({
    queryKey: ["consumer-orders", { status, search }],
    queryFn: () => getOrdersHandler({ status, search }),
  });

export const useConsumerOrderById = (order_id) =>
  useQuery({
    queryKey: ["consumer-orders", order_id],
    queryFn: () => getOrderByIdHandler(order_id),
    enabled: !!order_id,
  });

export const useConsumerOrderTimeline = (order_id) =>
  useQuery({
    queryKey: ["consumer-order-timeline", order_id, "timeline"],
    queryFn: () => getOrderTimelineHandler(order_id),
    enabled: !!order_id,
  });

export const useConsumerOrderIssues = (order_id) =>
  useQuery({
    queryKey: ["consumer-order-issues", order_id, "issues"],
    queryFn: () => getOrderIssuesHandler(order_id),
    enabled: !!order_id,
  });
