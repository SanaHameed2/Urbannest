document.addEventListener("DOMContentLoaded", function () {

  const mainGrid = document.getElementById("productGrid");
  const dealsGrid = document.getElementById("dealsGrid");
  const trendingGrid = document.getElementById("trendingGrid");
  const cartCount = document.getElementById("cartCount");

  /* ===============================
     CART COUNT UPDATE
  =============================== */
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;

      // Small animation effect
      cartCount.classList.add("bump");
      setTimeout(() => {
        cartCount.classList.remove("bump");
      }, 300);
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
  function renderProducts(productsToRender, targetGrid, badgeText = "", badgeClass = "") {
    if (!targetGrid) return;

    targetGrid.innerHTML = "";

    productsToRender.forEach(product => {
      targetGrid.appendChild(createCard(product, badgeText, badgeClass));
    });
  }

  /* ===============================
     INITIAL PRODUCT LOAD
  =============================== */
  if (typeof products !== "undefined") {

    renderProducts(products, mainGrid);

    const deals = products.slice(0, 4);
    renderProducts(deals, dealsGrid, "Deal", "deal");

    const trending = products.filter(p => p.isTrending);
    renderProducts(trending, trendingGrid, "Trending", "trending");
  }

  /* ===============================
     ADD TO CART (EVENT DELEGATION)
  =============================== */
  document.addEventListener("click", function (e) {

    if (e.target.classList.contains("add-to-cart")) {

      const button = e.target;
      const id = parseInt(button.dataset.id);

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

      // UX feedback instead of alert
      button.textContent = "Added ✓";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false;
      }, 1200);
    }

  });

  /* ===============================
     CATEGORY FILTER
  =============================== */
  window.filterProductsByCategory = function (category) {

    if (typeof products === "undefined") return;

    if (category === "all") {
      renderProducts(products, mainGrid);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered, mainGrid);
    }
  };

  /* ===============================
     INITIAL CART COUNT LOAD
  =============================== */
  updateCartCount();

});