const API_BASE = "http://localhost:8080/api/admins";

function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div style="color:${type === "error" ? "red" : "green"}">${text}</div>`;
    setTimeout(() => box.innerHTML = "", 3000);
}

// Load admins
async function loadAdmins() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    const tbody = document.getElementById("adminTableBody");
    tbody.innerHTML = "";
    data.forEach(admin => {
        const row = `
      <tr>
        <td>${admin.id}</td>
        <td>${admin.username}</td>
        <td>${admin.email}</td>
        <td>${admin.fullName || ""}</td>
        <td>${admin.createdAt ? admin.createdAt.replace("T"," ").split(".")[0] : ""}</td>
        <td>
          <button onclick="editAdmin(${admin.id})">Edit</button>
          <button onclick="deleteAdmin(${admin.id})">Delete</button>
        </td>
      </tr>`;
        tbody.innerHTML += row;
    });
}

// Add Admin
document.getElementById("adminForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const admin = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        fullName: document.getElementById("fullName").value
    };

    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    });

    if (res.ok) {
        showMessage("Admin added!");
        document.getElementById("adminForm").reset();
        loadAdmins();
    } else {
        showMessage("Error adding admin", "error");
    }
});

// Edit redirect
function editAdmin(id) {
    // add timestamp to force reload after update
    window.location.href = `edit.html?id=${id}&t=${new Date().getTime()}`;
}

// Delete admin
async function deleteAdmin(id) {
    if (confirm("Are you sure you want to delete this admin?")) {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) {
            showMessage("Admin deleted!");
            loadAdmins();
        } else {
            showMessage("Error deleting admin", "error");
        }
    }
}

// Initial load
loadAdmins();
