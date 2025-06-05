# Ecomm-Bundle
# 🛒 E-commerce Product Bundles API

This project implements a scalable product bundling feature for an e-commerce marketplace. Sellers can create product bundles with discounts, and customers can view and purchase them easily.

---

## 📦 Features

- Sellers can create, update, and delete product bundles.
- Each bundle includes multiple products with a 10% discount (on total price).
- Bundles can include sale items (discount applies after sale).
- Customers can view bundles and add them to cart.
- Seller dashboard UI and customer-facing bundle display UI.
- Backend RESTful API using Node.js + Express + MongoDB.
- Fully Dockerized backend and Swagger API docs.
- Unit testing: Mocha/Chai (backend), Jest (frontend).

---

## 🛠️ Tech Stack

- **Frontend**: React (Hooks), Redux, Sass
- **Backend**: Node.js, Express
- **Database**: MongoDB (local or cloud like Render/MongoDB Atlas)
- **Testing**: Jest (React), Mocha/Chai (Node.js)
- **Docs**: Swagger/OpenAPI
- **Deployment**: Docker

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or cloud URI like MongoDB Atlas or Render)
- Docker (optional for backend)
- npm or yarn

---

## 📁 Project Structure

ecomm-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── test/
│ ├── swagger/
│ ├── Dockerfile
│ └── server.js
├── frontend/
│ ├── components/
│ ├── redux/
│ ├── App.js
│ ├── index.js
│ └── styles/



---

## 🔧 Backend Setup

```bash
cd backend
npm install
```


Create a .env file in backend/ with the following:
```bash
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<your_jwt_secret>
```

```bash
npm start
```

## Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
npm install
npm start
Open your browser and visit http://localhost:3000 to see the UI.
```

## Running the Application
```bash
Backend API runs on http://localhost:5000

Frontend React app runs on http://localhost:3000

The frontend communicates with the backend APIs to manage and display bundles.
```
## API Documentation
```bash
http://localhost:5000/api-docs
```

### Bundle Discount Logic
```bash
A valid bundle must contain at least 2 different products.

Discount = 10% off the total price of the products if bought separately.

If any product in the bundle is on sale, discount is applied on the sale price.

The discount validation API endpoint returns the final discounted price.

```


## Testing
Backend Tests
Tests are located in backend/test/

Run tests using Mocha:
```bash
npm test
```

Frontend Tests
Run tests with Jest:
```bash
npm test
```
## Deployment
Docker Backend
Build Docker image:
```bash
docker build -t ecomm-backend
```

Run Docker container:
```bash
docker run -d -p 5000:5000 --env-file .env ecomm-backend
```


