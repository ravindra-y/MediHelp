import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormField from '../../components/FormField'
import { useAuth } from '../../contexts/AuthContext'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const Register = () => {
  const { registerWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    wantsDoctor: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await registerWithEmail({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      navigate(form.wantsDoctor ? '/auth/doctor-apply' : '/', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      badge="Trusted onboarding"
      title="Create your MediHelp account"
      subtitle="Join a verified care community with secure sessions, protected routes, and doctor validation workflows."
    >
      <motion.div initial="hidden" animate="show" variants={fadeIn}>
        <div className="auth-card-header">
          <h2>Get started</h2>
          <p>Sign up in seconds with email or Google.</p>
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
          <span>or create with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField
            label="Full name"
            name="name"
            placeholder="Dr. Amina Kaur"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
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
            autoComplete="new-password"
            required
          />
          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="********"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <label className="auth-checkbox">
            <input
              type="checkbox"
              name="wantsDoctor"
              checked={form.wantsDoctor}
              onChange={handleChange}
            />
            <span>I am a doctor and need verification</span>
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/auth/login">Sign in</Link>
        </div>
      </motion.div>
    </AuthLayout>
  )
}

export default Register
