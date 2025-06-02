# Book Store

This is a simple online book store built with React for the frontend and Node.js/Express for the backend.  
It uses MongoDB Atlas to store books, users, carts, and orders.

**Features:**
- Browse and search books
- Register and log in as a user
- Add books to your cart and checkout
- Admin dashboard to manage books and view stats

**How to run locally:**
1. Clone this repo.
2. Run the backend (`cd server && npm install && node index.js`).
3. Run the frontend (`npm install && npm run dev`).
4. Make sure you have a `.env` file in `/server` with your MongoDB connection string.

---

## How to Deploy Online (Step-by-Step)

### 1. **Database (MongoDB Atlas)**
- Already set up in the cloud. No deployment needed.
- Make sure your cluster is running and your connection string is correct.

### 2. **Backend (Render)**
1. Go to [render.com](https://render.com/) and log in with GitHub.
2. Click **"New Web Service"** and connect your GitHub repo.
3. Set the root directory to `server` (if your backend is in `/server`).
4. Set build command: `npm install`
5. Set start command: `node index.js`
6. Add your environment variables (like `MONGODB_URI`) in the Render dashboard.
7. Deploy. You’ll get a public backend URL (e.g., `https://your-backend.onrender.com`).

### 3. **Frontend (Vercel)**
1. Go to [vercel.com](https://vercel.com/) and log in with GitHub.
2. Import your repo and deploy.
3. In your frontend code, replace all `http://localhost:5000` with your Render backend URL.
   - You can use an environment variable (like `VITE_API_URL`) for this.
4. Redeploy your frontend if you change the API URL.

---

**Summary:**  
- MongoDB Atlas hosts your database.
- Render hosts your backend API.
- Vercel hosts your frontend React app.
- Your frontend talks to your backend, which talks to MongoDB Atlas.

Enjoy your book store!
