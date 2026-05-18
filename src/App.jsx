import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import productLogo from './assets/product_logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const features = [
  {
    title: 'AI Risk Triage',
    description:
      'Instantly flag urgent symptoms and recommend next best steps before a doctor responds.',
    tag: 'Realtime triage',
  },
  {
    title: 'Doctor Consensus',
    description:
      'Verified specialists can agree or challenge advice, and AI summarizes the consensus.',
    tag: 'Verified insights',
  },
  {
    title: 'Image Intelligence',
    description:
      'Upload prescriptions or skin images and get rapid, context-aware guidance.',
    tag: 'Vision enabled',
  },
  {
    title: 'Community Momentum',
    description:
      'Track live replies, reactions, and follow-ups as care evolves in real time.',
    tag: 'Live updates',
  },
]

const steps = [
  {
    title: 'Share your concern',
    description: 'Post publicly or anonymously with images, meds, and context.',
  },
  {
    title: 'AI triage in seconds',
    description: 'Get a preliminary risk banner and next-step guidance.',
  },
  {
    title: 'Doctors collaborate',
    description: 'Specialists weigh in, agree, and surface the safest guidance.',
  },
  {
    title: 'Consensus delivered',
    description: 'AI summarizes the expert consensus with confidence levels.',
  },
]

const testimonials = [
  {
    quote:
      'The consensus summary made it easy to understand what multiple doctors agreed on.',
    name: 'Priya S.',
    role: 'Patient Advocate',
  },
  {
    quote:
      'Feels like a live, intelligent healthcare board with real specialist input.',
    name: 'Dr. Martinez',
    role: 'Cardiology',
  },
  {
    quote:
      'The medicine scanner saved my team hours during triage and follow-up.',
    name: 'Akira T.',
    role: 'Clinic Operations',
  },
]

const doctorSignals = [
  { label: 'Verified Specialists', value: '2,140+' },
  { label: 'Active Care Threads', value: '38k+' },
  { label: 'Avg. Response', value: '4 min' },
]

function SectionHeader({ label, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="glass-pill mx-auto w-fit">{label}</div>
      <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-slate-300 sm:text-lg">{description}</p>
    </div>
  )
}

