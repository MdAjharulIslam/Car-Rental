🚘 Car Rental Web App

A full-stack MERN car rental platform that allows users to browse, book, and pay for cars with secure authentication and a powerful admin dashboard.
Built for performance, scalability, and modern design — perfect for showcasing on your resume or portfolio.

Visit 👉 https://car-rental-rho-umber.vercel.app

🧭 Table of Contents

Features

Tech Stack

Screenshots

Folder Structure

Installation

Environment Variables

Usage

API Endpoints

Admin Dashboard

Future Enhancements

Author

✨ Features
🔐 User Features

Register & Login with JWT authentication

View available cars by city, pickup date, and return date

Make bookings with integrated payment system (Stripe/PayPal)

Manage your bookings and payment history

Mobile-friendly responsive design

🧑‍💼 Admin Features

Admin Dashboard for managing cars, bookings, and users

Add, update, or delete car listings

Approve or cancel bookings

View earnings and system statistics

💎 General Features

Beautiful animated UI with Framer Motion

Date-based car availability system

Search and filter cars by location and type

Secure bcrypt password hashing

RESTful API with MongoDB backend

Toast notifications and clean form validation

🛠 Tech Stack
Layer	Technologies
Frontend	React.js, Tailwind CSS, Framer Motion, Swiper.js
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT, bcrypt
Payment	Stripe / PayPal (configurable)
State Management	React Context API
Deployment	Vercel / Render / Netlify / MongoDB Atlas
🖼 Screenshots
Landing Page	Car Listing	Booking Page	Admin Dashboard

	
	
	



📂 Folder Structure
car-rental-app/
│
├── client/                     # React frontend
│   ├── src/
│   │   ├── assets/             # Images, icons, data
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Global context (AppContext)
│   │   ├── pages/              # Main pages (Home, Cars, Booking)
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Express backend
│   ├── models/                 # MongoDB models
│   ├── routes/                 # Express routes
│   ├── controllers/            # Logic for API routes
│   ├── middleware/             # Auth & validation
│   ├── config/                 # DB and environment setup
│   └── server.js
│
├── .env.example
├── README.md
└── package.json

⚙️ Installation
1. Clone the repository
git clone https://github.com/mdajharulislam/car-rental-app.git
cd car-rental-app

2. Install dependencies

For backend

cd server
npm install


For frontend

cd ../client
npm install

3. Configure environment variables

Create .env files in both client and server directories (see below).



🚀 Usage
Run backend
cd server
npm start

Run frontend
cd client
npm run dev



🧮 Admin Dashboard

The admin panel allows:

Managing cars and inventory

Monitoring all bookings

Checking total revenue

Viewing registered users

Managing status (approve/reject bookings)

🧠 Future Enhancements

✅ Google / Facebook OAuth login

✅ Multi-language support

✅ Real-time notifications (Socket.io)

✅ Discount coupons and loyalty points

✅ Car image gallery with 360° view

✅ Mobile app (React Native)

👨‍💻 Author



⭐ Support

If you find this project helpful, please consider giving it a ⭐ on GitHub — it really helps me grow as a developer!