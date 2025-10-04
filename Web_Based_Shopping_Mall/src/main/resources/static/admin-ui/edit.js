const API_BASE = "http://localhost:8080/api/admins";

// Get admin ID from URL
const params = new URLSearchParams(window.location.search);
const adminId = params.get("id");

// Load admin data
async function loadAdmin() {
    const res = await fetch(`${API_BASE}/${adminId}`);
    if (res.ok) {
        const admin = await res.json();
        document.getElementById("adminId").value = admin.id;
        document.getElementById("username").value = admin.username;
        document.getElementById("password").value = admin.password;
        document.getElementById("email").value = admin.email;
        document.getElementById("fullName").value = admin.fullName || "";
    }
}

// Update admin
document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const updatedAdmin = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        fullName: document.getElementById("fullName").value
    };

    const res = await fetch(`${API_BASE}/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAdmin)
    });

    if (res.ok) {
        alert("Admin updated!");
        // force reload of dashboard with cache-buster
        window.location.href = "user-dashboard.html?updated=" + new Date().getTime();
    } else {
        alert("Error updating admin");
    }
});

// Initial load
loadAdmin();
