import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios, { AxiosError } from 'axios'

// Type definitions
export interface User {
  id?: string;
  token: string;
  username: string;
  roles: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'http://localhost:8080/api/auth'

/* implements Context API for Login fun in entire application. */
const AuthContext = createContext<AuthContextType | undefined>(undefined)
/* Custom hook to access authentication context. 
   Creates a context to hold authentication state and methods */
export const useAuth = (): AuthContextType => { 
	const context = useContext(AuthContext) 
	if (!context) { 
		throw new Error('useAuth must be used within an AuthProvider') } 
	return context
}
/* The actual function that holds authentication state and methods */
export const AuthProvider = ({ children }: AuthProviderProps) => { 	
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => { // Check for existing user 		
		const storedUser = localStorage.getItem('user') 
		if (storedUser){ 
        try {
          setUser(JSON.parse(storedUser)) 
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('user')
        }
     } 
     setLoading(false) }, 
  [])

    const login = async (username: string, password: string): Promise<any> => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      })
      
      console.log('Login response:', response.data)
      // Store user data in local storage
      const uObject: User = {
        id: response.data.id,
        token: response.data.token,
        username: response.data.username,
        roles: response.data.roles || []
      }
      localStorage.setItem('user', JSON.stringify(uObject))  
      // Update state
      setUser(uObject)
      setLoading(false)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 401) {
        console.log('Invalid credentials')
        throw new Error('Invalid credentials')
      }
      if (axiosError.response?.status === 403) {
        console.log('Access denied')
        throw new Error('Access denied')
      }
      console.error('Login error:', error)
      throw new Error('Login failed')
    } finally { setLoading(false) }  }

      const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: name,
        email,
        password
      })
      console.log('Register response:', response.data)
    } catch (error) {
      console.error('Register error:', error)
      throw new Error('Register failed')
    }
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const getToken = (): string | null => {
    try {
      const storedUser = localStorage.getItem('user')
      const user = storedUser ? JSON.parse(storedUser) as User : null
      return user ? user.token : null
    } catch (error) {
      console.error('Error getting token:', error)
      return null
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    getToken,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
 }