function App() {
  const rootRef = useRef(null)
  const frameRef = useRef(null)
  const rectRef = useRef(null)
  const latestPoint = useRef({ x: 0, y: 0 })

  const updateRect = () => {
    const node = rootRef.current
    if (!node) return
    rectRef.current = node.getBoundingClientRect()
  }

  const applyGlow = () => {
    const node = rootRef.current
    if (!node) {
      frameRef.current = null
      return
    }
    const { x, y } = latestPoint.current
    node.style.setProperty('--mx', `${x}px`)
    node.style.setProperty('--my', `${y}px`)
    frameRef.current = null
  }

  const requestGlowUpdate = () => {
    if (frameRef.current == null) {
      frameRef.current = requestAnimationFrame(applyGlow)
    }
  }

  useEffect(() => {
    updateRect()
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('resize', updateRect)
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const handlePointerEnter = () => {
    updateRect()
  }

  const handlePointerMove = (event) => {
    const rect = rectRef.current || rootRef.current?.getBoundingClientRect()
    if (!rect) return
    rectRef.current = rect
    latestPoint.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    requestGlowUpdate()
  }

  const handlePointerLeave = () => {
    const rect = rectRef.current
    if (!rect) return
    latestPoint.current = {
      x: rect.width * 0.5,
      y: rect.height * 0.2,
    }
    requestGlowUpdate()
  }

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-ink-950 text-slate-100"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
      <div className="pointer-events-none absolute inset-0 mouse-glow" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />

      <div className="pointer-events-none absolute -top-32 left-10 h-72 w-72 rounded-full bg-med-blue/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-40 right-10 h-80 w-80 rounded-full bg-med-teal/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-med-purple/30 blur-3xl animate-blob" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-med-blue via-med-teal to-med-purple p-[1px]">
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
              MediHelp
            </p>
            <p className="text-xs text-slate-500">AI + Doctor Consensus</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#community">
            Doctors
          </a>
          <a className="transition hover:text-white" href="#scanner">
            Scanner
          </a>
          <a className="transition hover:text-white" href="#workflow">
            How it works
          </a>
        </nav>
        <button className="ghost-button hidden md:inline-flex" type="button">
          Join the waitlist
        </button>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24">
        <motion.section
          className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <div className="glass-pill w-fit">
              <span className="h-2 w-2 rounded-full bg-med-teal animate-pulse" />
              Live physician network
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Trusted Healthcare Powered by AI & Verified Doctors
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              MediHelp blends community care with verified medical insight. Ask questions,
              upload images, and get AI-powered triage while certified doctors collaborate
              on the safest next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="primary-button" type="button">
                Ask a Doctor
              </button>
              <button className="ghost-button" type="button">
                Scan Medicine
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-med-blue/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-med-blue animate-pulse" />
                </span>
                24/7 AI triage
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-med-teal/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-med-teal animate-pulse" />
                </span>
                Verified doctors only
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-med-purple/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-med-purple animate-pulse" />
                </span>
                Consensus insights
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <div className="relative rounded-[32px] bg-gradient-to-br from-med-blue/70 via-med-teal/40 to-med-purple/70 p-[1px]">
              <div className="glass-card relative rounded-[32px] p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">AI Health Brief</p>
                  <span className="text-xs text-emerald-300">Low Risk</span>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Symptom cluster
                    </p>
                    <p className="mt-2 text-sm text-white">
                      Persistent cough, mild fever, fatigue
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      AI Guidance
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      Hydration + monitor vitals. Doctor review in progress.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Consensus
                      </p>
                      <span className="text-xs text-slate-400">87% match</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-med-blue via-med-teal to-med-purple" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  18 doctors actively reviewing
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -left-10 top-12 w-44 glass-card p-4"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-slate-400">Realtime Replies</p>
              <p className="mt-3 text-lg font-semibold text-white">+4</p>
              <p className="text-xs text-slate-500">last 2 minutes</p>
            </motion.div>
            <motion.div
              className="absolute -right-6 bottom-16 w-48 glass-card p-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-slate-400">Medication match</p>
              <p className="mt-3 text-lg font-semibold text-white">98% safe</p>
              <p className="text-xs text-slate-500">No interactions found</p>
            </motion.div>
            <motion.div
              className="absolute left-20 -bottom-8 w-40 glass-card p-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-slate-400">Pulse</p>
              <p className="mt-3 text-lg font-semibold text-white">72 bpm</p>
              <p className="text-xs text-slate-500">Stable</p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="features"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 bg-section-glow opacity-70" />
          <SectionHeader
            label="AI Healthcare Features"
            title="A triage engine that feels alive"
            description="Every post becomes a live care thread with AI triage, doctor collaboration, and transparent consensus."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {feature.tag}
                  </p>
                  <span className="h-2 w-2 rounded-full bg-med-teal animate-pulse" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="community"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              label="Doctor Community"
              title="A verified medical council, in real time"
              description="Every response is backed by verified credentials, with transparent signals on agreement and expertise."
            />
            <div className="grid gap-4">
              {doctorSignals.map((signal) => (
                <div key={signal.label} className="glass-card flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-slate-400">{signal.label}</p>
                    <p className="text-2xl font-semibold text-white">
                      {signal.value}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-med-blue/20 blur-xl" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Active Doctor Panel</p>
                <span className="text-xs text-emerald-300">Verified</span>
              </div>
              <div className="mt-6 grid gap-4">
                {['Emergency Care', 'Dermatology', 'Pediatrics'].map((specialty) => (
                  <div key={specialty} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {specialty}
                      </p>
                      <p className="text-xs text-slate-400">On-call now</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-med-blue/20 via-med-teal/20 to-med-purple/20 p-4">
                <p className="text-sm text-slate-200">
                  Consensus strength is calculated from verified replies, weighted by specialty.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="scanner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              label="Medicine Scanner"
              title="Scan prescriptions with confidence"
              description="Point, upload, and receive immediate safety signals and verified doctor checks."
            />
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Prescription scan</p>
                <span className="text-xs text-slate-400">AI vision active</span>
              </div>
              <div className="mt-6 h-44 rounded-2xl border border-dashed border-white/10 bg-white/5 p-4">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-slate-300">Drop image here</p>
                  <p className="text-xs text-slate-500">JPG, PNG, or HEIC</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Interaction check
                  </p>
                  <p className="mt-3 text-sm text-white">No critical conflicts</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Follow-up
                  </p>
                  <p className="mt-3 text-sm text-white">2 doctors reviewing</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="glass-card h-full p-6">
              <p className="text-sm text-slate-300">Scanner timeline</p>
              <div className="mt-6 space-y-4">
                {[
                  'Upload or capture medicine label',
                  'AI extracts dosage and risks',
                  'Doctors confirm compatibility',
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-med-blue/20 text-sm text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-gradient-to-br from-med-blue/20 via-med-teal/20 to-med-purple/20 p-4">
                <p className="text-sm text-white">Realtime accuracy score</p>
                <p className="mt-2 text-2xl font-semibold text-white">99.2%</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="workflow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <SectionHeader
            label="How It Works"
            title="From question to consensus in minutes"
            description="A seamless flow that blends AI speed with human medical expertise."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={fadeUp} className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-med-purple/20 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <SectionHeader
            label="Testimonials"
            title="Trusted by patients and physicians"
            description="High-trust experiences from the community shaping MediHelp."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div key={item.name} variants={fadeUp} className="glass-card p-6">
                <p className="text-sm text-slate-200">"{item.quote}"</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="glass-card relative overflow-hidden p-8 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-med-blue/20 via-med-teal/20 to-med-purple/20" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
              Emergency help
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Immediate risk? Start an emergency care thread now.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              MediHelp elevates high-risk cases with priority doctor routing and
              real-time alerts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button className="primary-button" type="button">
                Start urgent thread
              </button>
              <button className="ghost-button" type="button">
                View emergency guide
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-white">MediHelp</p>
            <p className="mt-2 text-xs text-slate-500">
              Community-first healthcare intelligence.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em]">
            <span>Privacy</span>
            <span>Security</span>
            <span>Compliance</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
