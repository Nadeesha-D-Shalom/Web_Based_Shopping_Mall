const BASE_URL = "";

async function api(path){
    const res = await fetch(BASE_URL+path);
    if(!res.ok) return [];
    return res.json();
}

async function loadCounts(){
    const admins = await api("/api/admins");
    const products = await api("/api/products");
    const orders = await api("/api/orders");
    const staff = await api("/api/staff");

    document.getElementById("adminCount").textContent = admins.length;
    document.getElementById("productCount").textContent = products.length;
    document.getElementById("orderCount").textContent = orders.length;
    document.getElementById("staffCount").textContent = staff.length;
}
document.addEventListener("DOMContentLoaded", loadCounts);
