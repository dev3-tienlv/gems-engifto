import { cartTotals, type ShippingMethod } from '../lib/cart';
import { parseOrder } from '../lib/order';
import { formatMoney } from '../content/catalog';
import { loadCart, saveCart, ORDER_KEY } from './store';
import { renderSummary } from './summary';

export function initCheckout() {
  const form = document.querySelector<HTMLFormElement>('[data-checkout-form]')!;
  const content = document.querySelector<HTMLElement>('[data-checkout-content]')!;
  const error = document.querySelector<HTMLElement>('[data-checkout-error]')!;
  const method = () => form.querySelector<HTMLInputElement>('[name="shipping"]:checked')!.value as ShippingMethod;
  const render = () => {
    const cart = loadCart();
    content.hidden = !cart.length;
    document.querySelector<HTMLElement>('[data-checkout-empty]')!.hidden = cart.length > 0;
    renderSummary(content, cart, method());
    const standard = cartTotals(cart).shipping;
    form.querySelector('[data-standard-cost]')!.textContent = standard ? formatMoney(standard) : 'Free';
    form.querySelector('[data-checkout-total]')!.textContent = formatMoney(cartTotals(cart, method()).total);
  };
  render(); window.addEventListener('engifto:cart', render);
  form.addEventListener('change', render);
  form.addEventListener('input', event => { const input = event.target as HTMLInputElement; if (typeof input.setCustomValidity === 'function') input.setCustomValidity(''); error.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const cart = loadCart(); if (!cart.length) { render(); return; }
    form.querySelectorAll<HTMLInputElement>('input[required]').forEach(input => {
      input.value = input.value.trim();
      input.setCustomValidity(input.value ? '' : 'Please complete this field.');
    });
    if (!form.reportValidity()) { error.textContent = 'Please check the highlighted field to continue.'; error.hidden = false; return; }
    const order = { items: cart, method: method(), reference: `ENG-${crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()}`, createdAt: new Date().toISOString() };
    let stored = false;
    try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); stored = true; } catch { /* Keep confirmation in this page when storage is blocked. */ }
    form.reset(); saveCart([]);
    if (stored) location.assign('/order-confirmation');
    else {
      content.hidden = true; document.querySelector<HTMLElement>('[data-checkout-empty]')!.hidden = true;
      const confirmation = document.querySelector<HTMLElement>('[data-inline-confirmation]')!; confirmation.hidden = false; confirmation.focus();
    }
  });
}
export function initConfirmation() {
  let order = null;
  try { order = parseOrder(sessionStorage.getItem(ORDER_KEY)); } catch { /* No stored summary. */ }
  if (!order) return;
  document.querySelector<HTMLElement>('[data-no-order]')!.hidden = true;
  const content = document.querySelector<HTMLElement>('[data-confirmation]')!; content.hidden = false;
  content.querySelector('[data-order-reference]')!.textContent = order.reference;
  content.querySelector('[data-order-method]')!.textContent = order.method === 'express' ? 'Express' : 'Standard';
  renderSummary(content, order.items, order.method);
}
