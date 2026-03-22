import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePool from '../hooks/usePool'
import data, { CATEGORIES } from '../data/adjectiveOrder'
import ActivityCard from '../components/ActivityCard'
import FeedbackBanner from '../components/FeedbackBanner'
import { getSuccessMessage, getEncourageMessage } from '../hooks/useRewards'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function AdjectiveOrder({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [shuffled, setShuffled] = useState([])
  const [placed, setPlaced] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)
  const [wrongIdx, setWrongIdx] = useState(null)

  useEffect(() => { if (active && !current) next() }, [active, current])

  useEffect(() => {
    if (current) {
      setShuffled(shuffle(current.adjectives))
      setPlaced([])
      setAttempts(0)
      setFeedback(null)
      setDone(false)
      setWrongIdx(null)
    }
  }, [current])

  const handlePick = (adj, idx) => {
    if (done || placed.some(p => p.idx === idx)) return

    const nextPos = placed.length
    const expected = current.correctOrder[nextPos]
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (adj.word === expected) {
      const newPlaced = [...placed, { ...adj, idx }]
      setPlaced(newPlaced)
      setWrongIdx(null)

      const cat = CATEGORIES[adj.category]
      if (newPlaced.length < current.correctOrder.length) {
        setFeedback({
          message: `${cat?.label || adj.category} — correct!`,
          type: 'info'
        })
      }

      if (newPlaced.length === current.correctOrder.length) {
        const cats = newPlaced.map(p => CATEGORIES[p.category]?.label || p.category)
        const rule = cats.join(' comes before ').replace(/comes before(?=[^,]*$)/, 'then')
        setFeedback({
          message: `${getSuccessMessage()} Rule: ${cats.join(' → ')}`,
          type: 'success'
        })
        setDone(true)
        markCompleted()
        award(newAttempts)
      }
    } else {
      setWrongIdx(idx)
      const expectedAdj = current.adjectives.find(a => a.word === expected)
      const expectedCat = expectedAdj ? CATEGORIES[expectedAdj.category]?.label : ''
      setFeedback({
        message: `${getEncourageMessage()} Hint: look for a ${expectedCat?.toLowerCase() || ''} word next.`,
        type: 'error'
      })
      setTimeout(() => setWrongIdx(null), 400)
    }
  }

  const difficultyLabel = current?.difficulty === 1 ? 'Easy' : current?.difficulty === 2 ? 'Medium' : 'Hard'
  const difficultyColor = current?.difficulty === 1 ? 'text-green-500' : current?.difficulty === 2 ? 'text-amber-500' : 'text-red-500'

  return (
    <ActivityCard
      icon="🎨"
      title="Adjective Order"
      description="Put the describing words in the right order!"
      color="grammar"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-4">
          {/* Difficulty badge */}
          <div className="flex justify-between items-center">
            <span className={`text-xs font-bold ${difficultyColor} bg-white px-2 py-1 rounded-full`}>
              {difficultyLabel}
            </span>
            <div className="flex gap-1">
              {Object.entries(CATEGORIES).map(([key, cat]) => {
                const isUsed = current.adjectives.some(a => a.category === key)
                if (!isUsed) return null
                return (
                  <span
                    key={key}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.label}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Build area */}
          <div className="bg-indigo-50 rounded-xl p-4 min-h-[56px] border-2 border-dashed border-indigo-300 flex items-center gap-2 flex-wrap">
            {placed.length === 0 && (
              <span className="text-indigo-300 italic">Click adjectives in the right order...</span>
            )}
            <AnimatePresence>
              {placed.map((adj, i) => {
                const cat = CATEGORIES[adj.category]
                return (
                  <motion.div
                    key={`placed-${adj.idx}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex flex-col items-center"
                  >
                    <span
                      className="px-3 py-1.5 rounded-lg font-bold text-white text-base"
                      style={{ backgroundColor: cat?.color || '#888' }}
                    >
                      {adj.word}
                    </span>
                    <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: cat?.color }}>
                      {cat?.label}
                    </span>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Noun at the end */}
            {placed.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg font-bold text-gray-700 bg-gray-200 text-base">
                {current.noun}
              </span>
            )}
          </div>

          {/* Adjective bank */}
          <div className="flex flex-wrap gap-2 justify-center">
            {shuffled.map((adj, idx) => {
              const isPlaced = placed.some(p => p.idx === idx)
              const isWrong = wrongIdx === idx
              const cat = CATEGORIES[adj.category]

              return (
                <motion.button
                  key={idx}
                  whileHover={!isPlaced && !done ? { scale: 1.05 } : {}}
                  whileTap={!isPlaced && !done ? { scale: 0.95 } : {}}
                  onClick={() => handlePick(adj, idx)}
                  disabled={isPlaced || done}
                  className={`
                    px-4 py-2 rounded-xl font-bold text-base border-2 transition-all cursor-pointer
                    ${isPlaced ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200' : ''}
                    ${isWrong ? 'border-red-500 bg-red-50 animate-shake' : ''}
                    ${!isPlaced && !isWrong ? 'bg-white hover:shadow-md' : ''}
                  `}
                  style={!isPlaced && !isWrong ? { borderColor: cat?.color || '#ccc' } : {}}
                >
                  {adj.word}
                </motion.button>
              )
            })}
          </div>

          {/* Target noun display */}
          <div className="text-center">
            <span className="text-gray-400 text-sm">Put the adjectives before:</span>
            <span className="ml-2 font-extrabold text-lg text-gray-700">{current.noun}</span>
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />

          {attempts > 0 && (
            <p className="text-sm text-gray-400 text-center">Attempts: {attempts}</p>
          )}

          {done && (
            <div className="flex justify-end">
              <button
                onClick={() => next()}
                className="bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors cursor-pointer"
              >
                Next Challenge ➜
              </button>
            </div>
          )}
        </div>
      )}
    </ActivityCard>
  )
}
