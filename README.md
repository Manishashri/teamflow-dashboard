# TeamFlow — Team Collaboration Dashboard

A modern, responsive team collaboration dashboard built with React 19, Firebase, and Tailwind CSS.

---

## Features

- **Authentication** — Email/password signup & login via Firebase Auth, persistent sessions, protected routes
- **Dashboard** — Overview stats, completion ring, recent tasks, activity feed, team preview
- **Task Management** — Kanban board (To Do / In Progress / Completed), create/update/delete tasks, priority labels, due dates, progress bars
- **Team** — Member cards with online/offline indicators, search
- **Real-time** — Firestore listeners for live task and activity updates
- **Dark Mode** — Toggle with localStorage persistence
- **Responsive** — Mobile, tablet, and desktop layouts

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 19 + Vite                     |
| Styling      | Tailwind CSS 3 (glassmorphism theme)|
| Routing      | React Router v7                     |
| State        | Context API + custom hooks          |
| Auth & DB    | Firebase v10 (Auth + Firestore)     |
| Icons        | Lucide React                        |
| Deployment   | Vercel                              |

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/teamflow-dashboard.git
cd teamflow-dashboard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Firebase values (see Firebase Setup below)

# 4. Run the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Firebase Setup

### Step 1 — Create a Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** → name it (e.g. `teamflow-dashboard`)
3. Disable Google Analytics (optional) → **Create project**

### Step 2 — Register your web app
1. On the Project Overview page, click the **`</>`** (Web) icon
2. Register the app (any nickname, no hosting needed yet)
3. Copy the `firebaseConfig` object — you'll need these values

### Step 3 — Enable Authentication
1. In the console: **Authentication → Get started**
2. Click **Email/Password** under Sign-in providers → Enable → Save

### Step 4 — Create Firestore Database
1. **Firestore Database → Create database**
2. Choose **"Start in test mode"** (you can tighten rules later)
3. Select a region close to your users → **Done**

### Step 5 — Add config to `.env.local`
```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
```

### Firestore Collections

The app auto-creates documents as users interact. The schema:

```
users/       {uid, displayName, email, role, avatar, online, createdAt}
tasks/       {title, description, status, priority, assignedTo[], dueDate, progress, tags[], createdAt}
activities/  {userId, action, target, icon, createdAt}
notifications/{type, message, read, createdAt}
```

> **Note:** Until Firebase is connected, the app uses mock data automatically — no config needed to preview the UI.

---

## Deployment (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import to Vercel
# Go to https://vercel.com/new → Import from GitHub

# 3. Add environment variables
# In Vercel project settings → Environment Variables
# Add all VITE_FIREBASE_* variables from your .env.local

# 4. Deploy — Vercel auto-builds on every push to main
```

---

## Project Structure

```
src/
├── components/
│   ├── ActivityTimeline.jsx   # Real-time activity feed
│   ├── Loader.jsx             # Spinner + skeleton variants
│   ├── Navbar.jsx             # Top header with search & theme toggle
│   ├── NotificationPanel.jsx  # Notification dropdown
│   ├── ProgressCard.jsx       # Stat widget
│   ├── ProtectedRoute.jsx     # Auth guard
│   ├── Sidebar.jsx            # Collapsible sidebar navigation
│   ├── TaskCard.jsx           # Task card with status cycle
│   └── TeamCard.jsx           # Team member card
├── context/
│   ├── AuthContext.jsx        # Firebase auth state
│   └── ThemeContext.jsx       # Dark/light mode
├── data/
│   └── mockData.js            # Fallback data (no Firebase needed)
├── firebase/
│   └── firebase.js            # Firebase initialization
├── hooks/
│   └── index.js               # useTasks, useTeam, useActivities, useNotifications
├── pages/
│   ├── AppLayout.jsx          # Shell with sidebar + outlet
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Tasks.jsx              # Kanban board + create modal
│   └── Team.jsx
├── utils/
│   └── helpers.js             # Priority/status configs, date utils
├── App.jsx                    # Router setup
├── index.css                  # Tailwind + custom utilities
└── main.jsx
```

---

## Firestore Security Rules (production)

Replace test mode rules with these before going live:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    match /activities/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /notifications/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## License

MIT
