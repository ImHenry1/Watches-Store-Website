// ===== cart.js - Xử lý giỏ hàng =====

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function increaseQty(id) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.quantity += 1;
  saveCart(cart);
  renderCart();
}

function decreaseQty(id) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x" style="font-size:4rem; color:#ccc;"></i>
        <h4 class="mt-3 text-muted">Giỏ hàng đang trống</h4>
        <a href="nam.html" class="btn btn-warning mt-3">Tiếp tục mua sắm</a>
      </div>`;
    document.getElementById('subtotal').textContent = '0 ₫';
    document.getElementById('total').textContent = '0 ₫';
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    html += `
      <div class="card shadow-sm mb-3 p-3">
        <div class="row align-items-center">
          <div class="col-3">
            <img src="${item.image}" class="img-fluid rounded" style="max-height:100px; object-fit:cover;">
          </div>
          <div class="col-5">
            <p class="text-muted small mb-0">${item.brand}</p>
            <h6 class="fw-bold mb-1">${item.name}</h6>
            <p class="text-warning fw-bold mb-0">${item.price.toLocaleString('vi-VN')} ₫</p>
          </div>
          <div class="col-4 text-end">
            <div class="d-flex justify-content-end align-items-center gap-2 mb-2">
              <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQty(${item.id})">-</button>
              <span class="fw-bold">${item.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm" onclick="increaseQty(${item.id})">+</button>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
              <i class="bi bi-trash"></i> Xóa
            </button>
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
  document.getElementById('subtotal').textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
  document.getElementById('total').textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước.');
    return;
  }
  alert('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
  localStorage.removeItem('cart');
  renderCart();
}

document.addEventListener('DOMContentLoaded', function () {
  renderCart();
});