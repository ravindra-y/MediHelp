import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
}

const stats = [
  {
    label: 'Active patient queue',
    value: '18',
    meta: 'Awaiting triage',
    trend: '+4 today',
  },
  {
    label: 'Median response time',
    value: '8 min',
    meta: 'Last 24 hours',
    trend: '-12% faster',
  },
  {
    label: 'Verified answers',
    value: '342',
    meta: 'Lifetime quality score',
    trend: '98% rated helpful',
  },
  {
    label: 'Reputation points',
    value: '4,820',
    meta: 'Tier: Platinum',
    trend: '+210 this week',
  },
]

const activity = [28, 40, 32, 58, 46, 64, 52, 70, 62, 78, 60, 74]

const queueItems = [
  {
    id: 'q1',
    patient: 'Olivia Grant',
    specialization: 'Cardiology',
    question: 'Chest tightness after interval training with normal ECG.',
    time: '12m ago',
    emergency: true,
    status: 'Urgent review',
  },
  {
    id: 'q2',
    patient: 'Marcus Boyd',
    specialization: 'Neurology',
    question: 'Persistent tingling in right arm after minor fall.',
    time: '28m ago',
    emergency: false,
    status: 'Needs clarification',
  },
  {
    id: 'q3',
    patient: 'Sofia Nguyen',
    specialization: 'Dermatology',
    question: 'Inflamed rash spreading despite topical steroid use.',
    time: '42m ago',
    emergency: false,
    status: 'Follow-up requested',
  },
  {
    id: 'q4',
    patient: 'James Lin',
    specialization: 'Endocrinology',
    question: 'Morning glucose spikes after changing insulin timing.',
    time: '1h ago',
    emergency: false,
    status: 'Review labs',
  },
]

const notifications = [
  {
    id: 'n1',
    title: 'Emergency flag escalated',
    description: 'Patient Olivia Grant moved to priority queue.',
    time: '2 min ago',
    tone: 'alert',
  },
  {
    id: 'n2',
    title: 'New imaging uploaded',
    description: 'MRI results added to Marcus Boyd case.',
    time: '16 min ago',
    tone: 'info',
  },
  {
    id: 'n3',
    title: 'Community spotlight',
    description: 'Your diabetes protocol ranked top 3 today.',
    time: '48 min ago',
    tone: 'success',
  },
]

const aiSuggestions = [
  {
    id: 'a1',
    title: 'Draft response',
    text: 'Recommend ECG stress test and rule out myocarditis before resuming high intensity.',
  },
  {
    id: 'a2',
    title: 'Red flags',
    text: 'Ask about syncope, radiating pain, and family history of arrhythmia.',
  },
  {
    id: 'a3',
    title: 'Follow-up checklist',
    text: 'Schedule 7-day check-in and request updated vitals + medication list.',
  },
]

const reputationBadges = ['Cardiac Sentinel', 'Rapid Responder', 'Top Educator', 'Trusted Mentor']

const chatMessages = [
  {
    id: 'c1',
    sender: 'Care Team',
    message: 'Can you review the triage plan for Olivia Grant?',
    time: '09:12',
    role: 'team',
  },
  {
    id: 'c2',
    sender: 'You',
    message: 'Reviewing now. Will update with next steps in 5 minutes.',
    time: '09:13',
    role: 'doctor',
  },
  {
    id: 'c3',
    sender: 'Triage AI',
    message: 'Flagged risk score 0.82 due to exertional symptoms.',
    time: '09:14',
    role: 'system',
  },
]

const analytics = [
  {
    id: 'p1',
    label: 'Patient satisfaction',
    value: '94%',
    progress: 94,
    delta: '+2.1%',
  },
  {
    id: 'p2',
    label: 'Case resolution rate',
    value: '88%',
    progress: 88,
    delta: '+3.4%',
  },
  {
    id: 'p3',
    label: 'Follow-up completion',
    value: '86%',
    progress: 86,
    delta: '+6.2%',
  },
]

const responseTemplates = [
  'Ask for additional symptoms',
  'Request lab results',
  'Provide safety guidance',
  'Schedule follow-up',
]

