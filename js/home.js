import { renderAdmin, renderUser, renderOrder } from "./../js/ui.js";
import { getProducts } from "./storage.js";
import { generateOrder } from "./utils.js";

const currentUser = getSession();
const productSection = document.getElementById("main-content")
const products = getCachedProducts()

document.addEventListener("DOMContentLoaded", async () => {
  checkSession(currentUser);
  const role = currentUser.role;

  if (role !== "user") {
    renderAdmin();
  } else {
    const savedProducts = await getProducts();
    cacheProducts(savedProducts)
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
    const selectedProduct = products.filter((product) => product.id === productId)
    // generateOrder(selectedProduct)
    // renderOrder(selectedProduct)

    const updatedOrder = generateOrder(selectedProduct);
    renderOrder(updatedOrder);
    
}

productSection.addEventListener("click", (event) =>{
    const product = event.target.closest(".card");
    const productId = product.dataset.productId;
    if (event.target.matches(".btn-light")) {
        console.log("entra")
        console.log(productId)
        addToCart(productId)
    }
})




