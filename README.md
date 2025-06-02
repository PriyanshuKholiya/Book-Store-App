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

**How to redeploy on Vercel:**
1. Go to your project dashboard on [vercel.com](https://vercel.com/).
2. Click on your project.
3. Click the **"Deployments"** tab.
4. Click the **"Redeploy"** button on the latest deployment, or push new code to GitHub to trigger an automatic redeploy.

- If you change environment variables, click **"Redeploy"** after saving them.

Enjoy your book store!
