document.addEventListener("DOMContentLoaded", function () {
  const mainGrid = document.getElementById("productGrid");
  const dealsGrid = document.getElementById("dealsGrid");
  const trendingGrid = document.getElementById("trendingGrid");

  function createCard(product, badgeText = "", badgeClass = "") {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      ${badgeText ? `<span class="badge ${badgeClass}">${badgeText}</span>` : ""}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">RS.${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
  }

  function renderProducts(productsToRender, targetGrid, badgeText = "", badgeClass = "") {
    targetGrid.innerHTML = "";
    productsToRender.forEach(product => {
      targetGrid.appendChild(createCard(product, badgeText, badgeClass));
    });
  }

  renderProducts(products, mainGrid);

  const deals = products.slice(0, 4);
  renderProducts(deals, dealsGrid, "Deal", "deal");

  const trending = products.filter(p => p.isTrending);
  renderProducts(trending, trendingGrid, "Trending", "trending");

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.dataset.id;
      const selectedProduct = products.find(p => p.id == id);
      console.log("Add to cart:", selectedProduct);
    }
  });

  window.filterProductsByCategory = function (category) {
    if (category === "all") {
      renderProducts(products, mainGrid);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered, mainGrid);
    }
  };
});
