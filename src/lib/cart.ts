import { productById } from '../content/catalog.ts';

export interface CartLine { id: string; quantity: number; }
export type ShippingMethod = 'standard' | 'express';
export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 10000;

/** Browser storage is untrusted. Discard unknown IDs and invalid quantities. */
export function normalizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const item of value.slice(0, 100)) {
    if (!item || typeof item !== 'object') continue;
    const { id, quantity } = item;
    if (typeof id !== 'string' || !productById.has(id) || !Number.isSafeInteger(quantity) || quantity < 1) continue;
    quantities.set(id, Math.min(MAX_QUANTITY, (quantities.get(id) ?? 0) + quantity));
  }
  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
}
export function parseCart(value: string | null): CartLine[] {
  try { return normalizeCart(JSON.parse(value ?? '[]')); } catch { return []; }
}
export function addItem(cart: CartLine[], id: string, quantity = 1): CartLine[] {
  return normalizeCart([...cart, { id, quantity }]);
}
export function setQuantity(cart: CartLine[], id: string, quantity: number): CartLine[] {
  const current = normalizeCart(cart);
  if (!Number.isSafeInteger(quantity) || quantity < 0) return current;
  return normalizeCart(current.map(item => item.id === id ? { ...item, quantity } : item));
}
export function cartTotals(cart: CartLine[], method: ShippingMethod = 'standard') {
  const lines = normalizeCart(cart);
  const quantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = lines.reduce((sum, item) => sum + productById.get(item.id)!.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : method === 'express' ? 1295 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 695;
  return { quantity, subtotal, shipping, total: subtotal + shipping };
}
