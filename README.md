[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZroWLq75)
# -mern-test-template

<!-- Project: Student Course Management System -->
Student Course Management System 
Objective 
Build course management system. 
Section 1: Backend (25 Marks) 
Course Model: 
courseName 
courseDescription 
instructor 
createdAt 
Student Model : 
name 
email 
password 
Required APIs: 
POST /api/auth/register 
POST /api/auth/login 
POST /api/courses 
GET /api/courses 
DELETE /api/courses/:id 
Section 2: Frontend (25 Marks) 
Pages: 
• Register 
• Login 
• Courses dashboard 
Features: 
• Create course 
• View courses 
• Delete course 
Section 3: Integration (20 Marks) 
Students must: 
• Connect React with backend 
• Show courses dynamically 
Section 4: Advanced Feature (15 Marks) 
Implement ANY ONE: 
• Search courses 
• Filter courses 
• Edit course

---

## Implemented Project

### Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React + Vite

### Completed Requirements
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/courses`
- GET `/api/courses`
- DELETE `/api/courses/:id`
- Frontend pages: Register, Login, Courses Dashboard
- Integration completed with dynamic course create/view/delete
- Advanced feature implemented: Search courses

## Run Locally

### 1) Backend setup
1. Go to `backend` folder
2. Install dependencies: `npm install`
3. Create `.env` file using `.env.example`
4. Start server: `npm run dev`

### 2) Frontend setup
1. Go to `frontend` folder
2. Install dependencies: `npm install`
3. Create `.env` file using `.env.example`
4. Start app: `npm run dev`

Frontend runs on Vite dev server and calls backend via `VITE_API_URL`.