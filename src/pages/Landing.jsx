import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import productLogo from '../assets/product_logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const postTypes = [
  'Health question',
  'Medicine verification',
  'Prescription review',
  'Skin/injury image upload',
  'Emergency help request',
]

const categories = [
  'Respiratory',
  'Dermatology',
  'Pediatrics',
  'Mental Health',
  'Urgent Care',
  'Medication Safety',
  'Cardiology',
  'Women\'s Health',
]

const trendingPosts = [
  {
    title: 'Can I combine ibuprofen and amoxicillin?',
    reactions: '1.2k votes',
  },
  {
    title: 'Sudden chest tightness after exercise',
    reactions: '842 votes',
  },
  {
    title: 'Rash after new skincare routine',
    reactions: '693 votes',
  },
  {
    title: 'Prescription refill timing advice',
    reactions: '610 votes',
  },
]

const liveSignals = [
  { label: 'Socket.io feed', value: 'Connected', status: 'Live' },
  { label: 'Active doctors', value: '214', status: 'Online' },
  { label: 'New replies', value: '38', status: 'Last 5 min' },
]

const aiFeatures = [
  {
    title: 'AI Symptom Checker',
    description: 'Multi-symptom triage with context and severity cues.',
    icon: 'pulse',
  },
  {
    title: 'Medicine Image Scanner',
    description: 'Identifies pills, packaging, and interaction risks.',
    icon: 'scan',
  },
  {
    title: 'Prescription OCR Reader',
    description: 'Extracts dosage, schedule, and refill instructions.',
    icon: 'doc',
  },
  {
    title: 'AI Risk Detection',
    description: 'Flags allergies, contraindications, and red-flag symptoms.',
    icon: 'shield',
  },
  {
    title: 'AI Doctor Reply Summary',
    description: 'Summarizes verified doctor consensus into key actions.',
    icon: 'spark',
  },
  {
    title: 'Emergency Alert Detection',
    description: 'Escalates critical signals with urgent guidance.',
    icon: 'alert',
  },
]

const aiFlow = [
  {
    index: '01',
    title: 'Upload image or text',
    detail: 'Symptoms, medicine photos, or prescriptions.',
    active: true,
  },
  {
    index: '02',
    title: 'AI analyzes content',
    detail: 'Vision, OCR, and medical context models.',
  },
  {
    index: '03',
    title: 'Risk level generated',
    detail: 'Safe, Warning, or Critical classification.',
  },
  {
    index: '04',
    title: 'Care suggestion',
    detail: 'Home care, consult doctor, or emergency treatment.',
  },
]

const riskLevels = [
  {
    level: 'Safe',
    description: 'Low-risk symptoms and routine monitoring advised.',
    tone: 'risk-card--safe',
    tag: 'Green',
  },
  {
    level: 'Warning',
    description: 'Potential concerns detected. Consult a doctor.',
    tone: 'risk-card--warning',
    tag: 'Yellow',
  },
  {
    level: 'Critical',
    description: 'High-risk signals. Emergency care recommended.',
    tone: 'risk-card--critical',
    tag: 'Red',
  },
]

const careSuggestions = [
  {
    title: 'Home care',
    detail: 'Track symptoms, hydrate, and monitor changes.',
  },
  {
    title: 'Consult doctor',
    detail: 'Book a visit for persistent or worsening symptoms.',
  },
  {
    title: 'Emergency treatment',
    detail: 'Seek urgent care when critical signs appear.',
  },
]

const processingStages = [
  {
    title: 'Symptom analysis',
    status: 'Running',
    progress: '72%',
    highlight: 'text-emerald-300',
    tone: 'ai-process-card--active',
  },
  {
    title: 'Risk engine',
    status: 'Warning',
    progress: '46%',
    highlight: 'text-yellow-300',
    tone: 'ai-process-card--warning',
  },
  {
    title: 'Emergency alerts',
    status: 'Monitoring',
    progress: '90%',
    highlight: 'text-rose-300',
    tone: 'ai-process-card--critical',
  },
]

const aiDoctorSummary = {
  title: 'Consensus summary',
  summary:
    'Doctors recommend monitoring breathing rate, resting, and scheduling a same-day visit if symptoms escalate.',
  actions: ['Monitor vitals', 'Schedule visit', 'Avoid exertion'],
}

