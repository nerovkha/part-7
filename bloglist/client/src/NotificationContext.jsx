import { createContext, useContext, useReducer, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.message }
    case 'CLEAR':
      return { message: null }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { message: null })
  const timeoutRef = useRef(null)

  const notify = (message) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'SHOW', message })
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5 * 1000)
  }

  return (
    <NotificationContext.Provider value={{ message: state.message, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () =>
  useContext(NotificationContext).message

export const useNotify = () => useContext(NotificationContext).notify
