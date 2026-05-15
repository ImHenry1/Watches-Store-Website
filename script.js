// ===== script.js - Dùng chung cho nam.html, nu.html =====

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, brand, name, price, image) {
  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, brand, name, price, image, quantity: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  alert('✅ Đã thêm: ' + name);
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.badge.bg-danger');
  if (badge) badge.textContent = total;
}

document.addEventListener('DOMContentLoaded', function () {
  updateCartBadge();
});