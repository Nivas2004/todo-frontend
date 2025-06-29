# 📝 Todo App (Frontend)

A modern, full-featured task manager built using **React + Vite**, with Google Authentication and real-time backend integration.

---

## 🔗 Live Links

- 🌐 **Frontend (Vercel)**: [https://todo-frontend-ruby-delta.vercel.app](https://todo-frontend-ruby-delta.vercel.app)
- 🔧 **Backend (Render)**: [https://todo-backend-o2ho.onrender.com](https://todo-backend-o2ho.onrender.com)
  
## 🚀 Deployment

- **Frontend (Vercel)** 👉 [Live App](https://todo-frontend-ruby-delta.vercel.app)
- **Backend (Render)** 👉 [API Server](https://todo-backend-o2ho.onrender.com)

## Frontend + Backend project Link  -->  [App link](https://todo-frontend-nyyjdpgbq-nivas-projects-03ed492c.vercel.app/)
---

## ✨ Features

- 🔐 Google Sign-In (via Firebase)
- ✅ Create, edit, delete tasks
- 📆 Set due dates and tags
- 👥 Share tasks with others
- 🎯 Mark tasks as completed
- 📱 Responsive and mobile-friendly UI
- 🌈 Animated and themed interface

---

## 🛠️ Tech Stack

### Frontend:
- React + Vite
- Firebase Auth
- Axios
- Custom CSS / Tailwind CSS (optional)
- Vercel (deployment)

### Backend (connected via REST API):
- Node.js + Express
- MongoDB (via Mongoose)
- JWT Auth
- Hosted on Render

---

## 📦 Getting Started (Local Development)

```bash
# Clone the frontend repo
git clone https://github.com/YOUR_USERNAME/todo-frontend.git
cd todo-frontend

# Install dependencies
npm install

# Create a .env file and add:
VITE_BACKEND_URL=https://todo-backend-o2ho.onrender.com
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
...

# Start the app
npm run dev
