import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router'
import ErrorBoundary from './ErrorBoundary'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'

const RoutedApp = () => {
  const location = useLocation()

  return (
    <div>
      <Navigation />
      <Notification />
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

const App = () => (
  <Router>
    <RoutedApp />
  </Router>
)

export default App
