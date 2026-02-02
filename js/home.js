import { renderAdmin, renderUser, renderOrder } from "./../js/ui.js";
import { renderOrdersTable } from "./admin.js";
import { getProducts, saveOrder } from "./storage.js";
import { generateOrder, getDate } from "./utils.js";
import { getCachedOrders } from "./profile.js";

const currentUser = getSession();
const currentUserId = currentUser.id;
const productSection = document.getElementById("main-content");
const products = getCachedProducts();
const confirmOrder = document.getElementById("confirm-order");
let order = {};
const totalOrders = getCachedOrders();

document.addEventListener("DOMContentLoaded", async () => {
  checkSession(currentUser);
  const role = currentUser.role;

  if (role !== "user") {
    renderAdmin();
    renderOrdersTable(totalOrders)
  } else {
    const savedProducts = await getProducts();
    cacheProducts(savedProducts);
    renderUser(savedProducts);
  }
});

function getSession() {
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  return loggedUser;
}

function cacheProducts(productsList) {
  localStorage.setItem("products", JSON.stringify(productsList));
}

function getCachedProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function checkSession(loggedUser) {
  if (!loggedUser) {
    window.location.href = "./../index.html";
  }
}

function addToCart(productId) {
  const selectedProduct = products.filter(
    (product) => product.id === productId,
  );

  const updatedOrder = generateOrder(selectedProduct);
  renderOrder(updatedOrder);
  order = updatedOrder;
}

productSection.addEventListener("click", (event) => {
  const product = event.target.closest(".card");
  const productId = product.dataset.productId;
  if (event.target.matches(".btn-light")) {
    addToCart(productId);
  }
});

confirmOrder.addEventListener("click", async () => {
  if (order.products) {
    order["userId"] = currentUserId;
    order["date"] = getDate();
    order["status"] = "pending";
    await saveOrder(order);
    console.log("order created");
    window.location.href = "./../pages/profile.html";
  }
});
