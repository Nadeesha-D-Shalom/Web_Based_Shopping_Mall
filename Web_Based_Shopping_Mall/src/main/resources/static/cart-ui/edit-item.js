const API_BASE = "http://localhost:8080/api/cart";
const PRODUCT_API = "http://localhost:8080/api/products";

async function loadItem() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
    const customerId = params.get("customerId");

    document.getElementById("itemId").value = itemId;
    document.getElementById("customerId").value = customerId;

    // fetch cart to locate item
    const cartRes = await fetch(`${API_BASE}/${customerId}`);
    const cart = await cartRes.json();
    const item = cart.items.find(i => i.id == itemId);
    if (!item) {
        alert("Item not found");
        window.location.href = "user-dashboard.html";
        return;
    }

    // fetch product details
    const productRes = await fetch(`${PRODUCT_API}/${item.productId}`);
    const product = await productRes.json();

    document.getElementById("productName").innerText = product.name;
    document.getElementById("quantity").value = item.quantity;
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const itemId = document.getElementById("itemId").value;
    const quantity = document.getElementById("quantity").value;

    const res = await fetch(`${API_BASE}/items/${itemId}?quantity=${quantity}`, {
        method: "PUT"
    });

    if (res.ok) {
        alert("Item updated!");
        const customerId = document.getElementById("customerId").value;
        window.location.href = `index.html?customerId=${customerId}`;
    } else {
        alert("Failed to update item");
    }
});

window.onload = loadItem;
