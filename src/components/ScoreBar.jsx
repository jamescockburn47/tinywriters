import { motion, AnimatePresence } from 'framer-motion'

export default function ScoreBar({ score, floatingStars }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3.5 text-sm sm:text-base font-bold">
      <div className="relative flex items-center gap-1.5 bg-white/85 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-sm">
        <span className="text-base sm:text-xl">⭐</span>
        <span className="text-amber-700">{score.totalStars}</span>
        <AnimatePresence>
          {floatingStars.map(f => (
            <motion.span
              key={f.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-2 left-1/2 text-amber-500 font-bold pointer-events-none"
            >
              +{f.count}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {score.streak > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1.5 bg-white/85 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-sm"
        >
          <span className="text-base sm:text-xl">🔥</span>
          <span className="text-orange-600">{score.streak}</span>
        </motion.div>
      )}

      <div className="flex items-center gap-1.5 bg-white/85 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-sm">
        <span className="text-base sm:text-xl">✅</span>
        <span className="text-green-700">{score.completed}</span>
      </div>
    </div>
  )
}
