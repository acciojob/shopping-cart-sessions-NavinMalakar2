// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart array (load from sessionStorage if available)
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// -------------------
// Render product list
// -------------------
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners for buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    });
  });
}

// -------------------
// Render cart list
// -------------------
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add remove event listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    });
  });
}

// -------------------
// Add item to cart
// -------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
}

// -------------------
// Remove item from cart
// -------------------
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

// -------------------
// Clear cart
// -------------------
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// -------------------
// Save cart in sessionStorage
// -------------------
function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------
// Event Listeners
// -------------------
clearCartBtn.addEventListener("click", clearCart);

// -------------------
// Initial render
// -------------------
renderProducts();
renderCart();
