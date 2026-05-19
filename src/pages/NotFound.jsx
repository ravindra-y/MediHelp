import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="auth-shell">
      <div className="auth-card auth-card--center">
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link className="auth-button" to="/">
          Return home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
