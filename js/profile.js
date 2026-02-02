import { getOrders } from "./storage.js";
import { getOrdersByUser } from "./utils.js";
import { renderProfile, renderUserOrders } from "./ui.js";

const currentUser = getSession();
let currentUserId = null

if (currentUser) {
    currentUserId = currentUser.id;
}

const orders = getCachedOrders();

document.addEventListener("DOMContentLoaded", async () => {
  checkSession(currentUser);
  const role = currentUser.role;

  if (role === "user") {
    const savedOrders = await getOrders();
    const userOrders = getOrdersByUser(savedOrders, currentUserId);
    console.log(userOrders);

    cacheOrders(userOrders);
    renderProfile(currentUser,userOrders);
    renderUserOrders(userOrders)
  } 
});

function getSession() {
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  return loggedUser;
}

function cacheOrders(ordersList) {
  localStorage.setItem("orders", JSON.stringify(ordersList));
}

export function getCachedOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}

function checkSession(loggedUser) {
  if (!loggedUser) {
    window.location.href = "./../index.html";
  }
}