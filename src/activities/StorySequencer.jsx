import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/storySequences'
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

const SLOT_LABELS = ['Beginning', 'Middle', 'End']
const SLOT_COLORS = ['bg-blue-100 border-blue-300', 'bg-amber-100 border-amber-300', 'bg-green-100 border-green-300']
const SLOT_TEXT = ['text-blue-700', 'text-amber-700', 'text-green-700']

export default function StorySequencer({ active, onSelect, award }) {
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
      setShuffled(shuffle(current.events.map((e, i) => ({ text: e, correctPos: i }))))
      setPlaced([])
      setAttempts(0)
      setFeedback(null)
      setDone(false)
      setWrongIdx(null)
    }
  }, [current])

  const handlePick = (event, idx) => {
    if (done || placed.some(p => p.idx === idx)) return

    const nextPos = placed.length
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (event.correctPos === nextPos) {
      const newPlaced = [...placed, { ...event, idx }]
      setPlaced(newPlaced)
      setWrongIdx(null)
      setFeedback(null)

      if (newPlaced.length === current.events.length) {
        setFeedback({ message: getSuccessMessage(), type: 'success' })
        setDone(true)
        markCompleted()
        award(newAttempts)
      }
    } else {
      setWrongIdx(idx)
      setFeedback({
        message: `${getEncourageMessage()} That's not the ${SLOT_LABELS[nextPos].toLowerCase()}.`,
        type: 'error'
      })
      setTimeout(() => setWrongIdx(null), 400)
    }
  }

  return (
    <ActivityCard
      icon="📖"
      title="Story Sequencer"
      description="Put the story events in the right order!"
      color="essay"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-3 sm:space-y-4">
          {/* Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {SLOT_LABELS.map((label, i) => (
              <div
                key={label}
                className={`rounded-xl p-2 sm:p-3 min-h-[56px] sm:min-h-[80px] border-2 border-dashed ${SLOT_COLORS[i]} flex flex-col`}
              >
                <span className={`text-[10px] sm:text-xs font-extrabold uppercase ${SLOT_TEXT[i]} mb-1`}>
                  {label}
                </span>
                <AnimatePresence>
                  {placed[i] && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-xs sm:text-sm font-medium ${SLOT_TEXT[i]}`}
                    >
                      {placed[i].text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Event bank */}
          <div className="space-y-1.5 sm:space-y-2">
            {shuffled.map((event, idx) => {
              const isPlaced = placed.some(p => p.idx === idx)
              const isWrong = wrongIdx === idx

              return (
                <motion.button
                  key={idx}
                  whileHover={!isPlaced && !done ? { scale: 1.01 } : {}}
                  onClick={() => handlePick(event, idx)}
                  disabled={isPlaced || done}
                  className={`
                    w-full p-2.5 sm:p-3 rounded-xl font-medium text-xs sm:text-sm text-left border-2 transition-all cursor-pointer
                    ${isPlaced ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200' : ''}
                    ${isWrong ? 'border-red-500 bg-red-50 animate-shake' : ''}
                    ${!isPlaced && !isWrong ? 'bg-white border-gray-200 hover:border-teal-400 hover:shadow-md' : ''}
                  `}
                >
                  {event.text}
                </motion.button>
              )
            })}
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />

          {attempts > 0 && (
            <p className="text-sm text-gray-400 text-center">Attempts: {attempts}</p>
          )}

          {done && (
            <div className="flex justify-end">
              <button
                onClick={() => next()}
                className="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-600 transition-colors cursor-pointer"
              >
                Next Story ➜
              </button>
            </div>
          )}
        </div>
      )}
    </ActivityCard>
  )
}
