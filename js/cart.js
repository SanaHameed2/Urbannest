document.addEventListener("DOMContentLoaded", function () {

  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* ===============================
     UPDATE NAVBAR COUNT
  =============================== */
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  /* ===============================
     SAVE CART
  =============================== */
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* ===============================
     REMOVE ITEM
  =============================== */
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
  }

  /* ===============================
     CHANGE QUANTITY
  =============================== */
  function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }

    saveCart();
    updateCart();
  }

  /* ===============================
     UPDATE CART UI
  =============================== */
  function updateCart() {

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      if (cartTotal) cartTotal.textContent = "";
      updateCartCount();
      return;
    }

    let total = 0;

    cart.forEach(item => {

      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>RS.${item.price}</p>
        </div>

        <div class="cart-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(div);
    });

    if (cartTotal) {
      cartTotal.textContent = "Total: RS." + total;
    }

    updateCartCount();
  }

  /* ===============================
     EVENT DELEGATION
  =============================== */
  document.addEventListener("click", function (e) {

    const id = parseInt(e.target.dataset.id);

    if (e.target.classList.contains("increase")) {
      changeQuantity(id, 1);
    }

    if (e.target.classList.contains("decrease")) {
      changeQuantity(id, -1);
    }

    if (e.target.classList.contains("remove")) {
      removeFromCart(id);
    }

  });

  /* ===============================
     INITIAL LOAD
  =============================== */
  updateCart();

});