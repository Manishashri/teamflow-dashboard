// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
//
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it (e.g. "teamflow-dashboard")
// 3. Disable Google Analytics (optional), click "Create project"
// 4. On the project overview, click the </> (Web) icon to register your app
// 5. Copy the firebaseConfig object below and replace the placeholder values
// 6. In the Firebase console:
//    a. Authentication → Get started → Enable "Email/Password"
//    b. Firestore Database → Create database → Start in test mode → choose region
// 7. Rename this file from firebase.js.example → firebase.js (already done)
//    and fill in your real values.
//
// ⚠️  NEVER commit real API keys to a public repo.
//    Add src/firebase/firebase.js to .gitignore,
//    or use VITE_ environment variables (see README).
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth }        from 'firebase/auth'
import { getFirestore }   from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'YOUR_API_KEY',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'YOUR_PROJECT.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'YOUR_PROJECT_ID',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'YOUR_PROJECT.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| 'YOUR_SENDER_ID',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || 'YOUR_APP_ID',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db   = getFirestore(app)
export default app
