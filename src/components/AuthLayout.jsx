import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import productLogo from '../assets/product_logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const AuthLayout = ({ title, subtitle, children, badge = 'Secure access' }) => {
  return (
    <div className="auth-shell">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />
      <div className="auth-orb auth-orb--three" />

      <div className="auth-grid">
        <motion.section
          className="auth-hero"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <Link to="/" className="auth-brand">
            <span className="auth-logo">
              <img src={productLogo} alt="MediHelp" />
            </span>
            <span>
              <span className="auth-brand-title">MediHelp</span>
              <span className="auth-brand-subtitle">AI + Doctor Consensus</span>
            </span>
          </Link>
          <div className="auth-hero-card">
            <span className="auth-hero-badge">{badge}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="auth-hero-metrics">
              <div>
                <p>2,140+</p>
                <span>Verified doctors</span>
              </div>
              <div>
                <p>4 min</p>
                <span>Avg response</span>
              </div>
              <div>
                <p>99.2%</p>
                <span>Triage accuracy</span>
              </div>
            </div>
          </div>
          <div className="auth-hero-strip">
            <span>HIPAA-aligned workflows</span>
            <span>JWT-ready sessions</span>
            <span>Role-based routing</span>
          </div>
        </motion.section>

        <motion.section
          className="auth-card"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          {children}
        </motion.section>
      </div>
    </div>
  )
}

export default AuthLayout