const posts = [
  {
    id: 1,
    type: 'Health question',
    title: 'Lingering cough with mild fever after travel',
    body:
      'I have had a dry cough and low-grade fever for 5 days after a long flight. No shortness of breath yet. What should I monitor?',
    category: 'Respiratory',
    tags: ['cough', 'fever', 'travel'],
    votes: 482,
    comments: 64,
    doctorReplies: 9,
    time: '12 min ago',
    author: { name: 'Jordan R.', role: 'Community member', anonymous: false },
    consensus: { percent: 84, verified: 12, total: 18 },
    agreements: { agree: 10, caution: 2, disagree: 1 },
    aiSummary:
      'Most doctors recommend hydration, monitoring oxygen saturation, and testing if symptoms persist beyond 7 days.',
    replies: [
      {
        name: 'Dr. Patel',
        specialty: 'Pulmonology',
        note: 'Monitor breathing rate and get a rapid test if fever spikes.',
        verified: true,
      },
      {
        name: 'Dr. Ling',
        specialty: 'Primary Care',
        note: 'Avoid strenuous activity and track symptoms daily.',
        verified: true,
      },
    ],
    liveUpdates: '4 new replies',
    saved: true,
  },
  {
    id: 2,
    type: 'Medicine verification',
    title: 'Safe to take melatonin with sertraline?',
    body:
      'I am on sertraline 50mg and considering melatonin for sleep. Any interactions or timing concerns?',
    category: 'Medication Safety',
    tags: ['sertraline', 'melatonin', 'sleep'],
    votes: 356,
    comments: 41,
    doctorReplies: 7,
    time: '28 min ago',
    author: { name: 'Anonymous', role: 'Anonymous', anonymous: true },
    consensus: { percent: 78, verified: 9, total: 13 },
    agreements: { agree: 8, caution: 3, disagree: 0 },
    aiSummary:
      'Consensus suggests low-dose melatonin is generally safe with monitoring for drowsiness and timing around evening.',
    replies: [
      {
        name: 'Dr. Mendez',
        specialty: 'Psychiatry',
        note: 'Start low (1-2mg) and avoid late-night doses to reduce grogginess.',
        verified: true,
      },
      {
        name: 'Dr. Gray',
        specialty: 'Pharmacology',
        note: 'No major interaction expected, but watch for vivid dreams.',
        verified: true,
      },
    ],
    liveUpdates: '2 new replies',
    saved: false,
  },
  {
    id: 3,
    type: 'Prescription review',
    title: 'Review my new asthma inhaler schedule',
    body:
      'Doctor prescribed budesonide twice daily and albuterol as needed. Does this schedule look right?',
    category: 'Respiratory',
    tags: ['asthma', 'inhaler', 'schedule'],
    votes: 219,
    comments: 29,
    doctorReplies: 5,
    time: '45 min ago',
    author: { name: 'Meera S.', role: 'Caregiver', anonymous: false },
    consensus: { percent: 91, verified: 14, total: 16 },
    agreements: { agree: 12, caution: 1, disagree: 0 },
    aiSummary:
      'Doctors confirm the controller plus rescue plan and emphasize rinsing after budesonide use.',
    replies: [
      {
        name: 'Dr. Osei',
        specialty: 'Allergy & Immunology',
        note: 'Rinse mouth after controller inhaler to prevent thrush.',
        verified: true,
      },
      {
        name: 'Dr. Hayes',
        specialty: 'Pulmonology',
        note: 'Track rescue inhaler usage to adjust controller dose.',
        verified: true,
      },
    ],
    liveUpdates: '1 new reply',
    saved: false,
  },
  {
    id: 4,
    type: 'Skin/injury image upload',
    title: 'Redness around a small cut after 48 hours',
    body:
      'Uploaded a photo of the cut. It looks red and warm but no fever. Should I see urgent care?',
    category: 'Dermatology',
    tags: ['skin', 'injury', 'infection'],
    votes: 508,
    comments: 73,
    doctorReplies: 11,
    time: '1 hr ago',
    author: { name: 'Anonymous', role: 'Anonymous', anonymous: true },
    consensus: { percent: 76, verified: 10, total: 15 },
    agreements: { agree: 9, caution: 4, disagree: 0 },
    aiSummary:
      'Consensus suggests monitoring for spreading redness and consulting urgent care if swelling increases or fever appears.',
    replies: [
      {
        name: 'Dr. Nguyen',
        specialty: 'Dermatology',
        note: 'Outline the redness to track changes over 24 hours.',
        verified: true,
      },
      {
        name: 'Dr. Cole',
        specialty: 'Emergency Medicine',
        note: 'Seek care if pain worsens or red streaks appear.',
        verified: true,
      },
    ],
    liveUpdates: '6 new replies',
    saved: true,
    hasImage: true,
  },
  {
    id: 5,
    type: 'Emergency help request',
    title: 'Severe dizziness and chest tightness right now',
    body:
      'I am experiencing sudden dizziness, chest tightness, and shortness of breath. Asking for guidance while I wait for help.',
    category: 'Urgent Care',
    tags: ['emergency', 'chest pain', 'dizziness'],
    votes: 1280,
    comments: 112,
    doctorReplies: 15,
    time: '2 min ago',
    author: { name: 'Anonymous', role: 'Anonymous', anonymous: true },
    consensus: { percent: 97, verified: 22, total: 24 },
    agreements: { agree: 21, caution: 2, disagree: 0 },
    aiSummary:
      'Doctors urge immediate emergency services and advise staying seated, breathing slowly, and not driving.',
    replies: [
      {
        name: 'Dr. Russell',
        specialty: 'Emergency Medicine',
        note: 'Call emergency services and avoid exertion.',
        verified: true,
      },
      {
        name: 'Dr. Silva',
        specialty: 'Cardiology',
        note: 'If possible, keep someone nearby until help arrives.',
        verified: true,
      },
    ],
    liveUpdates: '12 new replies',
    urgent: true,
    saved: false,
  },
]

