import { refreshOrdersTable } from "./utils.js";
import { updateOrderStatus } from "./storage.js";

export function getStatusBadge(status) {
  const map = {
    delivered: "bg-success",
    pending: "bg-warning text-dark",
    preparing: "bg-primary",
    canceled: "bg-danger",
    ready: "bg-secondary"
  };

  return map[status] || "bg-secondary";
}

export function renderOrdersTable(orders) {
  const tbody = document.getElementById("orders-table");
  tbody.innerHTML = "";

  orders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.userName || "Customer"}</td>
      <td>${order.date}</td>
      <td>
        <span class="badge ${getStatusBadge(order.status)}">
          ${order.status}
        </span>
      </td>
      <td class="text-end">$${order.totalOrder.toFixed(2)}</td>
    `;

    row.addEventListener("click", () => renderOrderDetail(order));
    tbody.appendChild(row);
  });
}

function renderOrderDetail(order) {
  const panel = document.getElementById("order-detail");

  const itemsHTML = order.products.map(item => `
    <div class="d-flex justify-content-between small mb-2">
      <span>${item.quantity}x ${item.name}</span>
      <span>$${item.total.toFixed(2)}</span>
    </div>
  `).join("");

  panel.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between mb-3">
        <strong>Order #${order.id}</strong>
        <span class="badge ${getStatusBadge(order.status)}">
          ${order.status}
        </span>
      </div>

      <hr>

      <h6>Items</h6>
      ${itemsHTML}

      <hr>

      <div class="d-flex justify-content-between">
        <span>Subtotal</span>
        <span>$${order.totalOrder.toFixed(2)}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Tax (8%)</span>
        <span>$${(order.totalOrder * 0.08).toFixed(2)}</span>
      </div>

      <div class="d-flex justify-content-between fw-bold mt-2">
        <span>Total</span>
        <span>$${(order.totalOrder * 1.08).toFixed(2)}</span>
      </div>

      <hr>

      <label class="form-label small">Update status</label>
      <div class="d-flex gap-2">
        <select id="status-select" class="form-select form-select-sm">
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Canceled</option>
        </select>
        <button id="update-status-btn" class="btn btn-success btn-sm">Update</button>
      </div>
    </div>
  `;

  document
    .getElementById("update-status-btn")
    .addEventListener("click", async () => {

      const newStatus =
        document.getElementById("status-select").value;

      const updatedOrder = await updateOrderStatus(order.id, newStatus);

      if (updatedOrder) {
        order.status = updatedOrder.status; // sync local
        renderOrderDetail(order);            // refresca panel
        refreshOrdersTable(order.id, newStatus); // refresca tabla
      }
    });
}
