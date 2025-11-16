// Products
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Wireless Headphones", price: 1499, image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg" },
  { id: 2, name: "Smart Watch", price: 2999, image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg" }
];

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Users
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Display products
function displayProducts(list = products) {
  productList.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}
displayProducts();

// Add to cart
function addToCart(id) {
  if(!currentUser){
    alert("Please login to add items to cart.");
    toggleLoginModal();
    return;
  }
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  updateCartUI();
}

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <strong>${item.name}</strong>
        <p>₹${item.price}</p>
      </div>
      <div class="qty">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = `Total: ₹${total}`;
  saveCart();
}
updateCartUI();

// Change quantity
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

// Toggle cart
function toggleCart() {
  cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if(!currentUser){
    alert("Please login first!");
    toggleLoginModal();
    return;
  }
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }
  alert("Thank you for shopping! Your order is placed.");
  cart = [];
  updateCartUI();
  toggleCart();
});

// Search
document.getElementById("searchInput").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

// --- Login/Register ---
function toggleLoginModal() {
  document.getElementById("loginModal").style.display =
    document.getElementById("loginModal").style.display === "flex" ? "none" : "flex";
}
function toggleRegisterModal() {
  document.getElementById("registerModal").style.display =
    document.getElementById("registerModal").style.display === "flex" ? "none" : "flex";
}
function showRegister() {
  toggleLoginModal();
  toggleRegisterModal();
}
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.username === username && u.password === password);
  if(user){
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert("Login successful!");
    toggleLoginModal();
  } else {
    alert("Invalid login!");
  }
}
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  if(users.find(u => u.username === username)){
    alert("Username already exists!");
    return;
  }
  const user = { username, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  toggleRegisterModal();
}
