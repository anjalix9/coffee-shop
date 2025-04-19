// Coffee Menu Items
const menu = [
  { name: "Espresso", price: "₹150", type: "Espresso", image: "images.jpg" },
  { name: "Americano", price: "₹180", type: "Black", image: "xyz.jpg" },
  { name: "Cappuccino", price: "₹200", type: "Milk", image: "cappuccino-exc.webp" },
  { name: "Latte", price: "₹220", type: "Milk", image: "Latte.jpg" },
  { name: "Macchiato", price: "₹210", type: "Espresso", image: "macchiato.jpg" },
  { name: "Mocha", price: "₹230", type: "Milk", image: "mocha.jpg" },
  { name: "Flat White", price: "₹190", type: "Milk", image: "Flat White.jpg" },
  { name: "Irish Coffee", price: "₹250", type: " NON-Alcoholic", image: "Irish Coffee.JPG" },
  { name: "Cold Brew", price: "₹200", type: "Cold", image: "Cold Brew.jpg" }
];

const menuContainer = document.getElementById("menu");
let cart = [];

menu.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <div class="content">
    <h3>${item.name}</h3>
    <p>${item.type}</p>
    <p>${item.price}</p>
  </div>
  <button onclick="addToCart(item)">Add to Cart</button>
`;


  card.querySelector("button").onclick = () => addToCart(item);
  menuContainer.appendChild(card);
});

function addToCart(item) {
  cart.push(item);
  updateCart();
  showCustomerForm();
}

function updateCart() {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="bg-white p-2 rounded shadow flex justify-between items-center">
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeFromCart(${index})" class="text-red-600 font-bold hover:underline">X</button>
      </div>
    `;
    cartList.appendChild(li);
    total += parseInt(item.price.replace("₹", ""));
  });

  cartTotal.innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function showCustomerForm() {
  const container = document.getElementById("customerFormContainer");

  if (!container || container.innerHTML !== "") return;

  container.className = "mt-6 bg-white p-4 rounded shadow-md";

  container.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Customer Details</h3>
    <label class="block mb-2">Name: 
      <input type="text" id="custName" class="border rounded w-full px-2 py-1" required>
    </label>
    <label class="block mb-2">Mobile Number: 
      <input type="text" id="custMobile" maxlength="10" pattern="\\d{10}" class="border rounded w-full px-2 py-1" required>
    </label>
    <label class="block mb-4">Table Number: 
      <input type="number" id="custTable" class="border rounded w-full px-2 py-1" required>
    </label>
    <button onclick="processPayment()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Proceed to Pay
    </button>
  `;
}


function processPayment() {
  const name = document.getElementById("custName").value.trim();
  const mobile = document.getElementById("custMobile").value.trim();
  const table = document.getElementById("custTable").value.trim();

  if (!name || !mobile || !table) {
    alert("Please fill in all customer details.");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile number must be exactly 10 digits.");
    return;
  }

  alert(`Thank you, ${name}! Your order is being processed. Table ${table} is reserved.`);
  document.getElementById("customerFormContainer").innerHTML = "";
  cart = [];
  updateCart();
}

