const API_URL = "http://localhost:3001";


export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    return response.json();
  } catch (error) {
    console.error("getUsers failed:", error);
    throw error; //
  }
}
// FIRST VERSION
// export async function getUsers() {
//   const response = await fetch(`${API_URL}/users`);
//   return response.json();
// }

export async function saveUser(user) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error saving user");
    }

    return response.json();
  } catch (error) {
    console.error("saveUser failed:", error);
    throw error; 
  }
}

// FIRST VERSION
// export async function saveUser(user) {
//   const response = await fetch(`${API_URL}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });

//   return response.json();
// }
