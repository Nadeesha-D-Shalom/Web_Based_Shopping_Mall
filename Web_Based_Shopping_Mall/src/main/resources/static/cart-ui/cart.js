const API_BASE = "http://localhost:8080/api/cart";
const PRODUCT_API = "http://localhost:8080/api/products";

// Show toast messages
function showMessage(text, type = "error") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 4000);
}

// Load cart
async function loadCart() {
    const customerId = document.getElementById("customerId").value;
    const res = await fetch(`${API_BASE}/${customerId}`);

    const tbody = document.getElementById("cart-items");
    const totalEl = document.getElementById("totalPrice");
    tbody.innerHTML = "";
    totalEl.innerText = "0.00";

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Invalid customer ID" }));
        const msg = errorData.error || "Invalid customer ID";

        showMessage(msg, "error");
        tbody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center; font-weight:bold;">${msg}</td></tr>`;
        return;
    }

    const cart = await res.json();

    if (!cart.items || cart.items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:gray;">Cart is empty</td></tr>`;
        return;
    }

    for (const item of cart.items) {
        const productRes = await fetch(`${PRODUCT_API}/${item.productId}`);
        const product = productRes.ok ? await productRes.json() : { name: `#${item.productId}`, imageURL: "" };

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>
                    <div class="product-info">
                        <img src="${product.imageURL || ''}" alt="${product.name || ''}" onerror="this.style.display='none'">
                        <span>${product.name || ''}</span>
                    </div>
                </td>
                <td><input type="number" id="qty-${item.id}" min="1" value="${item.quantity}"></td>
                <td>${Number(item.subTotal).toFixed(2)}</td>
                <td>
                    <button class="action-btn edit" onclick="updateItem(${item.id})">Edit</button>
                    <button class="action-btn delete" onclick="removeItem(${item.id})">Remove</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", row);
    }

    totalEl.innerText = Number(cart.totalPrice).toFixed(2);
}

// Update item
async function updateItem(itemId) {
    const input = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(input.value, 10);

    if (!(quantity > 0)) {
        showMessage("Quantity must be at least 1", "error");
        return;
    }

    const res = await fetch(`${API_BASE}/items/${itemId}?quantity=${quantity}`, { method: "PUT" });

    if (!res.ok) {
        showMessage("Failed to update item", "error");
        return;
    }

    showMessage("Item updated successfully", "success");
    loadCart();
}

// Remove item
async function removeItem(itemId) {
    const res = await fetch(`${API_BASE}/items/${itemId}`, { method: "DELETE" });

    if (!res.ok) {
        showMessage("Failed to remove item", "error");
        return;
    }

    showMessage("Item removed successfully", "success");
    loadCart();
}

// Checkout
async function checkout() {
    const customerId = document.getElementById("customerId").value;
    const res = await fetch(`${API_BASE}/${customerId}/checkout`, { method: "POST" });

    if (!res.ok) {
        showMessage("Checkout failed", "error");
        return;
    }

    const total = await res.json();
    showMessage(`Checkout complete! Total = $${total}`, "success");
    loadCart();
}
