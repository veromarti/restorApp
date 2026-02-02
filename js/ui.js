export function renderAdmin() {
  alert("admin");
}

export function renderUser(products) {
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

    productCard.innerHTML = `<article class="card h-100 shadow-sm rounded-4" data-product-id=${product.id}>
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
}

let totalProducts = 0;

export function renderOrder(order) {
  console.log(order);
  totalProducts++;

  const sideSection = document.getElementById("side-content");
  const orderSection = document.getElementById("order");
  sideSection.innerHTML = "";

  let subtotal = 0;

  order.products.forEach((product) => {
    const orderedProduct = document.createElement("article");
    orderedProduct.classList.add(
      "d-flex",
      "w-100",
      "align-items-center",
      "px-1",
      "mb-3",
    );

    orderedProduct.innerHTML = `
      <img src="${product.img}" class="rounded-3 me-2" />

      <div class="flex-grow-1">
        <strong>${product.name}</strong>

        <div class="d-flex justify-content-end">
          <span class="fw-bold">$${product.total.toFixed(2)}</span>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-light">−</button>
          <span>${product.quantity}</span>
          <button class="btn btn-sm btn-light">+</button>
          <button class="btn btn-sm btn-light text-danger ms-2">Remove</button>
        </div>
      </div>
    `;

    sideSection.appendChild(orderedProduct);
    subtotal += product.total;
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);

  orderSection.querySelector("header>h5>span").innerHTML = totalProducts;
}

// export function renderOrder(product) {
//   totalProducts++;

//   const orderSection = document.getElementById("order");
//   const sideSection = document.getElementById("side-content");
//   const orderedProduct = document.createElement("article");
//   orderedProduct.classList.add("d-flex","w-100","align-items-center","px-1","mb-3");

//   orderedProduct.innerHTML =
//   `<img src=${product[0].img} class="rounded-3 me-2" />

//     <div class="flex-grow-1">
//         <strong>${product[0].name}</strong>
//         <div class="d-flex justify-content-end">
//             <span class="fw-bold">$${product[0].price}</span>
//         </div>

//         <div class="d-flex align-items-center gap-2">
//         <button class="btn btn-sm btn-light">−</button>
//         <span>1</span>
//         <button class="btn btn-sm btn-light">+</button>
//         <button class="btn btn-sm btn-light text-danger ms-2">Remove</button>
//         </div>
//     </div>`;

//   sideSection.appendChild(orderedProduct);

//   const subtotalElement = document.getElementById("subtotal");
//   const taxElement = document.getElementById("tax");
//   const totalElement = document.getElementById("total");

//   orderSection.querySelector("header>h5>span").innerHTML = totalProducts;

//   subtotal += product[0].price;
//   tax += (subtotal*0.08);
//   total = (subtotal + tax)

//   subtotalElement.textContent = `${subtotal.toFixed(2)}`;
//   taxElement.textContent = `${tax.toFixed(2)}`;
//   totalElement.textContent = `${total.toFixed(2)}`;

// }
