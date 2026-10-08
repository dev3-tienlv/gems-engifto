import { parseCart, normalizeCart, type CartLine } from '../lib/cart';

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
