import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { approveDoctor, rejectDoctor, disableUser, removePost, resolveReport } from '../../services/adminApi'
import { useAuth } from '../../contexts/AuthContext'

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const AdminDashboard = () => {
  const { user } = useAuth()
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const loadAdminData = async () => {
    setStatus('loading')
    setError('')
    try {
      const pendingQuery = query(
        collection(db, 'doctorApplications'),
        where('status', '==', 'pending'),
        orderBy('submittedAt', 'desc'),
        limit(8),
      )
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(8),
      )
      const reportsQuery = query(
        collection(db, 'reports'),
        orderBy('createdAt', 'desc'),
        limit(8),
      )

      const [pendingSnapshot, usersSnapshot, reportsSnapshot] = await Promise.all([
        getDocs(pendingQuery),
        getDocs(usersQuery),
        getDocs(reportsQuery),
      ])

      setPendingDoctors(
        pendingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      )
      setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setReports(
        reportsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      )
    } catch (err) {
      setError(err.message || 'Unable to load admin data')
    } finally {
      setStatus('idle')
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleApprove = async (uid) => {
    setStatus('processing')
    setError('')
    try {
      await approveDoctor({ uid })
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to approve doctor')
    } finally {
      setStatus('idle')
    }
  }

  const handleReject = async (uid) => {
    setStatus('processing')
    setError('')
    try {
      await rejectDoctor({ uid })
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to reject doctor')
    } finally {
      setStatus('idle')
    }
  }

  const handleDisableUser = async (uid) => {
    setStatus('processing')
    setError('')
    try {
      await disableUser({ uid })
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to disable user')
    } finally {
      setStatus('idle')
    }
  }

  const handleRemovePost = async (postId) => {
    setStatus('processing')
    setError('')
    try {
      await removePost({ postId })
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to remove post')
    } finally {
      setStatus('idle')
    }
  }

  const handleResolveReport = async (reportId) => {
    setStatus('processing')
    setError('')
    try {
      await resolveReport({ reportId })
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to resolve report')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="admin-shell">
      <motion.header initial="hidden" animate="show" variants={fadeIn}>
        <div>
          <p className="admin-label">Admin control</p>
          <h1>Trust & safety dashboard</h1>
          <p className="admin-subtitle">
            Review doctor applications, manage users, and resolve community reports.
          </p>
        </div>
        <div className="admin-user">
          <span>{user?.displayName || user?.email}</span>
          <button className="ghost-button" type="button" onClick={loadAdminData}>
            Refresh
          </button>
        </div>
      </motion.header>

      {error ? <p className="auth-error">{error}</p> : null}

      <div className="admin-grid">
        <motion.section className="admin-card" initial="hidden" animate="show" variants={fadeIn}>
          <div className="admin-card-header">
            <h2>Doctor verification</h2>
            <span>{pendingDoctors.length} pending</span>
          </div>
          <div className="admin-list">
            {pendingDoctors.length === 0 ? (
              <p className="admin-empty">No pending applications.</p>
            ) : (
              pendingDoctors.map((doctor) => (
                <div key={doctor.id} className="admin-item">
                  <div>
                    <p className="admin-item-title">{doctor.specialization || 'Specialist'}</p>
                    <p className="admin-item-subtitle">License: {doctor.licenseNumber}</p>
                    <p className="admin-item-meta">
                      {doctor.hospitalAffiliation || 'Hospital not provided'}
                    </p>
                  </div>
                  <div className="admin-actions">
                    <button
                      className="admin-button"
                      type="button"
                      onClick={() => handleApprove(doctor.uid)}
                      disabled={status === 'processing'}
                    >
                      Approve
                    </button>
                    <button
                      className="admin-button admin-button--ghost"
                      type="button"
                      onClick={() => handleReject(doctor.uid)}
                      disabled={status === 'processing'}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.section>

        <motion.section className="admin-card" initial="hidden" animate="show" variants={fadeIn}>
          <div className="admin-card-header">
            <h2>User management</h2>
            <span>{users.length} recent</span>
          </div>
          <div className="admin-list">
            {users.length === 0 ? (
              <p className="admin-empty">No users available.</p>
            ) : (
              users.map((item) => (
                <div key={item.id} className="admin-item">
                  <div>
                    <p className="admin-item-title">{item.displayName || 'User'}</p>
                    <p className="admin-item-subtitle">{item.email}</p>
                    <p className="admin-item-meta">Role: {item.role || 'patient'}</p>
                  </div>
                  <div className="admin-actions">
                    <button
                      className="admin-button admin-button--ghost"
                      type="button"
                      onClick={() => handleDisableUser(item.uid)}
                      disabled={status === 'processing'}
                    >
                      Disable
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.section>

        <motion.section className="admin-card" initial="hidden" animate="show" variants={fadeIn}>
          <div className="admin-card-header">
            <h2>Reports & spam</h2>
            <span>{reports.length} open</span>
          </div>
          <div className="admin-list">
            {reports.length === 0 ? (
              <p className="admin-empty">No reports submitted.</p>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="admin-item">
                  <div>
                    <p className="admin-item-title">{report.reason || 'Reported post'}</p>
                    <p className="admin-item-subtitle">Post: {report.postId}</p>
                    <p className="admin-item-meta">By: {report.reportedBy || 'Anonymous'}</p>
                  </div>
                  <div className="admin-actions">
                    <button
                      className="admin-button"
                      type="button"
                      onClick={() => handleRemovePost(report.postId)}
                      disabled={status === 'processing'}
                    >
                      Remove post
                    </button>
                    <button
                      className="admin-button admin-button--ghost"
                      type="button"
                      onClick={() => handleResolveReport(report.id)}
                      disabled={status === 'processing'}
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.section>
      </div>

      <p className="admin-note">
        Admin actions call secure Cloud Functions to update custom claims and lock accounts.
      </p>
    </div>
  )
}

export default AdminDashboard
