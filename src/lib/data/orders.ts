import { Order } from '@/types';

// In-memory persistent order repository for active session
export const ordersStore: Record<string, Order> = {};

export function saveOrder(order: Order) {
  ordersStore[order.order_number] = order;
  ordersStore[order.id] = order;
}

export function getOrder(idOrNumber: string): Order | undefined {
  return ordersStore[idOrNumber];
}
