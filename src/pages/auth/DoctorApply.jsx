import { motion } from 'framer-motion'
import { useState } from 'react'
import AuthLayout from '../../components/AuthLayout'
import FormField from '../../components/FormField'
import { useAuth } from '../../contexts/AuthContext'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const DoctorApply = () => {
  const { applyDoctorVerification, profile } = useAuth()
  const [form, setForm] = useState({
    licenseNumber: '',
    specialization: '',
    experienceYears: '',
    hospitalAffiliation: '',
    degreeFile: null,
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await applyDoctorVerification(form)
      setStatus('submitted')
    } catch (err) {
      setError(err.message || 'Unable to submit verification')
      setStatus('idle')
    }
  }

  const currentStatus = profile?.doctorStatus || 'none'

  return (
    <AuthLayout
      badge="Doctor verification"
      title="Submit your credentials"
      subtitle="Verified doctors unlock specialist tools and patient visibility. All submissions are reviewed by MediHelp admins."
    >
      <motion.div initial="hidden" animate="show" variants={fadeIn}>
        <div className="auth-card-header">
          <h2>Doctor verification</h2>
          <p>Provide your credentials to join the verified network.</p>
        </div>

        {currentStatus === 'pending' || status === 'submitted' ? (
          <div className="auth-status">
            <h3>Application received</h3>
            <p>
              Our admin team is reviewing your credentials. You will be notified
              once verification is complete.
            </p>
          </div>
        ) : currentStatus === 'verified' ? (
          <div className="auth-status">
            <h3>You are verified</h3>
            <p>
              Your doctor profile is active. Continue to the platform to assist
              patients.
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Degree certificate</span>
              <input
                className="auth-input auth-input--file"
                type="file"
                name="degreeFile"
                onChange={handleChange}
                required
              />
            </label>
            <FormField
              label="License number"
              name="licenseNumber"
              placeholder="MED-123456"
              value={form.licenseNumber}
              onChange={handleChange}
              required
            />
            <FormField
              label="Specialization"
              name="specialization"
              placeholder="Cardiology"
              value={form.specialization}
              onChange={handleChange}
              required
            />
            <FormField
              label="Years of experience"
              name="experienceYears"
              type="number"
              placeholder="8"
              value={form.experienceYears}
              onChange={handleChange}
              required
            />
            <FormField
              label="Hospital affiliation"
              name="hospitalAffiliation"
              placeholder="City General Hospital"
              value={form.hospitalAffiliation}
              onChange={handleChange}
              required
            />

            {error ? <p className="auth-error">{error}</p> : null}

            <button className="auth-button" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Submit for review'}
            </button>
          </form>
        )}
      </motion.div>
    </AuthLayout>
  )
}

export default DoctorApply
