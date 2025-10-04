const API_BASE = "http://localhost:8080/api/products";

const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");

async function fetchProducts() {
    const res = await fetch(API_BASE);
    const products = await res.json();

    productTableBody.innerHTML = "";
    products.forEach(p => {
        const row = `
      <tr>
        <td>${p.productId}</td>
        <td>${p.name}</td>
        <td>${p.description || ""}</td>
        <td>$${p.price}</td>
        <td>${p.size || ""}</td>
        <td>${p.category || ""}</td>
        <td>${p.quantity}</td>
        <td>${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}">` : "No Image"}</td>
        <td>
          <button class="edit" onclick="editProduct(${p.productId})">Edit</button>
          <button class="delete" onclick="deleteProduct(${p.productId})">Delete</button>
        </td>
      </tr>
    `;
        productTableBody.insertAdjacentHTML("beforeend", row);
    });
}

productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        size: document.getElementById("size").value,
        category: document.getElementById("category").value,
        quantity: parseInt(document.getElementById("quantity").value),
        imageUrl: document.getElementById("imageUrl").value
    };

    const productId = document.getElementById("productId").value;

    if (productId) {
        // Update existing
        await fetch(`${API_BASE}/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    } else {
        // Create new
        await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    }

    productForm.reset();
    document.getElementById("productId").value = "";
    fetchProducts();
});

async function editProduct(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const p = await res.json();

    document.getElementById("productId").value = p.productId;
    document.getElementById("name").value = p.name;
    document.getElementById("description").value = p.description || "";
    document.getElementById("price").value = p.price;
    document.getElementById("size").value = p.size || "";
    document.getElementById("category").value = p.category || "";
    document.getElementById("quantity").value = p.quantity;
    document.getElementById("imageUrl").value = p.imageUrl || "";
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchProducts();
}

// Load products when page loads
fetchProducts();
