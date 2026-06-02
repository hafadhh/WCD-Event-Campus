import {
    createContext,
    useContext,
    useState
  } from 'react'
  
  const AuthContext = createContext()
  
  export function AuthProvider({ children }) {
    const [user, setUser] = useState({
      name: 'Haedee'
    })
  
    const login = () => {
      setUser({
        name: 'Haedee'
      })
    }
  
    const logout = () => {
      setUser(null)
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    return useContext(AuthContext)
  }