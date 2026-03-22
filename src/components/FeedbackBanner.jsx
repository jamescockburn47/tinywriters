import { motion, AnimatePresence } from 'framer-motion'

export default function FeedbackBanner({ message, type }) {
  return (
    <div className="min-h-[32px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`font-bold text-lg ${
              type === 'success' ? 'text-emerald-600' :
              type === 'error' ? 'text-red-500' :
              'text-gray-600'
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
