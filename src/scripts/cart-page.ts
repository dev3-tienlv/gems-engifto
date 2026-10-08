import { productById, formatMoney } from '../content/catalog';
import { cartTotals, setQuantity, FREE_SHIPPING_THRESHOLD, MAX_QUANTITY } from '../lib/cart';
import { loadCart, saveCart, showToast } from './store';
import { element } from './summary';

export function initCart() {
  const list = document.querySelector<HTMLElement>('[data-cart-lines]')!;
  const render = () => {
    const cart = loadCart();
    document.querySelector<HTMLElement>('[data-cart-empty]')!.hidden = cart.length > 0;
    document.querySelector<HTMLElement>('[data-cart-content]')!.hidden = cart.length === 0;
    const focus = document.activeElement as HTMLElement | null;
    const focusKey = focus?.dataset.focusKey;
    const previousIndex = focus ? [...list.children].indexOf(focus.closest('.cart-line')!) : -1;
    list.replaceChildren();
    for (const line of cart) {
      const product = productById.get(line.id)!;
      const row = element('article', 'cart-line');
      const link = element('a', 'cart-line-image'); link.href = `/products/${line.id}`;
      const image = element('img'); image.src = product.image; image.alt = product.alt; image.width = 112; image.height = 112; link.append(image);
      const copy = element('div', 'cart-line-copy');
      const title = element('a'); title.href = link.href; title.append(element('h2', '', product.name));
      copy.append(title, element('p', 'cart-unit-price', `${formatMoney(product.price)} each`));
      const controls = element('div', 'cart-line-controls');
      const quantity = element('div', 'quantity-control');
      const input = element('input'); input.type = 'number'; input.min = '1'; input.max = String(MAX_QUANTITY); input.step = '1'; input.value = String(line.quantity);
      input.setAttribute('aria-label', `Quantity for ${product.name}`); input.dataset.focusKey = `${line.id}:input`;
      const update = (value: number) => {
        if (!Number.isSafeInteger(value) || value < 1 || value > MAX_QUANTITY) { input.reportValidity(); input.value = String(line.quantity); return; }
        saveCart(setQuantity(loadCart(), line.id, value));
      };
      for (const step of [-1, 1]) {
        const button = element('button', '', step < 0 ? '−' : '+'); button.type = 'button';
        button.setAttribute('aria-label', `${step < 0 ? 'Decrease' : 'Increase'} ${product.name} quantity`);
        button.dataset.focusKey = `${line.id}:${step}`;
        button.disabled = step < 0 ? line.quantity === 1 : line.quantity === MAX_QUANTITY;
        button.addEventListener('click', () => update(line.quantity + step));
        quantity.append(button); if (step < 0) quantity.append(input);
      }
      input.addEventListener('change', () => update(Number(input.value)));
      const remove = element('button', 'remove-item', 'Remove'); remove.type = 'button'; remove.setAttribute('aria-label', `Remove ${product.name}`); remove.dataset.focusKey = `${line.id}:remove`;
      remove.addEventListener('click', () => { saveCart(setQuantity(loadCart(), line.id, 0)); showToast(`${product.name} removed from your cart.`); });
      controls.append(quantity, remove); copy.append(controls);
      row.append(link, copy, element('p', 'cart-line-total', formatMoney(product.price * line.quantity))); list.append(row);
    }
    if (focusKey) {
      const next = [...list.querySelectorAll<HTMLElement>('[data-focus-key]')].find(node => node.dataset.focusKey === focusKey);
      (next ?? list.children[Math.min(previousIndex, list.children.length - 1)]?.querySelector<HTMLElement>('a') ?? document.querySelector<HTMLElement>('[data-cart-empty] a'))?.focus();
    }
    const totals = cartTotals(cart);
    document.querySelector('[data-cart-subtotal]')!.textContent = formatMoney(totals.subtotal);
    document.querySelector('[data-cart-shipping]')!.textContent = totals.shipping ? formatMoney(totals.shipping) : 'Free';
    document.querySelector('[data-cart-total]')!.textContent = formatMoney(totals.total);
    document.querySelector('[data-shipping-progress]')!.textContent = totals.subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free standard shipping unlocked.' : `${formatMoney(FREE_SHIPPING_THRESHOLD - totals.subtotal)} away from free standard shipping.`;
    document.querySelector<HTMLProgressElement>('[data-shipping-meter]')!.value = Math.min(FREE_SHIPPING_THRESHOLD, totals.subtotal);
  };
  render(); window.addEventListener('engifto:cart', render);
}
