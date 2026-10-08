import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCart, addItem, setQuantity, cartTotals, parseCart } from '../src/lib/cart.ts';

test('storage accepts only known products and whole bounded quantities', () => {
  assert.deepEqual(normalizeCart([{ id: 'everyday-notebook', quantity: 2 }, { id: 'unknown', quantity: 1 }, { id: 'pocket-journal', quantity: -2 }, { id: 'blank-sketchbook', quantity: 1.5 }]), [{ id: 'everyday-notebook', quantity: 2 }]);
  assert.deepEqual(parseCart('{broken'), []);
  assert.deepEqual(parseCart('{"id":"everyday-notebook","quantity":9}'), []);
  assert.deepEqual(parseCart('[{"id":"everyday-notebook","quantity":2,"price":1}]'), [{ id: 'everyday-notebook', quantity: 2 }]);
});

test('adding an existing item combines quantities up to the per-item limit', () => {
  assert.deepEqual(addItem([{ id: 'everyday-notebook', quantity: 8 }], 'everyday-notebook', 4), [{ id: 'everyday-notebook', quantity: 10 }]);
});

test('quantity zero removes an item and invalid values preserve the existing cart', () => {
  const cart = [{ id: 'everyday-notebook', quantity: 2 }];
  assert.deepEqual(setQuantity(cart, 'everyday-notebook', 0), []);
  assert.deepEqual(setQuantity(cart, 'everyday-notebook', -1), cart);
  assert.deepEqual(setQuantity(cart, 'everyday-notebook', NaN), cart);
});

test('totals use catalog cents and apply standard/express shipping consistently', () => {
  assert.deepEqual(cartTotals([]), { quantity: 0, subtotal: 0, shipping: 0, total: 0 });
  assert.deepEqual(cartTotals([{ id: 'everyday-notebook', quantity: 2 }]), { quantity: 2, subtotal: 3600, shipping: 695, total: 4295 });
  assert.deepEqual(cartTotals([{ id: 'everyday-notebook', quantity: 6 }]), { quantity: 6, subtotal: 10800, shipping: 0, total: 10800 });
  assert.equal(cartTotals([{ id: 'everyday-notebook', quantity: 6 }], 'express').shipping, 1295);
});
