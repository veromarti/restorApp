export function renderAdmin() {
  alert("admin");
}

export function renderUser(products) {
  console.log(products);
  const mainContentSection = document.getElementById("main-content");

  const titleSection = document.createElement("div");
  titleSection.classList.add("row");
  titleSection.innerHTML = `<section class="col-12 col-lg-7">
                                <h2 class="fw-bold mb-3">Our Menu</h2>
                            </section>
                            <section class="col-12 col-lg-5 ">
                                <div class="input-group" style="max-width: 100%">
                                    <span class="input-group-text bg-white border-end-0">🔍</span>
                                    <input
                                        class="form-control border-start-0"
                                        placeholder="Search food..."
                                    />
                                </div>
                            </section>`;

  const filterSection = document.createElement("div");
  filterSection.classList.add("row");
  filterSection.innerHTML = `<section section class="col-12 my-2"">
                                <div class="btn-group gap-2">
                                    <button class="btn btn-dark rounded-pill px-4">All</button>
                                    <button class="btn btn-outline-secondary rounded-pill px-4">
                                        🍔 Burgers
                                    </button>
                                    <button class="btn btn-outline-secondary rounded-pill px-4">
                                        🍟 Sides
                                    </button>
                                    <button class="btn btn-outline-secondary rounded-pill px-4">
                                        🥤 Drinks
                                    </button>
                                </div>
                            </section>`;

  const productSection = document.createElement("div");
  productSection.classList.add("row", "g-3");

  products.forEach((product) => {
    const productCard = document.createElement("section");
    productCard.classList.add("col-12", "col-sm-6", "col-md-6", "col-lg-4");
    productCard.innerHTML = 
    `<article class="card h-100 shadow-sm rounded-4">
        <img
            src=${product.img}
            class="card-img-top rounded-top-4"
        />

        <div class="card-body d-flex flex-column">
            <span class="badge mb-2 align-self-start product-category"
                >${product.category}</span
            >
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold">${product.name}</h5>
                <span class="fw-bold text-success">$${product.price}</span>
            </div>

            <p class="text-muted flex-grow-1">
                ${product.description}
            </p>

            <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-light w-100 rounded-pill">
                🛒 Add to order
                </button>
            </div>
        </div>

    </article>`;
    productSection.appendChild(productCard);
  });

  mainContentSection.appendChild(titleSection);
  mainContentSection.appendChild(filterSection);
  mainContentSection.appendChild(productSection);

  const sideSection = document.getElementById("side-content");
  const orderSection = document.createElement("article");
  orderSection.classList.add("d-flex", "w-100", "align-items-center", "px-1","mb-3");

  orderSection.innerHTML = `<img src="https://picsum.photos/60" class="rounded-3 me-2" />

                  <div class="flex-grow-1">
                    <strong>Classic Beef Burger</strong>
                    <div class="d-flex justify-content-between"> 
                        <p class="small text-muted mb-1">No onions</p>
                        <span class="fw-bold">$8.99</span>
                    </div>
                    

                    <div class="d-flex align-items-center gap-2">
                      <button class="btn btn-sm btn-light">−</button>
                      <span>1</span>
                      <button class="btn btn-sm btn-light">+</button>
                      <small class="text-danger ms-2">Remove</small>
                    </div>
                  </div>

                  `;

  sideSection.appendChild(orderSection)
}
