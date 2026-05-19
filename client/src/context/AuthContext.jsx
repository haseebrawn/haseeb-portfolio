import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { adminAuthService } from '../services/adminAuthService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem('adminUser')
    return storedAdmin ? JSON.parse(storedAdmin) : null
  })

  const [token, setToken] = useState(() => localStorage.getItem('adminToken'))
  const [authLoading, setAuthLoading] = useState(true)

  const isAuthenticated = Boolean(token && admin)

  const login = async ({ email, password }) => {
    const response = await adminAuthService.login({ email, password })

    localStorage.setItem('adminToken', response.token)
    localStorage.setItem('adminUser', JSON.stringify(response.data))

    setToken(response.token)
    setAdmin(response.data)

    return response
  }

  const logout = async () => {
    try {
      if (token) {
        await adminAuthService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error.message)
    } finally {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      setToken(null)
      setAdmin(null)
    }
  }

  const checkSession = async () => {
    const storedToken = localStorage.getItem('adminToken')

    if (!storedToken) {
      setAuthLoading(false)
      return
    }

    try {
      const response = await adminAuthService.getMe()

      localStorage.setItem('adminUser', JSON.stringify(response.data))

      setAdmin(response.data)
      setToken(storedToken)
    } catch (error) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      setAdmin(null)
      setToken(null)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  const value = useMemo(
    () => ({
      admin,
      token,
      authLoading,
      isAuthenticated,
      login,
      logout,
      checkSession,
    }),
    [admin, token, authLoading, isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}