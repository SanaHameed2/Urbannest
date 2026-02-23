document.addEventListener("DOMContentLoaded", function () {

  const mainGrid = document.getElementById("productGrid");
  const dealsGrid = document.getElementById("dealsGrid");
  const trendingGrid = document.getElementById("trendingGrid");
  const cartCount = document.getElementById("cartCount");

  /* ===============================
     UPDATE CART COUNT
  =============================== */
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  /* ===============================
     CREATE PRODUCT CARD
  =============================== */
  function createCard(product, badgeText = "", badgeClass = "") {

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      ${badgeText ? `<span class="badge ${badgeClass}">${badgeText}</span>` : ""}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">RS.${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    return card;
  }

  /* ===============================
     RENDER PRODUCTS
  =============================== */
  function renderProducts(productsArray, targetGrid, badgeText = "", badgeClass = "") {

    if (!targetGrid) return;

    targetGrid.innerHTML = "";

    productsArray.forEach(product => {
      targetGrid.appendChild(createCard(product, badgeText, badgeClass));
    });
  }

  /* ===============================
     INITIAL LOAD
  =============================== */
  if (typeof products !== "undefined") {

    // Main section
    renderProducts(products, mainGrid);

    // Deals (first 4)
    const deals = products.slice(0, 4);
    renderProducts(deals, dealsGrid, "Deal", "deal");

    // Trending
    const trending = products.filter(p => p.isTrending);
    renderProducts(trending, trendingGrid, "Trending", "trending");
  }

  /* ===============================
     ADD TO CART
  =============================== */
  document.addEventListener("click", function (e) {

    if (e.target.classList.contains("add-to-cart")) {

      const id = parseInt(e.target.dataset.id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const product = products.find(p => p.id === id);

      if (!product) return;

      const existingItem = cart.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      e.target.textContent = "Added ✓";
      e.target.disabled = true;

      setTimeout(() => {
        e.target.textContent = "Add to Cart";
        e.target.disabled = false;
      }, 1000);
    }
  });

  /* ===============================
     CATEGORY FILTER
  =============================== */
  window.filterProductsByCategory = function (category) {

    if (!mainGrid) return;

    if (category === "all") {
      renderProducts(products, mainGrid);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered, mainGrid);
    }
  };

  updateCartCount();

});