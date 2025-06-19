# 🗳️ Voting App

A full-stack voting application built with **FastAPI**, **React**, and **Snowflake**. Users can cast votes on predefined questions, and the results are visualized in real-time with a modern UI.

---

## 📦 Features

- Cast votes for multiple categories (Animal, Food, Drink)
- Real-time result display with percentage-based progress bars
- Responsive frontend using **React** and **Tailwind CSS**
- Backend API with **FastAPI**
- Database integration using **Snowflake**
- Environment-configured secrets via `.env`

---

## 🚀 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React, Tailwind CSS, React Router    |
| Backend   | FastAPI, Pydantic, CORS Middleware   |
| Database  | Snowflake                            |
| Dev Tools | Axios, dotenv, Lucide Icons, Toastify|

---

## 🛠️ Setup Instructions

### 1. Backend (FastAPI + Snowflake)

#### Prerequisites
- Python 3.9+
- Snowflake account
- `.env` file with the following:

```env
SNOWFLAKE_USER=your_user
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_ACCOUNT=your_account_id
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
```

#### Install and Run

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**API Endpoints:**
- `POST /vote`: Submit vote data  
- `GET /results`: Retrieve current voting results

---

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Make sure to define `VITE_API_URL` in a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

---

## 📊 Dashboard

Use `Voting Dashboard.pbix` in Power BI for advanced visual analytics on voting trends.

---

## 📁 Project Structure

```bash
├── backend/
│   ├── main.py
│   ├── database.py
│   └── .env
├── frontend/
│   ├── App.jsx
│   ├── main.jsx
│   ├── axios.js
│   ├── components/
│   │   ├── VoteForm.jsx
│   │   └── Results.jsx
│   └── .env
├──  Visualization
|    ├── Voting Dashboard.pbix
├── Analytics
    ├──Voting Analysis.html
```
