const BASE_URL = "http://localhost:8080";

// Toast function
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `show ${type}`;
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// API helper
async function api(path) {
    try {
        const res = await fetch(BASE_URL + path);
        if (!res.ok) throw new Error("Failed to fetch " + path);
        return res.json();
    } catch (err) {
        console.error(err);
        showToast("Error loading " + path, "error");
        return [];
    }
}

// Load dashboard counts
async function loadCounts() {
    const [admins, products, orders, staff] = await Promise.all([
        api("/api/admins"),
        api("/api/products"),
        api("/api/orders"),
        api("/api/staff"),
    ]);

    document.getElementById("adminCount").textContent = admins.length;
    document.getElementById("productCount").textContent = products.length;
    document.getElementById("orderCount").textContent = orders.length;
    document.getElementById("staffCount").textContent = staff.length;
}

// Sidebar toggle (mobile)
document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("active");
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        showToast("Logged out successfully!");
        setTimeout(() => {
            window.location.href = "../login.html";
        }, 1000);
    }
});

// Animate cards when loading
function animateCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
        card.classList.add("fade-in");
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadCounts();
    animateCards();
});
