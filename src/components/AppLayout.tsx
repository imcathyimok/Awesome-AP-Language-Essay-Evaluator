import { motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../lib/cn'

const tabs = [
  { to: '/', label: 'Dashboard' },
  { to: '/practice', label: 'Practice' },
  { to: '/custom', label: 'Custom' },
  { to: '/about', label: 'About' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen paper">
      <header className="mx-auto max-w-6xl px-4 pt-6">
        <div className="sketch-border bg-paper-50/90 shadow-paper backdrop-blur-sm">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/brand/citru-study.png"
                alt="Citru-study"
                className="h-10 w-10 select-none animate-wiggleSoft"
                draggable={false}
              />
              <div>
                <div className="font-hand text-xl leading-tight text-ink-900">
                  AP Lang Argumentative, Synthesis, and Rhetorical Essay Practice
                </div>
                <div className="text-sm text-ink-700/80">powered by Citru-study</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {tabs.map((t, i) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({ isActive }) =>
                    cn(
                      'marker-hover relative rounded-full px-4 py-2 text-sm font-medium',
                      'border border-ink-900/15 bg-paper-50/60 text-ink-900 shadow-sketch',
                      'transition-transform hover:-translate-y-0.5',
                      isActive && 'bg-accent-yellow/30',
                      i % 2 === 0 ? '' : '',
                    )
                  }
                >
                  {t.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

