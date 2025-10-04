const API_BASE = "http://localhost:8080/api/orders";

const orderForm = document.getElementById("orderForm");
const orderTableBody = document.getElementById("orderTableBody");

async function fetchOrders() {
    const res = await fetch(API_BASE);
    const orders = await res.json();

    orderTableBody.innerHTML = "";
    orders.forEach(o => {
        const row = `
      <tr>
        <td>${o.orderId}</td>
        <td>${o.customerName}</td>
        <td>${o.customerEmail}</td>
        <td>${o.orderDate ? o.orderDate.replace("T"," ").substring(0,16) : ""}</td>
        <td>${o.status}</td>
        <td>$${o.totalAmount}</td>
        <td>${o.staffId || ""}</td>
        <td>
          <button class="edit" onclick="editOrder(${o.orderId})">Edit</button>
          <button class="delete" onclick="deleteOrder(${o.orderId})">Delete</button>
        </td>
      </tr>
    `;
        orderTableBody.insertAdjacentHTML("beforeend", row);
    });
}

orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const order = {
        customerName: document.getElementById("customerName").value,
        customerEmail: document.getElementById("customerEmail").value,
        totalAmount: parseFloat(document.getElementById("totalAmount").value),
        status: document.getElementById("status").value,
        staffId: document.getElementById("staffId").value ? parseInt(document.getElementById("staffId").value) : null
    };

    const orderId = document.getElementById("orderId").value;

    if (orderId) {
        // Update
        await fetch(`${API_BASE}/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
    } else {
        // Create
        await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
    }

    orderForm.reset();
    document.getElementById("orderId").value = "";
    fetchOrders();
});

async function editOrder(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const o = await res.json();

    document.getElementById("orderId").value = o.orderId;
    document.getElementById("customerName").value = o.customerName;
    document.getElementById("customerEmail").value = o.customerEmail;
    document.getElementById("totalAmount").value = o.totalAmount;
    document.getElementById("status").value = o.status;
    document.getElementById("staffId").value = o.staffId || "";
}

async function deleteOrder(id) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchOrders();
}

// Load orders on page load
fetchOrders();
