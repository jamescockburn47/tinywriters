import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'

export default function ActivityCard({ icon, title, description, completed, total, active, onClick, children }) {
  if (active) {
    return (
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-4 sm:p-6"
      >
        <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-2xl sm:text-3xl shrink-0">{icon}</span>
            <div className="text-left min-w-0">
              <h3 className="font-extrabold text-gray-800 text-base sm:text-lg">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ProgressRing completed={completed} total={total} size={32} />
            <span className="text-[10px] sm:text-xs font-bold text-gray-400">{completed}/{total}</span>
          </div>
        </div>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-md border-2 border-transparent p-4 sm:p-5 text-left hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-gray-800 text-sm sm:text-base">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <ProgressRing completed={completed} total={total} size={32} />
          <span className="text-[10px] sm:text-xs font-bold text-gray-400">{completed}/{total}</span>
        </div>
      </div>
    </motion.button>
  )
}
