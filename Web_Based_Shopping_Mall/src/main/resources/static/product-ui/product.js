const API_BASE = "http://localhost:8080/api/products";
const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");

// --- Message Box ---
function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 3000);
}

// --- Load Products ---
async function fetchProducts() {
    productTableBody.innerHTML = "<tr><td colspan='9'>Loading...</td></tr>";

    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const products = await res.json();

        if (!Array.isArray(products) || products.length === 0) {
            productTableBody.innerHTML = "<tr><td colspan='9'>No products found</td></tr>";
            return;
        }

        productTableBody.innerHTML = "";
        products.forEach((p) => {
            const row = `
        <tr>
          <td>${p.productId}</td>
          <td>${p.name}</td>
          <td>${p.description || ""}</td>
          <td>$${p.price.toFixed(2)}</td>
          <td>${p.size || "-"}</td>
          <td>${p.category || "-"}</td>
          <td>${p.quantity}</td>
          <td>${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" class="thumb">` : "No Image"}</td>
          <td>
            <button class="btn-edit" onclick="editProduct(${p.productId})">Edit</button>
            <button class="btn-delete" onclick="deleteProduct(${p.productId})">Delete</button>
          </td>
        </tr>`;
            productTableBody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        productTableBody.innerHTML = "<tr><td colspan='9' style='color:red;'>Failed to load products.</td></tr>";
    }
}

// --- Add / Update Product ---
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    // --- Validation ---
    if (isNaN(price) || price < 0) {
        return showMessage("❌ Price cannot be negative or empty.", "error");
    }

    if (isNaN(quantity) || quantity < 0) {
        return showMessage("❌ Quantity cannot be negative or empty.", "error");
    }

    const product = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        price,
        size: document.getElementById("size").value.trim(),
        category: document.getElementById("category").value.trim(),
        quantity,
        imageUrl: document.getElementById("imageUrl").value.trim(),
    };

    if (!product.name) {
        return showMessage("❌ Product name is required.", "error");
    }

    const productId = document.getElementById("productId").value;
    const method = productId ? "PUT" : "POST";
    const url = productId ? `${API_BASE}/${productId}` : API_BASE;

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (res.ok) {
            showMessage(productId ? "✅ Product updated!" : "✅ Product added!");
            productForm.reset();
            document.getElementById("productId").value = "";
            fetchProducts();
        } else {
            showMessage("❌ Error saving product.", "error");
        }
    } catch (err) {
        console.error("Error saving product:", err);
        showMessage("❌ Failed to save product.", "error");
    }
});

// --- Edit Product ---
async function editProduct(id) {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const p = await res.json();

        document.getElementById("productId").value = p.productId;
        document.getElementById("name").value = p.name;
        document.getElementById("description").value = p.description || "";
        document.getElementById("price").value = p.price;
        document.getElementById("size").value = p.size || "";
        document.getElementById("category").value = p.category || "";
        document.getElementById("quantity").value = p.quantity;
        document.getElementById("imageUrl").value = p.imageUrl || "";

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
        showMessage("❌ Failed to load product details.", "error");
    }
}

// --- Delete Product ---
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) {
            showMessage("🗑️ Product deleted!");
            fetchProducts();
        } else {
            showMessage("❌ Error deleting product.", "error");
        }
    } catch (err) {
        console.error("Error deleting product:", err);
        showMessage("❌ Failed to delete product.", "error");
    }
}

// --- Logout Button ---
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Logout from dashboard?")) {
        window.location.href = "../admin-dashboard/dashboard.html";
    }
});

// --- Initial Load ---
fetchProducts();
