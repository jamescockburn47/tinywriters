import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'

export default function ActivityCard({ icon, title, description, completed, total, active, onClick, children }) {
  if (active) {
    return (
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <div className="text-left">
              <h3 className="font-extrabold text-gray-800 text-lg">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ProgressRing completed={completed} total={total} />
            <span className="text-xs font-bold text-gray-400">{completed}/{total}</span>
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
      className="w-full bg-white rounded-2xl shadow-md border-2 border-transparent p-5 text-left hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className="font-extrabold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <ProgressRing completed={completed} total={total} />
          <span className="text-xs font-bold text-gray-400">{completed}/{total}</span>
        </div>
      </div>
    </motion.button>
  )
}
