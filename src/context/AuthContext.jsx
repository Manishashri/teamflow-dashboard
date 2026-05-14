
import { createContext, useContext, useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db } from '../firebase/firebase'
import { ADMIN_ROLES } from '../data/mockData'

const AuthContext = createContext(null)

// ─────────────────────────────────────────────────────────────────────────────
// Static Admin Account
// ─────────────────────────────────────────────────────────────────────────────

const STATIC_ADMIN = {
  uid: 'static-admin',
  email: 'admin@orionshift.com',
  displayName: 'Admin',
  name: 'Admin',
  role: 'CEO',
  isAdmin: true,
  online: true,
  color: '#3b6ee8',
}

function isFirebaseConfigured() {
  try {
    return auth && auth.app.options.apiKey !== 'YOUR_API_KEY'
  } catch {
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth Provider
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loginType, setLoginType] = useState(null)
  const [loading, setLoading] = useState(true)

  // ───────────────────────────────────────────────────────────────────────────
  // Signup
  // ───────────────────────────────────────────────────────────────────────────

  async function signup(
    email,
    password,
    displayName,
    role = 'Team Member'
  ) {

    const isAdminRole = ADMIN_ROLES.includes(role)

    // Mock signup fallback
    if (!isFirebaseConfigured()) {

      const mockUser = {
        uid: `mock-${Date.now()}`,
        email,

        name: displayName,
        displayName: displayName,

        role,
        isAdmin: isAdminRole,

        online: true,

        color: isAdminRole
          ? '#3b6ee8'
          : '#10b981',

        avatar:
          `https://api.dicebear.com/8.x/notionists/svg?seed=${encodeURIComponent(displayName)}`
      }

      setCurrentUser({
        uid: mockUser.uid,
        email,
        displayName
      })

      setUserProfile(mockUser)

      setLoginType(
        isAdminRole ? 'admin' : 'user'
      )

      setLoading(false)

      return
    }

    // Firebase Signup
    const { user } =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

    // Firebase Auth display name
    await updateProfile(user, {
      displayName
    })

    // Firestore user profile
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,

        // Main profile
        name: displayName,
        displayName: displayName,
        email: user.email,

        // Role system
        role: role,
        isAdmin: isAdminRole,

        // UI fields
        online: true,

        color: isAdminRole
          ? '#3b6ee8'
          : '#10b981',

        avatar:
          `https://api.dicebear.com/8.x/notionists/svg?seed=${encodeURIComponent(displayName)}`,

        createdAt: serverTimestamp(),
      }
    )

    return user
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Login
  // ───────────────────────────────────────────────────────────────────────────

  async function login(
    email,
    password,
    type = 'user'
  ) {

    // Static admin shortcut
    if (
      email === STATIC_ADMIN.email &&
      password === 'Admin@2024'
    ) {

      setCurrentUser({
        uid: STATIC_ADMIN.uid,
        email,
        displayName: STATIC_ADMIN.displayName
      })

      setUserProfile(STATIC_ADMIN)

      setLoginType('admin')

      setLoading(false)

      return
    }

    if (!isFirebaseConfigured()) {
      throw {
        code: 'auth/invalid-credential'
      }
    }

    const cred =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

    const snap =
      await getDoc(
        doc(db, 'users', cred.user.uid)
      )

    const profile =
      snap.exists()
        ? snap.data()
        : {}

    const isAdmin =
      ADMIN_ROLES.includes(profile.role)

    // Prevent wrong login type
    if (type === 'admin' && !isAdmin) {

      await signOut(auth)

      throw {
        code: 'auth/not-admin',
        message:
          'This account does not have admin privileges.'
      }
    }

    if (type === 'user' && isAdmin) {

      await signOut(auth)

      throw {
        code: 'auth/use-admin-login',
        message:
          'Please use the Admin Login for this account.'
      }
    }

    setLoginType(type)

    return cred.user
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Logout
  // ───────────────────────────────────────────────────────────────────────────

  async function logout() {

    if (isFirebaseConfigured()) {
      await signOut(auth)
    }

    setCurrentUser(null)
    setUserProfile(null)
    setLoginType(null)
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Auth State Observer
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {

    if (!isFirebaseConfigured()) {
      setLoading(false)
      return
    }

    const unsub =
      onAuthStateChanged(
        auth,
        async (user) => {

          setCurrentUser(user)

          if (user) {

            try {

              const snap =
                await getDoc(
                  doc(db, 'users', user.uid)
                )

              const profile =
                snap.exists()
                  ? snap.data()
                  : null

              setUserProfile(profile)

              setLoginType(
                profile &&
                ADMIN_ROLES.includes(profile.role)
                  ? 'admin'
                  : 'user'
              )

            } catch {

              setUserProfile(null)
            }

          } else {

            setUserProfile(null)
            setLoginType(null)
          }

          setLoading(false)
        }
      )

    return unsub

  }, [])

  // ───────────────────────────────────────────────────────────────────────────
  // Context Value
  // ───────────────────────────────────────────────────────────────────────────

  const isAdmin = loginType === 'admin'

  const value = {
    currentUser,
    userProfile,
    loginType,
    isAdmin,
    signup,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// useAuth Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useAuth() {

  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return ctx
}

