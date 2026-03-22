import { motion } from 'framer-motion'

const TYPE_COLORS = {
  noun: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700', label: 'bg-blue-500' },
  verb: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700', label: 'bg-red-500' },
  adjective: { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700', label: 'bg-amber-500' },
  adverb: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', label: 'bg-purple-500' },
  determiner: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700', label: 'bg-gray-500' },
  preposition: { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700', label: 'bg-emerald-500' },
  conjunction: { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-700', label: 'bg-orange-500' },
  pronoun: { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-700', label: 'bg-pink-500' },
}

const TYPE_NAMES = {
  noun: 'naming word',
  verb: 'doing word',
  adjective: 'describing word',
  adverb: 'how word',
  determiner: 'pointer word',
  preposition: 'position word',
  conjunction: 'joining word',
  pronoun: 'stand-in word',
}

export default function WordChip({ word, type, placed, wrong, showType, onClick, disabled }) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS.noun

  if (placed) {
    return (
      <motion.div
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex flex-col items-center"
      >
        <span className={`px-3 py-1.5 rounded-lg font-bold text-white ${colors.label} text-base`}>
          {word}
        </span>
        {showType && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[10px] font-bold mt-0.5 ${colors.text} uppercase tracking-wide`}
          >
            {type}
          </motion.span>
        )}
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`
        px-4 py-2 rounded-xl font-bold text-base border-2 transition-all cursor-pointer
        ${wrong ? 'border-red-500 bg-red-50 animate-shake' : `${colors.border} ${colors.bg} hover:shadow-md`}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {word}
    </motion.button>
  )
}

export { TYPE_COLORS, TYPE_NAMES }
