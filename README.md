# Roxiler MERN Stack Coding Challenge

This is my submission for the Roxiler FullStack Internship Coding Challenge. The task was to create a MERN stack application that fetches product transaction data from a third-party API and displays various visualizations and tables based on that data.

---

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL (used instead of PostgreSQL)
- Charting Library: Recharts
- HTTP Client: Axios

---


## 🚀 How to Run the Project Locally

### Backend (Node + MySQL)

1. Go to the backend directory:
   ```
   cd my-node-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=roxiler
   ```

4. Start the backend server:
   ```
   node app.js
   ```

---

### Frontend (React)

1. Go to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend app:
   ```
   npm start
   ```

---

## 📊 Features Implemented

- ✅ Fetched and seeded DB with transactions from [Roxiler Third-Party API](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- ✅ Transactions table with search and pagination
- ✅ Statistics section with:
  - Total Sale Amount
  - Total Sold Items
  - Total Not Sold Items
- ✅ Bar Chart showing number of items in price ranges
- ✅ Pie Chart showing unique category distribution
- ✅ Combined API returning data from all endpoints
- ✅ Month dropdown working across components

---

## 🧑‍💻 Developed By

**Vaibhav Ramnath Dhotre**  
MSc(CA), Indira College of Commerce and Science  
[LinkedIn Profile](https://www.linkedin.com/in/vaibhav-dhotre-96b83a224/)
