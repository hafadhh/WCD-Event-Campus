import { createContext, useContext, useState, useEffect } from 'react'
import { findUserByEmail } from '../data/users'

const AuthContext = createContext()

const SESSION_KEY = 'wcd_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Sync ke sessionStorage setiap kali user berubah
  useEffect(() => {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [user])

  /**
   * Login — return { success, error, role }
   */
  function login(email, password) {
    const found = findUserByEmail(email)

    if (!found) {
      return { success: false, error: 'Email tidak terdaftar.' }
    }

    if (found.password !== password) {
      return { success: false, error: 'Password salah.' }
    }

    // Jangan simpan password di session
    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    }

    setUser(sessionUser)
    return { success: true, role: found.role }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
