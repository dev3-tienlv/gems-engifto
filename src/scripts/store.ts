import { productById } from '../content/catalog';
import { addItem, cartTotals, parseCart, normalizeCart, type CartLine } from '../lib/cart';

export const CART_KEY = 'engifto:bag:v1';
export const ORDER_KEY = 'engifto:demo-order:v1';
let memoryCart: CartLine[] = [];
let storageAvailable = true;
export function loadCart(): CartLine[] {
  if (!storageAvailable) return memoryCart;
  try { return parseCart(localStorage.getItem(CART_KEY)); } catch { storageAvailable = false; return memoryCart; }
}
export function saveCart(lines: CartLine[]) {
  memoryCart = normalizeCart(lines);
  let persisted = true;
  try { localStorage.setItem(CART_KEY, JSON.stringify(memoryCart)); storageAvailable = true; }
  catch { storageAvailable = false; persisted = false; showToast('Browser storage is unavailable. Your cart cannot be kept between pages.'); }
  window.dispatchEvent(new Event('engifto:cart'));
  return persisted;
}
let toastTimer: ReturnType<typeof setTimeout>;
export function showToast(message: string) {
  const toast = document.querySelector<HTMLElement>('.store-toast');
  const label = document.querySelector<HTMLElement>('[data-toast-message]');
  if (!toast || !label) return;
  label.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
}
export function initStore() {
  const updateBadge = () => {
    const count = cartTotals(loadCart()).quantity;
    document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach(element => { element.textContent = String(count); element.hidden = count === 0; });
    document.querySelector('[data-cart-link]')?.setAttribute('aria-label', `Shopping cart, ${count} items`);
  };
  updateBadge();
  window.addEventListener('engifto:cart', updateBadge);
  window.addEventListener('storage', event => { if (event.key === CART_KEY || event.key === null) window.dispatchEvent(new Event('engifto:cart')); });
  document.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-add-id]');
    if (!button) return;
    const id = button.dataset.addId!;
    const product = productById.get(id);
    if (!product) return;
    const input = button.closest('[data-product-detail]')?.querySelector<HTMLInputElement>('[name="quantity"]');
    const quantity = input ? Number(input.value) : 1;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) { input?.reportValidity(); return; }
    const cart = loadCart();
    const existing = cart.find(item => item.id === id)?.quantity ?? 0;
    if (saveCart(addItem(cart, id, quantity))) showToast(existing + quantity > 10 ? `${product.name}: cart limited to 10 per item.` : `${product.name} added to your cart.`);
  });
  const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#main-navigation');
  if (menu && nav) {
    menu.hidden = false;
    nav.classList.add('enhanced');
    const setOpen = (open: boolean) => { menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
    menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if ((event.target as Element).closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { const open = menu.getAttribute('aria-expanded') === 'true'; setOpen(false); if (open) menu.focus(); } });
    document.addEventListener('click', event => { if (!nav.contains(event.target as Node) && !menu.contains(event.target as Node)) setOpen(false); });
    matchMedia('(min-width: 768px)').addEventListener('change', () => setOpen(false));
  }
}
