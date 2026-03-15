🎓 LNMIIT Placement Preparation Portal












A full-stack Placement Preparation Platform designed for students to organize their placement journey.
The portal centralizes company preparation material, interview experiences, resources, and placement tracking in a single modern web interface.

This project demonstrates full-stack development, authentication, REST APIs, database design, and deployment practices.

🌐 Live Application

Frontend

https://your-project-name.vercel.app

Backend API

https://your-backend-name.onrender.com
📸 Project Screenshots
Home Page
<img src="docs/homepage.png" width="800">
Dashboard
<img src="docs/dashboard.png" width="800">
Placement Tracker
<img src="docs/placement_tracker.png" width="800">
Interview Experiences
<img src="docs/experiences.png" width="800">

(Add screenshots later by creating a /docs folder in your repo.)

🚀 Features
🔐 Authentication

Secure user registration and login

JWT based authentication

Protected routes for logged-in users

📊 Dashboard

Overview of platform features

Navigation hub for preparation resources

🏢 Company Preparation

Browse company-wise preparation content

View commonly asked interview questions

📚 Resources & Notes

Curated subject-wise notes

Organized preparation material

💬 Interview Experiences

Students share real interview experiences

Learn interview rounds, questions, and strategies

✍️ Add Experience

Users can contribute interview experiences

Community knowledge sharing

📈 Placement Tracker

Track company placements

View role, CTC, stipend, and statistics

📊 Dynamic Statistics

Home page displays:

Total companies

Total resources

Core subjects

Questions

Portal visitors

🛠 Tech Stack
Frontend

React.js

Vite

Tailwind CSS

React Router

Backend

Node.js

Express.js

REST API Architecture

JWT Authentication

Database

MongoDB Atlas

Mongoose ODM

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

🏗 System Architecture
User
  │
  ▼
Frontend (React + Vite)
  │
  │ API Requests
  ▼
Backend (Node.js + Express)
  │
  │ Mongoose Queries
  ▼
MongoDB Atlas Database

Deployment Architecture

Vercel (Frontend)
       │
       ▼
Render (Backend API)
       │
       ▼
MongoDB Atlas (Database)
📁 Project Structure
LNMIIT-Placement-Portal
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── api
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── middleware
│   └── server.js
│
└── README.md
⚙️ Local Installation
Clone Repository
git clone https://github.com/your-username/placement-portal.git
cd placement-portal
🖥 Backend Setup

Navigate to backend

cd backend

Install dependencies

npm install

Create .env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend

npm run server

Backend runs on

http://localhost:5000
🌐 Frontend Setup

Navigate to frontend

cd frontend

Install dependencies

npm install

Create .env

VITE_API_URL=http://localhost:5000/api

Run frontend

npm run dev

Frontend runs on

http://localhost:5173
🔌 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Companies
GET /api/companies
POST /api/companies
Resources
GET /api/resources
POST /api/resources
Experiences
GET /api/experiences
POST /api/experiences
Placement Tracker
GET /api/placements
POST /api/placements
Statistics
GET /api/stats
🚀 Deployment
Frontend (Vercel)

Import GitHub repository

Set root directory

frontend

Add environment variable

VITE_API_URL=https://your-backend.onrender.com/api
Backend (Render)

Create Web Service

Root directory

backend

Start command

npm start

Environment variables

MONGO_URI
JWT_SECRET
PORT
Database (MongoDB Atlas)

Create cluster

Create database user

Add IP access rule

0.0.0.0/0

Use connection string in backend .env

🔒 Security

JWT Authentication

Protected routes

Environment variable protection

Secure password hashing (bcrypt)

📈 Future Improvements

Admin dashboard

Question bookmarking

Advanced search and filtering

Placement analytics

Email notifications

Mobile responsive improvements

Dark mode support

👨‍💻 Author

RACHIT CHAWLA

Engineering Student
LNMIIT Jaipur

GitHub

https://github.com/your-username
