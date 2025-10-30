const API_BASE = "http://localhost:8080/api/staff";

// --- Show messages ---
function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div class="alert ${type}">${text}</div>`;
    setTimeout(() => (box.innerHTML = ""), 3000);
}

// --- Load all staff ---
async function loadStaff() {
    const tbody = document.getElementById("staffTableBody");
    tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            tbody.innerHTML = "<tr><td colspan='6'>No staff members found</td></tr>";
            return;
        }

        tbody.innerHTML = "";
        data.forEach((staff) => {
            const row = `
        <tr>
          <td>${staff.staffId}</td>
          <td>${staff.fullName}</td>
          <td>${staff.email}</td>
          <td>${staff.position}</td>
          <td>${staff.createdAt ? staff.createdAt.replace("T", " ").split(".")[0] : "-"}</td>
          <td>
            <button class="btn-edit" onclick="editStaff(${staff.staffId}, '${staff.fullName}', '${staff.email}', '${staff.position}')">Edit</button>
            <button class="btn-delete" onclick="deleteStaff(${staff.staffId})">Delete</button>
          </td>
        </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        console.error("Error loading staff:", err);
        tbody.innerHTML = `<tr><td colspan='6' style='color:red;'>Failed to load staff.</td></tr>`;
    }
}

// --- Save staff (create or update) ---
document.getElementById("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("staffId").value;
    const staff = {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        position: document.getElementById("position").value.trim(),
    };

    if (!staff.fullName || !staff.email || !staff.position) {
        return showMessage("Please fill all required fields.", "error");
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_BASE}/${id}` : API_BASE;

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(staff),
        });

        if (res.ok) {
            showMessage(id ? "✅ Staff updated!" : "✅ Staff added!");
            document.getElementById("staffForm").reset();
            document.getElementById("staffId").value = "";
            loadStaff();
        } else {
            showMessage("❌ Error saving staff (HTTP " + res.status + ")", "error");
        }
    } catch (err) {
        console.error("Error saving staff:", err);
        showMessage("❌ Failed to save staff.", "error");
    }
});

// --- Edit staff (populate form) ---
function editStaff(id, fullName, email, position) {
    document.getElementById("staffId").value = id;
    document.getElementById("fullName").value = fullName;
    document.getElementById("email").value = email;
    document.getElementById("position").value = position;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Delete staff ---
async function deleteStaff(id) {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) {
            showMessage("🗑️ Staff deleted!");
            loadStaff();
        } else {
            showMessage("❌ Error deleting staff.", "error");
        }
    } catch (err) {
        console.error("Error deleting staff:", err);
        showMessage("❌ Failed to delete staff.", "error");
    }
}

// --- Logout ---
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Logout from dashboard?")) {
        window.location.href = "../admin-dashboard/dashboard.html";
    }
});

// --- Initial load ---
loadStaff();
