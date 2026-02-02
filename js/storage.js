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

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    return response.json();
  } catch (error) {
    console.error("getProducts failed:", error);
    throw error; //
  }
}

export async function saveOrder(order){
    const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  return response.json();
}

export async function getOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`);

    if (!response.ok) {
      throw new Error("Error fetching orders");
    }

    return response.json();
  } catch (error) {
    console.error("getOrders failed:", error);
    throw error; //
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: newStatus
      })
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
  }
}
