# Ecommerce Platform

A full-stack e-commerce web application built with **React**, **Spring Boot**, and **PostgreSQL**. 
The platform provides secure JWT-based authentication, role-based authorization, product management for sellers, and a seamless shopping experience for buyers.

---

## Live Demo

**Frontend:**  
https://loquacious-chaja-ea1344.netlify.app

**Backend API:**  
https://ecommerce-backend-latest-g7he.onrender.com

---

## Features

### Authentication & Authorization
- Secure JWT Authentication
- User Registration & Login
- Role-based Authorization (Buyer & Seller)
- Protected Routes
- Secure REST APIs using Spring Security

### Product Management
- Create Products
- View Products
- Update Products
- Delete Products
- Product Search
- Product Filtering

### Shopping Experience
- Browse Products
- Shopping Cart
- Responsive User Interface
- Seller Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Context API
- Axios

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Maven

### Database
- PostgreSQL (Neon)

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: Neon PostgreSQL

---

## Project Structure

```text
ecommerce-platform
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Security

- JWT-based Authentication
- Role-based Authorization
- Protected Backend Endpoints
- Protected Frontend Routes
- Environment Variables for Sensitive Credentials

---

## Getting Started

### Prerequisites

- Java 21 (or your project's Java version)
- Node.js
- npm
- Maven
- PostgreSQL (or Neon Database)

---

### Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure the following environment variables:

```properties
DATASOURCE_URL=your_database_url
DATASOURCE_NAME=your_database_username
DATASOURCE_PASSWORD=your_database_password
FRONTEND_URL=https://loquacious-chaja-ea1344.netlify.app
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend will start on:

```
https://ecommerce-backend-latest-g7he.onrender.com
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the environment variable:

```env
VITE_API_URL=https://ecommerce-backend-latest-g7he.onrender.com
```

Run the frontend:

```bash
npm run dev
```

Frontend will start on:

```
https://loquacious-chaja-ea1344.netlify.app
```

---

## 📡 API Overview

### Authentication

- Register User
- Login User

### Products

- Get All Products
- Search Products
- Filter Products
- Create Product
- Update Product
- Delete Product

### Cart

- Add to Cart
- Remove from Cart
- View Cart

---

## Deployment

The application is deployed using the following services:

| Service | Platform |
|----------|----------|
| Frontend | Netlify |
| Backend | Render |
| Database | Neon PostgreSQL |

---

## 📸 Screenshots

> Screenshots will be added soon.

