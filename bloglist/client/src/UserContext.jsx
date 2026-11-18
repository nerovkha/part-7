import { createContext, useContext, useState } from 'react'
import loginService from './services/login'
import { setToken } from './services/requests'
import { getUser, removeUser, saveUser } from './services/persistentUser'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = getUser()
    if (stored) {
      setToken(stored.token)
    }
    return stored
  })

  const login = async (credentials) => {
    const loggedIn = await loginService.login(credentials)
    setToken(loggedIn.token)
    saveUser(loggedIn)
    setUser(loggedIn)
    return loggedIn
  }

  const logout = () => {
    setToken(null)
    removeUser()
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext).user

export const useLogin = () => useContext(UserContext).login

export const useLogout = () => useContext(UserContext).logout
