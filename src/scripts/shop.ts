import { products, categories } from '../content/catalog';

export function initShop() {
  const form = document.querySelector<HTMLFormElement>('[data-shop-filters]')!;
  const search = document.querySelector<HTMLInputElement>('#search')!;
  const sort = document.querySelector<HTMLSelectElement>('#sort')!;
  const grid = document.querySelector<HTMLElement>('[data-shop-grid]')!;
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-product-card]')];
  let category = 'all';
  const apply = (updateUrl = true) => {
    const query = search.value.trim().toLowerCase();
    const visible = cards.filter(card => (category === 'all' || card.dataset.category === category) && card.dataset.name!.includes(query));
    const sortType = sort.value;
    const ordered = [...cards].sort((a, b) => {
      if (sortType === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
      if (sortType === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
      if (sortType === 'name') return a.dataset.name!.localeCompare(b.dataset.name!);
      if (sortType === 'newest') return Number(products.find(p => p.name.toLowerCase() === b.dataset.name)?.badge === 'New') - Number(products.find(p => p.name.toLowerCase() === a.dataset.name)?.badge === 'New');
      return cards.indexOf(a) - cards.indexOf(b);
    });
    ordered.forEach(card => { card.hidden = !visible.includes(card); grid.append(card); });
    document.querySelectorAll<HTMLElement>('[data-filter]').forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    document.querySelector('[data-results-count]')!.textContent = `${visible.length} ${visible.length === 1 ? 'essential' : 'essentials'}`;
    document.querySelector<HTMLElement>('[data-no-results]')!.hidden = visible.length > 0;
    if (updateUrl) {
      const url = new URL(location.href);
      if (category !== 'all') url.searchParams.set('category', category); else url.searchParams.delete('category');
      if (query) url.searchParams.set('q', search.value.trim()); else url.searchParams.delete('q');
      if (sortType !== 'featured') url.searchParams.set('sort', sortType); else url.searchParams.delete('sort');
      history.replaceState(null, '', url);
    }
  };
  const restore = () => {
    const params = new URLSearchParams(location.search);
    const selected = params.get('category');
    category = categories.some(item => item.id === selected) ? selected! : 'all';
    search.value = (params.get('q') ?? '').slice(0, 100);
    sort.value = [...sort.options].some(option => option.value === params.get('sort')) ? params.get('sort')! : 'featured';
    apply(false);
  };
  restore();
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  search.addEventListener('input', () => apply());
  sort.addEventListener('change', () => apply());
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter!; apply(); }));
  document.querySelector('[data-reset-filters]')?.addEventListener('click', () => { category = 'all'; search.value = ''; sort.value = 'featured'; apply(); search.focus(); });
  window.addEventListener('popstate', restore);
}
