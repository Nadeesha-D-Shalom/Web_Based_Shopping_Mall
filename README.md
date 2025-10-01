# Web-Based Shopping Mall

A **full-stack e-commerce system** designed to provide an online shopping experience for customers and management capabilities for administrators. The system supports **product management, user registration, shopping cart, order handling, and admin controls**.

---

## 📌 Key Features

### 🛍 Customer-Side Features

* Browse products by category (clothing, electronics, etc.)
* Product details view (name, description, price, size, stock)
* Add to Cart & Remove from Cart functionality
* Checkout flow with total calculation
* User registration & login system

### 🛠 Admin-Side Features

* Manage products (Add, Update, Delete)
* Manage users (View, Update, Delete)
* Manage orders (Accept, Cancel, Track status)
* Dashboard with key statistics (users, orders, revenue)

---

## 🛠 Tech Stack

### Backend

* **Java (Spring Boot / Servlets with JPA)**
* **Hibernate ORM**
* **MySQL Database** (for persistence)

### Frontend

* **HTML5, CSS3, JavaScript**
* **Bootstrap** for UI styling
* **Thymeleaf / JSP** (depending on setup)

### Others

* **RESTful APIs** for cart & order handling
* **Lombok** (for boilerplate reduction in entities)
* **Maven** for project build

---

## 📂 Project Structure

```
Web_Based_Shopping_Mall/
│
├── src/main/java/com/app/Web_Based_Shopping_Mall/
│   ├── controller/        # Handles HTTP requests (Product, Cart, User, Admin)
│   ├── entity/            # Entities (Product, User, Order, Cart, Admin)
│   ├── repository/        # JPA Repositories for DB operations
│   ├── service/           # Business logic layer
│   └── WebBasedShoppingMallApplication.java
│
├── src/main/resources/
│   ├── application.properties  # DB + App configs
│   ├── static/                 # Static assets (CSS, JS)
│   └── templates/              # JSP/Thymeleaf HTML templates
│
├── pom.xml                 # Maven dependencies
├── README.md               # Documentation
└── target/                 # Compiled build files
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Web_Based_Shopping_Mall.git
cd Web_Based_Shopping_Mall
```

### 2️⃣ Configure Database

* Create a **MySQL database** (e.g., `shopping_mall_db`)
* Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopping_mall_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

### 3️⃣ Run Application

```bash
mvn spring-boot:run
```

App runs on → **[http://localhost:8080/](http://localhost:8080/)**

---

## 📸 Screenshots *(Add yours here)*

* 🛒 Product Catalog Page
* 📦 Cart & Checkout Page
* 🔑 User Registration / Login
* 📊 Admin Dashboard

---

## 🔮 Future Roadmap

* Integrate **online payment gateway** (Stripe/PayPal)
* Add **product reviews & ratings**
* Implement **multi-vendor support**
* Improve UI/UX with **React or Angular frontend**
* Add **order shipment tracking**

---

## 👨‍💻 Author

**Nadeesha D Shalom**

* [GitHub](https://github.com/Nadeesha-D-Shalom)
* [LinkedIn](https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251/)

---

## 📜 License

Licensed under the **MIT License** – open for personal and commercial use.

---
