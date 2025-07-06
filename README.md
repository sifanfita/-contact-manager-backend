# 📇 Contact Management API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to register, log in, and manage their personal contacts securely.

---

## 🚀 Features

- User registration & login (with JWT)
- Protected routes for contact management
- CRUD operations (Create, Read, Update, Delete)
- MongoDB integration via Mongoose
- Express middleware for error handling & authentication

---

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-async-handler

---

## 🔐 Auth Routes (`/api/users`)

- `POST /register` – Register a user  
- `POST /login` – Login & get token  
- `GET /current` – Get logged-in user info(protected)  

## 📇 Contact Routes (`/api/contacts`) – Protected

- `GET /` – Get all user contacts  
- `POST /` – Create new contact  
- `GET /:id` – Get contact by ID  
- `PUT /:id` – Update contact  
- `DELETE /:id` – Delete contact  

---

## 🛠️ Setup

```bash
git clone https://github.com/sifanfita/-contact-manager-backend.git
cd node-app
npm install

## Create a .env file:
PORT=5000
CONNECTION_STRING=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
Start the server:

```bash
npm run dev
