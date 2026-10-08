import { normalizeCart, type CartLine, type ShippingMethod } from './cart.ts';
export interface DemoOrder { items: CartLine[]; method: ShippingMethod; reference: string; createdAt: string; }
export function parseOrder(raw: string | null): DemoOrder | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || typeof value !== 'object' || !['standard', 'express'].includes(value.method) || typeof value.reference !== 'string' || !/^ENG-[A-F0-9]{8}$/.test(value.reference) || typeof value.createdAt !== 'string' || !Number.isFinite(Date.parse(value.createdAt))) return null;
    const items = normalizeCart(value.items);
    return items.length ? { items, method: value.method, reference: value.reference, createdAt: value.createdAt } : null;
  } catch { return null; }
}
