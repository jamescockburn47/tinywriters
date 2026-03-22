import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/similes'
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

export default function SimileBuilder({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [options, setOptions] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)
  const [disabled, setDisabled] = useState({})

  useEffect(() => { if (active && !current) loadNext() }, [active, current])

  const loadNext = () => {
    const item = data[0] // will be overridden by next()
    next()
    setAttempts(0)
    setFeedback(null)
    setDone(false)
    setDisabled({})
  }

  useEffect(() => {
    if (current) {
      setOptions(shuffle([...current.options]))
      setAttempts(0)
      setFeedback(null)
      setDone(false)
      setDisabled({})
    }
  }, [current])

  const handlePick = (option) => {
    if (done) return
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (option === current.answer) {
      setFeedback({ message: getSuccessMessage(), type: 'success' })
      setDone(true)
      markCompleted()
      award(newAttempts)
    } else {
      setFeedback({ message: getEncourageMessage(), type: 'error' })
      setDisabled(prev => ({ ...prev, [option]: true }))
    }
  }

  const handleNext = () => {
    next()
  }

  return (
    <ActivityCard
      icon="🌟"
      title="Simile Builder"
      description="Complete the simile with the right word!"
      color="creative"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-amber-50 rounded-xl p-3 sm:p-4 text-base sm:text-xl font-bold text-amber-900 border-2 border-amber-200 text-center">
            {current.stem} <span className="text-purple-500">___</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {options.map((opt, i) => (
              <motion.button
                key={opt}
                whileHover={!done && !disabled[opt] ? { scale: 1.03 } : {}}
                whileTap={!done && !disabled[opt] ? { scale: 0.97 } : {}}
                onClick={() => handlePick(opt)}
                disabled={done || disabled[opt]}
                className={`
                  p-2 sm:p-3 rounded-xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer
                  ${done && opt === current.answer ? 'bg-emerald-500 text-white border-emerald-500' : ''}
                  ${disabled[opt] ? 'bg-red-50 border-red-300 text-red-400 opacity-50 cursor-not-allowed' : ''}
                  ${!done && !disabled[opt] ? 'bg-white border-gray-200 hover:border-purple-400 hover:shadow-md' : ''}
                `}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />

          {attempts > 0 && (
            <p className="text-sm text-gray-400 text-center">
              Attempts: {attempts}
            </p>
          )}

          {done && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Next Simile ➜
              </button>
            </div>
          )}
        </div>
      )}
    </ActivityCard>
  )
}
