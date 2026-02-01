import { renderAdmin, renderUser } from "./../js/ui.js";
import { getProducts } from "./storage.js";

const currentUser = getSession();

document.addEventListener("DOMContentLoaded", async () => {
  checkSession(currentUser);
  const role = currentUser.role;
  console.log(role);

  if (role !== "user") {
    renderAdmin();
  } else {
    const products = await getProducts();
    renderUser(products);
  }
});

function getSession() {
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  console.log(loggedUser);
  return loggedUser;
}

function checkSession(loggedUser) {
  if (!loggedUser) {
    window.location.href = "./../index.html";
  }
}
