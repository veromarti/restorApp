import { getUsers, saveUser } from "./../js/storage.js";

let users = getCachedUsers();
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loggedUsser = sessionStorage.getItem("loggedUser");

document.addEventListener("DOMContentLoaded", async () => {
  const registeredUsers = await getUsers();

  cacheUsers(registeredUsers);
  checkSession();
});

function checkSession() {
  if (loggedUsser) {
    window.location.href = "./../pages/home.html";
  }
}

function cacheUsers(usersList) {
  localStorage.setItem("users", JSON.stringify(usersList));
}

function getCachedUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function getFormInfo(inputForm) {
  const user = {};
  for (const [key, value] of inputForm) {
    user[key] = value;
  }
  return user;
}

function validateUser(userInput) {
  const user = users.find((u) => u.email === userInput.email);
  console.log(user);
  if (!user) {
    return { status: "NOT_FOUND" };
  }

  if (user.password !== userInput.password) {
    console.log("entra");
    return { status: "WRONG_CREDENTIALS" };
  }

  return { status: "OK", user };
}

function handleLogin(userInput) {
  const result = validateUser(userInput);

  if (result.status === "OK") {
    sessionStorage.setItem("loggedUser", JSON.stringify(result.user));
    window.location.href = "./../pages/home.html";
    return;
  }

  if (result.status === "WRONG_CREDENTIALS") {
    alert("Wrong credentials");
    return;
  }

  if (result.status === "NOT_FOUND") {
    alert("User does not exist");
    window.location.href = "./../pages/register.html";
    return;
  }
}

async function handleRegister(userInput) {
  const emailExists = users.some((u) => u.email === userInput.email);

  if (emailExists) {
    alert("User already exists");
    return;
  }

  userInput.role = "user";

  try {
    await userRegistration(userInput);
    window.location.href = "./../index.html";

  } catch (error) {
    console.error("Registration failed:", error);
  }
}

// function handleRegister(userInput) {
//   const emailExists = users.some((u) => u.email === userInput.email);

//   if (emailExists) {
//     alert("User already exists");
//     return;
//   }

//   userInput.role = "user";
//   userRegistration(userInput);

//   alert("User registered successfully");
//   window.location.href = "./../index.html";
//   return
// }

// SECOND VERSION
// async function handleRegister(userInput) {
//     console.log(users)
//     console.log(Array.isArray(users));
//   const emailExists = users.some(
//     u => u.email === userInput.email
//   );

//   if (emailExists) {
//     alert("User already exists");
//     return;
//   }

//   userInput.role = "user";
//   await userRegistration(userInput);

//   alert("User registered successfully");
//   window.location.href = "../index.html";
// }

// FIRST VERSION
// function validateUser(userInput) {
//   let emailExists = false;
//   let userExists = false
//   const foundUser = users.filter((user) => user.email === userInput.email);

//   if (foundUser.length != 0) {
//     emailExists = true
//     if (userInput.password === foundUser[0].password) {
//       userExists = true;
//     }
//   }

//   if (userExists) {
//     alert("User found");
//     sessionStorage.setItem('loggedUser', JSON.stringify(foundUser))
//     window.location.href = "./../pages/home.html";
//   } else if (emailExists){
//     alert('Wrong Credentials')
//   }
//   else {
//     alert("User doesn't exist");
//     userInput["role"] = "user";
//     userRegistration(userInput);
//     window.location.href = "./../index.html";
//   }
// }



async function userRegistration(userInfo) {

  try {

    await saveUser(userInfo);
    const allUsers = await getUsers();
    cacheUsers(allUsers);
    users = getCachedUsers();

  } catch (error) {
    console.error("Error during registration:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    alert("Something went wrong. Please try again.");
    throw error;
  }
}

// async function userRegistration(userInfo) {
//   try {
//     const updatedUsers = await saveUser(userInfo);
//     cacheUsers(updatedUsers);
//     users = getCachedUsers();
//   } catch (error) {
//     console.error("Error during registration:", error);
//     alert("Something went wrong. Please try again.");
//   }
//   return;
// }

// ===== LOGIN =====

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputForm = new FormData(loginForm);
  const userInput = getFormInfo(inputForm);

  handleLogin(userInput);
});

// ===== REGISTER =====

registerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputForm = new FormData(registerForm);
  const userInput = getFormInfo(inputForm);

  handleRegister(userInput);
});


