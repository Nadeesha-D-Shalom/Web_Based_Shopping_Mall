const API_BASE = "http://localhost:8080/api/staff";

function showMessage(text, type = "success") {
    const box = document.getElementById("messageBox");
    box.innerHTML = `<div style="color:${type === "error" ? "red" : "green"}">${text}</div>`;
    setTimeout(() => box.innerHTML = "", 3000);
}

// Load all staff
async function loadStaff() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    const tbody = document.getElementById("staffTableBody");
    tbody.innerHTML = "";
    data.forEach(staff => {
        const row = `
      <tr>
        <td>${staff.staffId}</td>
        <td>${staff.fullName}</td>
        <td>${staff.email}</td>
        <td>${staff.position}</td>
        <td>${staff.createdAt ? staff.createdAt.replace("T", " ").split(".")[0] : ""}</td>
        <td>
          <button onclick="editStaff(${staff.staffId}, '${staff.fullName}', '${staff.email}', '${staff.position}')">Edit</button>
          <button onclick="deleteStaff(${staff.staffId})">Delete</button>
        </td>
      </tr>`;
        tbody.innerHTML += row;
    });
}

// Save staff (create or update)
document.getElementById("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("staffId").value;
    const staff = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        position: document.getElementById("position").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_BASE}/${id}` : API_BASE;

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff)
    });

    if (res.ok) {
        showMessage(id ? "Staff updated!" : "Staff added!");
        document.getElementById("staffForm").reset();
        document.getElementById("staffId").value = "";
        loadStaff();
    } else {
        showMessage("Error saving staff", "error");
    }
});

// Edit staff (populate form)
function editStaff(id, fullName, email, position) {
    document.getElementById("staffId").value = id;
    document.getElementById("fullName").value = fullName;
    document.getElementById("email").value = email;
    document.getElementById("position").value = position;
}

// Delete staff
async function deleteStaff(id) {
    if (confirm("Are you sure you want to delete this staff?")) {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) {
            showMessage("Staff deleted!");
            loadStaff();
        } else {
            showMessage("Error deleting staff", "error");
        }
    }
}

// Initial load
loadStaff();
