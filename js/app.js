document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("productGrid");

  if (!grid) return; 

  // Function to render products
  function renderProducts(productsToRender) {
    grid.innerHTML = ""; 
    productsToRender.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">RS.${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;

      grid.appendChild(card);
    });
  }

  // Initial render (all products)
  renderProducts(products);

  // Placeholder: handle Add to Cart clicks
  grid.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.dataset.id;
      const selectedProduct = products.find(p => p.id == id);
      console.log("Add to cart:", selectedProduct);
    }
  });

  // Optional filter 
  window.filterProductsByCategory = function(category) {
    if (category === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  };
});