const typeStyles = {
  'Health question': 'border-med-blue/40 text-med-blue',
  'Medicine verification': 'border-med-teal/40 text-med-teal',
  'Prescription review': 'border-med-purple/40 text-med-purple',
  'Skin/injury image upload': 'border-emerald-400/40 text-emerald-300',
  'Emergency help request': 'border-rose-400/50 text-rose-300',
}

const VoteIcon = ({ direction }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    {direction === 'up' ? (
      <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M18 10l-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
)

const IconMessage = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M7 18l-3 3V6a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconBookmark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M6 4h12a1 1 0 011 1v15l-7-4-7 4V5a1 1 0 011-1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconShare = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M12 5v10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 9l4-4 4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13v4a2 2 0 002 2h10a2 2 0 002-2v-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconSpark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 14l.8 1.8L22 16l-1.8.8L19 19l-.8-2.2L16 16l2.2-.8L19 14z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconPulse = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M3 12h4l2-5 4 10 2-5h4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconScan = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M4 7V5a1 1 0 011-1h2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 7V5a1 1 0 00-1-1h-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a1 1 0 001 1h2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 17v2a1 1 0 01-1 1h-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconDoc = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M7 3h7l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 16h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconShield = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconAlert = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 8v5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.2 3.6l-7.4 12.8a1.2 1.2 0 001 1.8h16.4a1.2 1.2 0 001-1.8L13.8 3.6a1.2 1.2 0 00-3.6 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconPlus = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-10 h-72 w-72 rounded-full bg-med-blue/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-40 right-10 h-80 w-80 rounded-full bg-med-teal/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-med-purple/30 blur-3xl animate-blob" />

      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-med-blue via-med-teal to-med-purple p-px">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink-900">
              <img
                src={productLogo}
                alt="MediHelp logo"
                className="h-7 w-7 object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              MediHelp Feed
            </p>
            <p className="text-xs text-slate-500">
              Live community + verified doctors
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-3 md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
            <span className="live-dot" />
            Realtime updates via Socket.io
          </div>
          <Link className="ghost-button" to="/auth/login">
            Sign in
          </Link>
          <Link className="primary-button" to="/auth/register">
            Join MediHelp
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-28">
        <motion.section
          className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <div className="glass-pill w-fit">
              <IconPulse />
              Social healthcare intelligence
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              The MediHelp social feed for real-time care threads
            </h1>
            <p className="mt-5 text-base text-slate-300 sm:text-lg">
              Share health questions, upload images, and watch verified doctors reach
              consensus in minutes. Track upvotes, doctor agreement reactions, and AI
              summaries as the community responds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {postTypes.map((type) => (
                <span key={type} className="feed-chip">
                  {type}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="glass-card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Live consensus signals
            </p>
            <div className="mt-6 grid gap-4">
              {liveSignals.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.status}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-linear-to-r from-med-blue/20 via-med-teal/20 to-med-purple/20 p-4 text-sm text-slate-200">
              Doctor consensus is weighted by specialty, response quality, and
              verified credentials.
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-x-0 -top-10 h-32 bg-section-glow opacity-80 blur-3xl" />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={fadeUp} className="glass-card p-6 ai-console">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    AI triage lab
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Advanced AI care intelligence
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Upload symptoms, medicine photos, or prescriptions. AI models
                    combine vision, OCR, and verified doctor signals.
                  </p>
                </div>
                <span className="ai-status">
                  <span className="ai-status-dot" />
                  Processing live
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="ai-scan-frame">
                  <div className="ai-scan-header">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                      <IconScan />
                      Medicine Image Scanner
                    </span>
                    <span className="ai-scan-tag">Scanning 68%</span>
                  </div>
                  <div className="ai-scan-body">
                    <div className="ai-scan-surface">
                      <div className="ai-scan-grid" />
                      <div className="ai-scan-line" />
                      <div className="ai-scan-pulse" />
                    </div>
                    <div className="ai-scan-meta">
                      <p className="text-sm text-white">Amoxicillin 500mg</p>
                      <p className="text-xs text-slate-400">
                        3 interactions checked · pill ID verified
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ai-progress-card">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <IconDoc />
                      Prescription OCR Reader
                    </span>
                    <span className="text-emerald-300">Complete</span>
                  </div>
                  <div className="ai-progress-bar">
                    <span className="ai-progress-fill" style={{ width: '100%' }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-300">
                    Detected: "Take 1 tablet twice daily with meals."
                  </p>
                </div>

                <div className="ai-process-grid">
                  {processingStages.map((stage) => (
                    <div key={stage.title} className={`ai-process-card ${stage.tone}`}>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{stage.title}</span>
                        <span className={stage.highlight}>{stage.status}</span>
                      </div>
                      <div className="ai-progress-bar ai-progress-bar--compact">
                        <span className="ai-progress-fill" style={{ width: stage.progress }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ai-flow-grid">
                  {aiFlow.map((step) => (
                    <div
                      key={step.title}
                      className={`ai-flow-step ${step.active ? 'ai-flow-step--active' : ''}`}
                    >
                      <span className="ai-flow-index">{step.index}</span>
                      <div>
                        <p className="text-sm text-white">{step.title}</p>
                        <p className="text-xs text-slate-400">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ai-disclaimer">
                  This is not a replacement for professional medical advice.
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  AI features
                </p>
                <div className="mt-4 grid gap-3">
                  {aiFeatures.map((feature) => (
                    <div key={feature.title} className="ai-feature">
                      <span className="ai-feature-icon">
                        {feature.icon === 'pulse' ? <IconPulse /> : null}
                        {feature.icon === 'scan' ? <IconScan /> : null}
                        {feature.icon === 'doc' ? <IconDoc /> : null}
                        {feature.icon === 'shield' ? <IconShield /> : null}
                        {feature.icon === 'spark' ? <IconSpark /> : null}
                        {feature.icon === 'alert' ? <IconAlert /> : null}
                      </span>
                      <div>
                        <p className="text-sm text-white">{feature.title}</p>
                        <p className="text-xs text-slate-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  AI risk detection
                </p>
                <div className="mt-4 grid gap-3">
                  {riskLevels.map((risk) => (
                    <div key={risk.level} className={`risk-card ${risk.tone}`}>
                      <div>
                        <p className="text-sm font-semibold text-white">{risk.level}</p>
                        <p className="text-xs text-slate-300">{risk.description}</p>
                      </div>
                      <span className="risk-tag">{risk.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3">
                  {careSuggestions.map((suggestion) => (
                    <div key={suggestion.title} className="ai-suggestion">
                      <p className="text-sm text-white">{suggestion.title}</p>
                      <p className="text-xs text-slate-400">{suggestion.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  AI doctor reply summary
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white">{aiDoctorSummary.title}</p>
                  <p className="mt-2 text-xs text-slate-300">
                    {aiDoctorSummary.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiDoctorSummary.actions.map((action) => (
                      <span key={action} className="feed-chip">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 ai-alert">
                  <div className="flex items-center gap-2 text-sm text-rose-200">
                    <IconAlert />
                    Emergency Alert Detection active
                  </div>
                  <p className="mt-1 text-xs text-rose-200/80">
                    Critical signals trigger immediate emergency guidance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="glass-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Start a new care thread</p>
                  <p className="text-lg font-semibold text-white">
                    What do you want doctors to review?
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="live-dot" />
                  142 doctors online
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <textarea
                  className="feed-input"
                  rows="3"
                  placeholder="Share symptoms, attach a prescription, or ask a medicine question."
                />
                <div className="flex flex-wrap gap-2">
                  {postTypes.map((type) => (
                    <button key={type} className="feed-action" type="button">
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="feed-chip">Anonymous posting</span>
                    <span className="feed-chip">Attach image</span>
                    <span className="feed-chip">Add tags</span>
                  </div>
                  <button className="primary-button" type="button">
                    Post to feed
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 grid gap-6">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`glass-card p-6 transition ${post.urgent ? 'border border-rose-400/40 shadow-glow' : ''}`}
                >
                  <div className="flex flex-wrap items-start gap-5">
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                      <button className="feed-icon" type="button" aria-label="Upvote">
                        <VoteIcon direction="up" />
                      </button>
                      <span className="text-sm font-semibold text-white">
                        {post.votes}
                      </span>
                      <button className="feed-icon" type="button" aria-label="Downvote">
                        <VoteIcon direction="down" />
                      </button>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`feed-chip ${typeStyles[post.type] || 'border-white/20 text-slate-200'
                              }`}
                          >
                            {post.type}
                          </span>
                          <span className="feed-chip">{post.category}</span>
                          {post.urgent ? (
                            <span className="feed-chip border-rose-400/50 text-rose-300">
                              Emergency
                            </span>
                          ) : null}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="live-dot" />
                          {post.liveUpdates}
                        </div>
                      </div>

                      <h2 className="mt-4 text-xl font-semibold text-white">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-300">{post.body}</p>

                      {post.hasImage ? (
                        <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-linear-to-br from-med-blue/10 via-med-teal/10 to-med-purple/10 p-4">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Image upload preview</span>
                            <span className="text-emerald-300">Verified scan ready</span>
                          </div>
                          <div className="mt-4 h-32 rounded-xl bg-white/5" />
                        </div>
                      ) : null}

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="feed-chip">
                          {post.author.anonymous ? 'Anonymous' : post.author.name}
                        </span>
                        <span>
                          {post.author.anonymous ? 'Private profile' : post.author.role}
                        </span>
                        <span>{post.time}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="feed-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                              Doctor consensus
                            </p>
                            <p className="mt-1 text-sm text-white">
                              {post.consensus.percent}% agreement across {post.consensus.total} replies
                            </p>
                          </div>
                          <div className="text-xs text-emerald-300">
                            {post.consensus.verified} verified responses · {post.doctorReplies} doctor replies
                          </div>
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-med-blue via-med-teal to-med-purple"
                            style={{ width: `${post.consensus.percent}%` }}
                          />
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                          <span className="feed-chip">Agree {post.agreements.agree}</span>
                          <span className="feed-chip">Caution {post.agreements.caution}</span>
                          <span className="feed-chip">Disagree {post.agreements.disagree}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                          <IconSpark />
                          AI summary: {post.aiSummary}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        {post.replies.map((reply) => (
                          <div
                            key={reply.name}
                            className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {reply.name}
                                {reply.verified ? (
                                  <span className="ml-2 text-xs text-emerald-300">
                                    Verified
                                  </span>
                                ) : null}
                              </p>
                              <p className="text-xs text-slate-400">
                                {reply.specialty}
                              </p>
                              <p className="mt-2 text-sm text-slate-300">
                                {reply.note}
                              </p>
                            </div>
                            <span className="feed-chip">Doctor reply</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                        <span className="feed-action">
                          <IconMessage /> {post.comments} replies
                        </span>
                        <button
                          className={`feed-action ${post.saved ? 'text-emerald-200' : ''}`}
                          type="button"
                        >
                          <IconBookmark /> {post.saved ? 'Saved' : 'Save'}
                        </button>
                        <button className="feed-action" type="button">
                          <IconShare /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Trending posts
              </p>
              <div className="mt-4 grid gap-4">
                {trendingPosts.map((post) => (
                  <div
                    key={post.title}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-sm text-white">{post.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{post.reactions}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Categories
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="feed-chip">
                    {category}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Live activity
              </p>
              <div className="mt-4 grid gap-3">
                {liveSignals.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="text-xs text-emerald-300">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
                Live activity indicators refresh every 3 seconds via Socket.io.
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </main>

      <motion.button
        className="fab-button"
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <IconPlus />
        New post
      </motion.button>
    </div>
  )
}

export default Landing