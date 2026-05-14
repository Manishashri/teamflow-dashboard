// ─── useTasks ─────────────────────────────────────────────────────────────────
// Firestore real-time listener for tasks collection.
// Falls back to mock data when Firebase isn't configured.

import { useState, useEffect } from 'react'
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { MOCK_TASKS, MOCK_USERS, MOCK_ACTIVITIES, MOCK_NOTIFICATIONS } from '../data/mockData'

function isFirebaseConfigured() {
  try {
    return db && db.app.options.projectId !== 'YOUR_PROJECT_ID'
  } catch {
    return false
  }
}

// ─── useTasks ─────────────────────────────────────────────────────────────────
export function useTasks() {
  const [tasks,   setTasks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setTimeout(() => { setTasks(MOCK_TASKS); setLoading(false) }, 600)
      return
    }

    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q,
      snap => {
        setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      err => { setError(err.message); setLoading(false) }
    )
    return unsub
  }, [])

  const addTask = async (task) => {
    if (!isFirebaseConfigured()) {
      const newTask = { ...task, id: `t${Date.now()}`, createdAt: new Date().toISOString(), progress: 0 }
      setTasks(prev => [newTask, ...prev])
      return
    }
    await addDoc(collection(db, 'tasks'), { ...task, createdAt: serverTimestamp() })
  }

  const updateTask = async (id, updates) => {
    if (!isFirebaseConfigured()) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
      return
    }
    await updateDoc(doc(db, 'tasks', id), updates)
  }

  const deleteTask = async (id) => {
    if (!isFirebaseConfigured()) {
      setTasks(prev => prev.filter(t => t.id !== id))
      return
    }
    await deleteDoc(doc(db, 'tasks', id))
  }

  return { tasks, loading, error, addTask, updateTask, deleteTask }
}

// ─── useTeam ──────────────────────────────────────────────────────────────────
export function useTeam() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setTimeout(() => { setMembers(MOCK_USERS); setLoading(false) }, 500)
      return
    }

    const unsub = onSnapshot(collection(db, 'users'),
      snap => {
        setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      () => { setMembers(MOCK_USERS); setLoading(false) }
    )
    return unsub
  }, [])

  return { members, loading }
}

// ─── useActivities ────────────────────────────────────────────────────────────
export function useActivities() {

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!isFirebaseConfigured()) {

      setTimeout(() => {
        setActivities(MOCK_ACTIVITIES)
        setLoading(false)
      }, 700)

      return
    }

    const q = query(
      collection(db, 'activities'),
      orderBy('createdAt', 'desc')
    )

    const unsub = onSnapshot(
      q,

      snap => {

        const data = snap.docs.map(d => ({
          id: d.id,
          ...d.data()
        }))

        if (data.length === 0) {
          setActivities(MOCK_ACTIVITIES)
        } else {
          setActivities(data)
        }

        setLoading(false)
      },

      () => {
        setActivities(MOCK_ACTIVITIES)
        setLoading(false)
      }
    )

    return unsub

  }, [])

  return {
    activities,
    loading
  }
}

// ─── useNotifications ─────────────────────────────────────────────────────────
export function useNotifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markRead = (id) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const unreadCount = notifications.filter(n => !n.read).length

  return { notifications, unreadCount, markRead, markAllRead }
}
