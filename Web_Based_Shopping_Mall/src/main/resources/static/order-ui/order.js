const API_BASE = "http://localhost:8080/api/orders";
const orderForm = document.getElementById("orderForm");
const orderTableBody = document.getElementById("orderTableBody");

function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 3000);
}

// --- Fetch Orders ---
async function fetchOrders() {
    orderTableBody.innerHTML = "<tr><td colspan='8'>Loading...</td></tr>";
    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const orders = await res.json();

        if (!Array.isArray(orders) || orders.length === 0) {
            orderTableBody.innerHTML = "<tr><td colspan='8'>No orders found</td></tr>";
            return;
        }

        orderTableBody.innerHTML = "";
        orders.forEach((o) => {
            const row = `
        <tr>
          <td>${o.orderId}</td>
          <td>${o.customerName}</td>
          <td>${o.customerEmail}</td>
          <td>${o.orderDate ? o.orderDate.replace("T", " ").substring(0, 16) : "-"}</td>
          <td>${o.status}</td>
          <td>$${o.totalAmount.toFixed(2)}</td>
          <td>${o.staffId || "-"}</td>
          <td>
            <button class="btn-edit" onclick="editOrder(${o.orderId})">Edit</button>
            <button class="btn-delete" onclick="deleteOrder(${o.orderId})">Delete</button>
          </td>
        </tr>`;
            orderTableBody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        console.error("Error fetching orders:", err);
        orderTableBody.innerHTML = `<tr><td colspan="8" style="color:red;">Failed to load orders.</td></tr>`;
    }
}

// --- Save Order ---
orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const order = {
        customerName: document.getElementById("customerName").value.trim(),
        customerEmail: document.getElementById("customerEmail").value.trim(),
        totalAmount: parseFloat(document.getElementById("totalAmount").value),
        status: document.getElementById("status").value,
        staffId: document.getElementById("staffId").value ? parseInt(document.getElementById("staffId").value) : null,
    };

    if (!order.customerName || !order.customerEmail || isNaN(order.totalAmount))
        return showMessage("Please fill all required fields correctly.", "error");

    const orderId = document.getElementById("orderId").value;
    const method = orderId ? "PUT" : "POST";
    const url = orderId ? `${API_BASE}/${orderId}` : API_BASE;

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });

        if (res.ok) {
            showMessage(orderId ? "✅ Order updated!" : "✅ Order added!");
            orderForm.reset();
            fetchOrders();
        } else {
            showMessage("❌ Failed to save order (HTTP " + res.status + ")", "error");
        }
    } catch (err) {
        console.error("Error saving order:", err);
        showMessage("❌ Error saving order.", "error");
    }
});

// --- Edit Order ---
async function editOrder(id) {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const o = await res.json();

        document.getElementById("orderId").value = o.orderId;
        document.getElementById("customerName").value = o.customerName;
        document.getElementById("customerEmail").value = o.customerEmail;
        document.getElementById("totalAmount").value = o.totalAmount;
        document.getElementById("status").value = o.status;
        document.getElementById("staffId").value = o.staffId || "";

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
        console.error(err);
        showMessage("❌ Failed to load order details.", "error");
    }
}

// --- Delete Order ---
async function deleteOrder(id) {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) {
            showMessage("🗑️ Order deleted!");
            fetchOrders();
        } else {
            showMessage("❌ Failed to delete order.", "error");
        }
    } catch (err) {
        console.error(err);
        showMessage("❌ Error deleting order.", "error");
    }
}

// --- Logout ---
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Logout from admin dashboard?")) {
        window.location.href = "../admin-dashboard/dashboard.html";
    }
});

fetchOrders();
