import { motion, AnimatePresence } from 'framer-motion'

export default function RewardPopup({ badge, onDismiss }) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-xs mx-4"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl mb-4"
            >
              {badge.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">New Badge!</h3>
            <p className="text-2xl font-bold text-purple-600 mb-4">{badge.name}</p>
            <button
              onClick={onDismiss}
              className="bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition-colors"
            >
              Awesome!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
