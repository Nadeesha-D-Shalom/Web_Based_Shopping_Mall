const API_BASE = "http://localhost:8080/api/admins";
const params = new URLSearchParams(window.location.search);
const adminId = params.get("id");

// --- Helper for showing messages ---
function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 3000);
}

// --- Load Admin Data ---
async function loadAdmin() {
    if (!adminId) {
        showMessage("❌ Missing admin ID in URL.", "error");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/${adminId}`);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const admin = await res.json();

        document.getElementById("adminId").value = admin.id;
        document.getElementById("username").value = admin.username || "";
        document.getElementById("password").value = admin.password || "";
        document.getElementById("email").value = admin.email || "";
        document.getElementById("fullName").value = admin.fullName || "";
    } catch (err) {
        console.error("Error loading admin:", err);
        showMessage("❌ Could not load admin data.", "error");
    }
}

// --- Update Admin ---
document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedAdmin = {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        email: document.getElementById("email").value.trim(),
        fullName: document.getElementById("fullName").value.trim(),
    };

    if (!updatedAdmin.username || !updatedAdmin.password || !updatedAdmin.email) {
        return showMessage("Please fill all required fields.", "error");
    }

    try {
        const res = await fetch(`${API_BASE}/${adminId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAdmin),
        });

        if (res.ok) {
            showMessage("✅ Admin updated successfully!");
            setTimeout(() => {
                window.location.href = "../admin-ui/index.html?t=" + Date.now();
            }, 1200);
        } else {
            showMessage("❌ Failed to update admin (HTTP " + res.status + ")", "error");
        }
    } catch (err) {
        console.error("Error updating admin:", err);
        showMessage("❌ Error updating admin.", "error");
    }
});

// --- Back Button ---
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "../admin-ui/index.html";
});

// --- Initial Load ---
loadAdmin();
