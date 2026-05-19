import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormField from '../../components/FormField'
import { useAuth } from '../../contexts/AuthContext'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const Login = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const redirectPath = location.state?.from || '/'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmail(form.email, form.password)
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      badge="Secure access"
      title="Welcome back to MediHelp"
      subtitle="Continue your care journey with verified doctors, role-based access, and persistent sessions."
    >
      <motion.div initial="hidden" animate="show" variants={fadeIn}>
        <div className="auth-card-header">
          <h2>Sign in</h2>
          <p>Use your email or continue with Google.</p>
        </div>

        <button
          className="auth-social"
          type="button"
          onClick={handleGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@medihelp.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          <span>New to MediHelp?</span>
          <Link to="/auth/register">Create an account</Link>
        </div>
      </motion.div>
    </AuthLayout>
  )
}

export default Login
