const siteHeader = document.getElementById("site-header");
const mainContentSection = document.getElementById("main-content");
const orderSection = document.getElementById("order");

export function renderAdmin() {
  siteHeader.innerHTML =`
  <nav class="container-fluid navbar bg-white border-bottom px-3">
  <span class="navbar-brand fw-bold text-success">▲ RestorApp Admin</span>
  <div class="d-flex gap-3 align-items-center">
    <a class="text-decoration-none text-dark fw-semibold" href="#">Dashboard</a>
    <a class="text-decoration-none text-muted" href="#">Menu</a>
    <a class="text-decoration-none text-muted" href="#">Users</a>
    <span class="rounded-circle bg-secondary text-white px-2">A</span>
  </div>
</nav>`

mainContentSection.innerHTML = `
<div class="container-fluid py-4">
  <div class="row g-4">

    <!-- LEFT COLUMN -->
    <div class="col-lg-12">

      <!-- STATS -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="card p-3" style="height:100px !important">
            <small class="text-muted">Total Orders</small>
            <h4 class="fw-bold">1,245</h4>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3" style="height:100px !important">
            <small class="text-muted">Pending Orders</small>
            <h4 class="fw-bold">15</h4>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3" style="height:100px !important">
            <small class="text-muted">Today's Revenue</small>
            <h4 class="fw-bold">$3,450</h4>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header bg-white d-flex justify-content-between">
          <strong>Recent Orders</strong>
          <div>
            <button class="btn btn-outline-secondary btn-sm">Filter</button>
            <button class="btn btn-outline-secondary btn-sm">Export</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th class="text-end">Total</th>
              </tr>
            </thead>
            <tbody id="orders-table"></tbody>
          </table>
        </div>
      </div>
    </div>`

      orderSection.innerHTML =`
      <div class="col-lg-12">
      <div class="card" id="order-detail">
        <div class="card-body text-center text-muted">
          Select an order to see details
        </div>
      </div>
    </div>

  </div>
</div>`
}

export function renderUser(products) {
  
  siteHeader.innerHTML = `
    <div class="container-fluid ">
    <a class="navbar-brand" href="#">RestorApp</a>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="./../pages/home.html"><strong>Menu</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="./../pages/orders.html"><strong>My Orders</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="./../pages/profile.html"><strong>Profile</strong></a>
        </li>
        </ul>
        </div>
      </div>`;

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

export function renderUserOrders(orders){
    const orderSection = document.getElementById("orders")

    orders.forEach(order => {
        const output = document.createElement("div");
        output.classList.add("card", "mb-3")
        output.innerHTML = 
        `
            <div
              class="card-body d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>#ORD-${order.id}</strong>
                <div class="text-muted small">${order.date} · ${order.products.length}</div>
              </div>

              <div class="text-end">
                <div class="fw-bold">$${((order.totalOrder)*1.08).toFixed(2)}</div>
                <span class="badge ${getStatusBadge(order.status)}">
                ${order.status}
          </span>
              </div>
            </div>

            <div class="card-footer bg-white d-flex justify-content-end gap-2">
              <button class="btn btn-outline-success btn-sm">
                View Receipt
              </button>
              <button class="btn btn-success btn-sm">Reorder</button>
            </div>
          `

          orderSection.appendChild(output)
    });     
          
}

function getStatusBadge(status) {
  const statusMap = {
    delivered: "bg-success",
    pending: "bg-warning text-dark",
    canceled: "bg-danger"
  };

  return statusMap[status] || "bg-secondary";
}

export function renderProfile(user, orders){
    const profileSection = document.getElementById("user-profile")

    profileSection.innerHTML = 
    `<img
    src="./../assets/user.png"
    class="rounded-circle mb-3"
    style = "height:100px"alt="User"
    />

    <h6 class="fw-bold mb-0">${user.name}</h6>
    <small class="text-muted">${user.email}</small>

    <div class="badge bg-light text-success mt-2">Customer</div>

    <div class="row text-center mt-4">
    <div class="col">
        <div class="bg-light rounded p-2">
        <small class="text-muted">TOTAL ORDERS</small>
        <div class="fw-bold">${orders.length}</div>
        </div>
    </div>
    <div class="col">
        <div class="bg-light rounded p-2">
        <small class="text-muted">LOYALTY PTS</small>
        <div class="fw-bold text-success">450</div>
        </div>
    </div>
    </div>

    <hr />

    <div class="list-group text-start">
    <a href="#" class="list-group-item list-group-item-action">
        Payment Methods
    </a>
    <a href="#" class="list-group-item list-group-item-action">
        Saved Addresses
    </a>
    <a href="#" class="list-group-item list-group-item-action">
        Preferences
    </a>
    </div>`;
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
