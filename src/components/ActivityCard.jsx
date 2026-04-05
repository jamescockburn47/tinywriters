import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'

export default function ActivityCard({ icon, title, description, completed, total, active, onClick, coach, children }) {
  if (active) {
    return (
      <motion.div
        layout
        className="bg-white rounded-3xl shadow-lg border-2 border-purple-200 p-5 sm:p-7"
      >
        <div className="flex items-start sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0">
            <span className="text-3xl sm:text-4xl shrink-0">{icon}</span>
            <div className="text-left min-w-0">
              <h3 className="font-extrabold text-gray-800 text-lg sm:text-xl">{title}</h3>
              <p className="text-sm sm:text-base text-gray-500 line-clamp-2">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ProgressRing completed={completed} total={total} size={36} />
            <span className="text-xs sm:text-sm font-bold text-gray-400">{completed}/{total}</span>
          </div>
        </div>
        {coach?.steps?.length > 0 && (
          <div className="mb-5 rounded-2xl border-2 border-violet-200 bg-violet-50 p-4 sm:p-5">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-violet-600">
              {coach.title || 'How to play'}
            </p>
            <p className="mt-1.5 text-sm sm:text-base font-semibold text-violet-900">
              {coach.steps.map((step, idx) => `${idx + 1}) ${step}`).join('  ')}
            </p>
            {coach.tip && (
              <p className="mt-2.5 text-xs sm:text-sm font-semibold text-violet-700">
                Tip: {coach.tip}
              </p>
            )}
          </div>
        )}
        {children}
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-3xl shadow-md border-2 border-transparent p-5 sm:p-6 text-left hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3 sm:gap-3.5">
        <span className="text-3xl sm:text-4xl shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-gray-800 text-base sm:text-lg">{title}</h3>
          <p className="text-sm sm:text-base text-gray-500 line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ProgressRing completed={completed} total={total} size={36} />
          <span className="text-xs sm:text-sm font-bold text-gray-400">{completed}/{total}</span>
        </div>
      </div>
    </motion.button>
  )
}
