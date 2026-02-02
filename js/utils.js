const order = { products: [],totalOrder: 0 };
let subtotal = 0;
let tax = 0;
let total = 0;

export function generateOrder(addedProduct) {
  const repeatedProduct = order.products.find(
    (product) => product.productId === addedProduct[0].id,
  );

  if (repeatedProduct) {
    repeatedProduct["quantity"]++;
    repeatedProduct["total"] += addedProduct[0].price;
  } else {
    order.products.push({
      productId: addedProduct[0].id,
      name: addedProduct[0].name,
      price: addedProduct[0].price,
      img: addedProduct[0].img,
      quantity: 1,
      total: addedProduct[0].price,
    });
  }

  order.totalOrder = order.products.reduce(
    (acc, product) => acc + product.total,
    0
  );

  return order

//   renderOrder(addedProduct);
//   intento(order);
}

export function getDate() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  return formattedDate;
}

export function getOrdersByUser(orders, userId) {
  return orders.filter(order => order.userId === userId);
}
