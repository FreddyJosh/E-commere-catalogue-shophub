// Admin Product Management
let products = JSON.parse(localStorage.getItem("products")) || [];
const existingProductsDiv = document.getElementById("existing-products");

function displayProductsAdmin() {
  existingProductsDiv.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>
        <strong>${p.name}</strong> - ₹${p.price}
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </p>
    `;
    existingProductsDiv.appendChild(div);
  });
}
displayProductsAdmin();

function addProduct() {
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const image = document.getElementById("prodImage").value;
  if(!name || !price || !image){
    alert("All fields required!");
    return;
  }
  const id = products.length ? products[products.length-1].id + 1 : 1;
  products.push({id, name, price, image});
  localStorage.setItem("products", JSON.stringify(products));
  displayProductsAdmin();
  alert("Product added!");
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  const name = prompt("Edit Name:", product.name);
  const price = prompt("Edit Price:", product.price);
  const image = prompt("Edit Image URL:", product.image);
  if(name && price && image){
    product.name = name;
    product.price = parseFloat(price);
    product.image = image;
    localStorage.setItem("products", JSON.stringify(products));
    displayProductsAdmin();
    alert("Product updated!");
  }
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  displayProductsAdmin();
}
