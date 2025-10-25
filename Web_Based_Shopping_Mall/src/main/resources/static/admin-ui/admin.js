const API_BASE = "http://localhost:8080/api/admins";

function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 3000);
}

// --- Load Admins ---
async function loadAdmins() {
    const tbody = document.getElementById("adminTableBody");
    tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    try {
        const res = await fetch(API_BASE);
        if (!res.ok) {
            tbody.innerHTML = `<tr><td colspan="6" style="color:red;">Failed to load admins (HTTP ${res.status})</td></tr>`;
            return;
        }

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6">No admins found</td></tr>`;
            return;
        }

        tbody.innerHTML = "";
        data.forEach((admin) => {
            const row = `
        <tr>
          <td>${admin.id ?? ""}</td>
          <td>${admin.username ?? ""}</td>
          <td>${admin.email ?? ""}</td>
          <td>${admin.fullName ?? ""}</td>
          <td>${admin.createdAt ? admin.createdAt.replace("T", " ").split(".")[0] : ""}</td>
          <td>
            <button class="btn-edit" onclick="editAdmin(${admin.id})">Edit</button>
            <button class="btn-delete" onclick="deleteAdmin(${admin.id})">Delete</button>
          </td>
        </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        console.error("Error fetching admins:", err);
        tbody.innerHTML = `<tr><td colspan="6" style="color:red;">Error loading admins. Check console.</td></tr>`;
    }
}

// --- Add Admin ---
document.getElementById("adminForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const admin = {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        email: document.getElementById("email").value.trim(),
        fullName: document.getElementById("fullName").value.trim(),
    };

    if (!admin.username || !admin.password || !admin.email)
        return showMessage("Please fill all required fields.", "error");

    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
    });

    if (res.ok) {
        showMessage("✅ Admin added successfully!");
        document.getElementById("adminForm").reset();
        loadAdmins();
    } else {
        showMessage("❌ Failed to add admin (HTTP " + res.status + ")", "error");
    }
});

// --- Edit Redirect ---
function editAdmin(id) {
    window.location.href = `edit.html?id=${id}`;
}

// --- Delete Admin ---
async function deleteAdmin(id) {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) {
        showMessage("🗑️ Admin deleted!");
        loadAdmins();
    } else {
        showMessage("❌ Failed to delete admin.", "error");
    }
}

// --- Logout ---
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Logout from admin dashboard?")) {
        window.location.href = "../admin-dashboard/dashboard.html";
    }
});

loadAdmins();