const specializations = ['All', 'Cardiology', 'Neurology', 'Dermatology', 'Endocrinology']

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [specialization, setSpecialization] = useState('All')

  const filteredQueue = useMemo(() => {
    if (specialization === 'All') {
      return queueItems
    }
    return queueItems.filter((item) => item.specialization === specialization)
  }, [specialization])

  return (
    <div className="doctor-shell">
      <div className="doctor-orb doctor-orb--one" />
      <div className="doctor-orb doctor-orb--two" />
      <div className="doctor-orb doctor-orb--three" />
      <div className="doctor-container">
        <motion.header className="doctor-header" initial="hidden" animate="show" variants={fadeUp}>
          <div>
            <p className="doctor-kicker">Verified doctor console</p>
            <h1>Clinical response dashboard</h1>
            <p className="doctor-subtitle">
              Prioritize patient questions, collaborate with care teams, and deliver AI-assisted guidance
              with confidence.
            </p>
          </div>
          <div className="doctor-user">
            <div>
              <p className="doctor-user-name">{user?.displayName || 'Verified Doctor'}</p>
              <p className="doctor-user-role">Advanced care access enabled</p>
            </div>
            <button className="primary-button" type="button">
              Upload medical advice
            </button>
          </div>
        </motion.header>

        <motion.div className="doctor-controls glass-card" initial="hidden" animate="show" variants={fadeUp}>
          <div>
            <p className="doctor-control-label">Filter by specialization</p>
            <select
              className="doctor-select"
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="doctor-control-search">
            <p className="doctor-control-label">Search questions</p>
            <input className="doctor-input" placeholder="Search by symptom or patient" type="text" />
          </div>
          <div className="doctor-control-actions">
            <button className="doctor-button" type="button">
              AI suggestions
            </button>
            <button className="doctor-button doctor-button--ghost" type="button">
              Mark emergency
            </button>
          </div>
        </motion.div>

        <motion.section className="doctor-stats" variants={stagger} initial="hidden" animate="show">
          {stats.map((stat) => (
            <motion.div key={stat.label} className="doctor-panel doctor-stat" variants={fadeUp}>
              <p className="doctor-stat-label">{stat.label}</p>
              <div className="doctor-stat-value">{stat.value}</div>
              <p className="doctor-stat-meta">{stat.meta}</p>
              <span className="doctor-stat-trend">{stat.trend}</span>
            </motion.div>
          ))}
        </motion.section>

        <motion.section className="doctor-activity doctor-panel" initial="hidden" animate="show" variants={fadeUp}>
          <div className="doctor-panel-header">
            <div>
              <h2>Activity graph</h2>
              <p>Questions answered by hour</p>
            </div>
            <div className="doctor-pill">Live</div>
          </div>
          <div className="doctor-activity-graph">
            {activity.map((value, index) => (
              <span
                key={`bar-${index}`}
                className="doctor-activity-bar"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
          <div className="doctor-activity-legend">
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </motion.section>

        <div className="doctor-main-grid">
          <div className="doctor-column">
            <motion.section className="doctor-panel doctor-queue" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Patient queue</h2>
                  <p>Priority questions waiting for response</p>
                </div>
                <span className="doctor-pill">{filteredQueue.length} open</span>
              </div>
              <div className="doctor-queue-list">
                {filteredQueue.map((item) => (
                  <div
                    key={item.id}
                    className={`doctor-queue-item${item.emergency ? ' doctor-queue-item--emergency' : ''}`}
                  >
                    <div>
                      <div className="doctor-queue-title">
                        <span className="doctor-queue-patient">{item.patient}</span>
                        <span className="doctor-queue-time">{item.time}</span>
                      </div>
                      <p className="doctor-queue-question">{item.question}</p>
                      <div className="doctor-queue-tags">
                        <span className="doctor-tag">{item.specialization}</span>
                        <span className="doctor-tag doctor-tag--muted">{item.status}</span>
                        {item.emergency ? <span className="doctor-tag doctor-tag--alert">Emergency</span> : null}
                      </div>
                    </div>
                    <div className="doctor-queue-actions">
                      <button className="doctor-button" type="button">
                        Reply
                      </button>
                      <button className="doctor-button doctor-button--ghost" type="button">
                        Mark emergency
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section className="doctor-panel doctor-reply" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Reply to patient</h2>
                  <p>Compose a verified response with supporting guidance.</p>
                </div>
                <span className="doctor-pill doctor-pill--accent">AI assisted</span>
              </div>
              <textarea
                className="doctor-textarea"
                placeholder="Draft your response, include recommended next steps, and add safety guidance."
                rows={5}
              />
              <div className="doctor-template-list">
                {responseTemplates.map((template) => (
                  <button key={template} className="doctor-template" type="button">
                    {template}
                  </button>
                ))}
              </div>
              <div className="doctor-reply-actions">
                <button className="doctor-button" type="button">
                  Send response
                </button>
                <button className="doctor-button doctor-button--ghost" type="button">
                  Save draft
                </button>
              </div>
            </motion.section>

            <motion.section className="doctor-panel" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Analytics dashboard</h2>
                  <p>Track performance, quality, and patient outcomes.</p>
                </div>
                <span className="doctor-pill">This week</span>
              </div>
              <div className="doctor-analytics-grid">
                {analytics.map((item) => (
                  <div key={item.id} className="doctor-analytics-card">
                    <div className="doctor-analytics-row">
                      <span>{item.label}</span>
                      <span className="doctor-analytics-value">{item.value}</span>
                    </div>
                    <div className="doctor-progress">
                      <span className="doctor-progress-fill" style={{ width: `${item.progress}%` }} />
                    </div>
                    <p className="doctor-analytics-delta">{item.delta} vs last week</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="doctor-column">
            <motion.section className="doctor-panel doctor-ai" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>AI-assisted response</h2>
                  <p>Evidence-aware suggestions for faster replies.</p>
                </div>
                <span className="doctor-pill doctor-pill--success">Online</span>
              </div>
              <div className="doctor-ai-list">
                {aiSuggestions.map((item) => (
                  <div key={item.id} className="doctor-ai-card">
                    <p className="doctor-ai-title">{item.title}</p>
                    <p className="doctor-ai-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section className="doctor-panel doctor-reputation" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Reputation system</h2>
                  <p>Points, badges, and peer recognition.</p>
                </div>
                <span className="doctor-pill">Platinum tier</span>
              </div>
              <div className="doctor-reputation-score">4,820 pts</div>
              <div className="doctor-reputation-row">
                <div>
                  <p className="doctor-reputation-label">Quality score</p>
                  <p className="doctor-reputation-value">98%</p>
                </div>
                <div>
                  <p className="doctor-reputation-label">Response rating</p>
                  <p className="doctor-reputation-value">4.9 / 5</p>
                </div>
                <div>
                  <p className="doctor-reputation-label">Community rank</p>
                  <p className="doctor-reputation-value">Top 3%</p>
                </div>
              </div>
              <div className="doctor-badges">
                {reputationBadges.map((badge) => (
                  <span key={badge} className="doctor-badge">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section className="doctor-panel doctor-notifications" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Notifications</h2>
                  <p>Realtime updates and escalations.</p>
                </div>
                <span className="doctor-pill">3 new</span>
              </div>
              <div className="doctor-notification-list">
                {notifications.map((note) => (
                  <div key={note.id} className={`doctor-notification doctor-notification--${note.tone}`}>
                    <div>
                      <p className="doctor-notification-title">{note.title}</p>
                      <p className="doctor-notification-text">{note.description}</p>
                    </div>
                    <span className="doctor-notification-time">{note.time}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section className="doctor-panel doctor-chat" initial="hidden" animate="show" variants={fadeUp}>
              <div className="doctor-panel-header">
                <div>
                  <h2>Realtime chat</h2>
                  <p>Coordinate with care team and AI triage.</p>
                </div>
                <span className="doctor-pill doctor-pill--accent">Live</span>
              </div>
              <div className="doctor-chat-messages">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`doctor-chat-message doctor-chat-message--${message.role}`}
                  >
                    <div>
                      <p className="doctor-chat-sender">{message.sender}</p>
                      <p className="doctor-chat-text">{message.message}</p>
                    </div>
                    <span className="doctor-chat-time">{message.time}</span>
                  </div>
                ))}
              </div>
              <div className="doctor-chat-input">
                <input className="doctor-input" placeholder="Send a message to the care team" type="text" />
                <button className="doctor-button" type="button">
                  Send
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
