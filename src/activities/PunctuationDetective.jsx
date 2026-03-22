import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/punctuation'
import ActivityCard from '../components/ActivityCard'
import FeedbackBanner from '../components/FeedbackBanner'
import { getSuccessMessage, getEncourageMessage } from '../hooks/useRewards'

const MARKS = ['.', '!', '?']

export default function PunctuationDetective({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)
  const [disabled, setDisabled] = useState({})

  useEffect(() => { if (active && !current) next() }, [active, current])

  useEffect(() => {
    if (current) {
      setAttempts(0)
      setFeedback(null)
      setDone(false)
      setDisabled({})
    }
  }, [current])

  const handlePick = (mark) => {
    if (done) return
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (mark === current.answer) {
      setFeedback({ message: `${getSuccessMessage()} ${current.explanation}`, type: 'success' })
      setDone(true)
      markCompleted()
      award(newAttempts)
    } else {
      setFeedback({ message: getEncourageMessage(), type: 'error' })
      setDisabled(prev => ({ ...prev, [mark]: true }))
    }
  }

  return (
    <ActivityCard
      icon="🔍"
      title="Punctuation Detective"
      description="Which punctuation mark does this sentence need?"
      color="grammar"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 sm:p-4 text-base sm:text-xl font-bold text-sky-900 border-2 border-sky-200 text-center">
            {current.sentence}<span className="text-sky-400 text-xl sm:text-2xl ml-1">_</span>
          </div>

          <div className="flex justify-center gap-3 sm:gap-4">
            {MARKS.map(mark => (
              <motion.button
                key={mark}
                whileHover={!done && !disabled[mark] ? { scale: 1.1 } : {}}
                whileTap={!done && !disabled[mark] ? { scale: 0.9 } : {}}
                onClick={() => handlePick(mark)}
                disabled={done || disabled[mark]}
                className={`
                  w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-2xl sm:text-3xl font-extrabold border-3 transition-all cursor-pointer
                  ${done && mark === current.answer ? 'bg-emerald-500 text-white border-emerald-500 scale-110' : ''}
                  ${disabled[mark] ? 'bg-red-50 border-red-200 text-red-300 opacity-50 cursor-not-allowed' : ''}
                  ${!done && !disabled[mark] ? 'bg-white border-gray-200 hover:border-sky-400 hover:shadow-lg' : ''}
                `}
              >
                {mark}
              </motion.button>
            ))}
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />

          {attempts > 0 && (
            <p className="text-sm text-gray-400 text-center">Attempts: {attempts}</p>
          )}

          {done && (
            <div className="flex justify-end">
              <button
                onClick={() => next()}
                className="bg-sky-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-sky-600 transition-colors cursor-pointer"
              >
                Next Sentence ➜
              </button>
            </div>
          )}
        </div>
      )}
    </ActivityCard>
  )
}
