import { productById, formatMoney } from '../content/catalog';
import { cartTotals, normalizeCart, type CartLine, type ShippingMethod } from '../lib/cart';

export function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = '') {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}
export function renderSummary(root: HTMLElement, items: CartLine[], method: ShippingMethod) {
  const list = root.querySelector<HTMLElement>('[data-summary-lines]')!;
  list.replaceChildren();
  for (const line of normalizeCart(items)) {
    const product = productById.get(line.id)!;
    const row = element('div', 'summary-product');
    const image = element('img');
    image.src = product.image; image.alt = product.alt; image.width = 64; image.height = 64;
    const copy = element('div');
    copy.append(element('p', '', product.name), element('span', '', `Qty ${line.quantity} · ${formatMoney(product.price)} each`));
    row.append(image, copy, element('span', 'summary-line-price', formatMoney(product.price * line.quantity)));
    list.append(row);
  }
  const totals = cartTotals(items, method);
  root.querySelector('[data-summary-subtotal]')!.textContent = formatMoney(totals.subtotal);
  root.querySelector('[data-summary-shipping]')!.textContent = totals.shipping ? formatMoney(totals.shipping) : 'Free';
  root.querySelector('[data-summary-total]')!.textContent = formatMoney(totals.total);
}
