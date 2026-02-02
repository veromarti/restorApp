const order = { products: [] };
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

  return order

//   renderOrder(addedProduct);
//   intento(order);
}
