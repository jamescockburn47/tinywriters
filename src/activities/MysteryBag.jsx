import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/mysteryBag'
import ActivityCard from '../components/ActivityCard'
import FeedbackBanner from '../components/FeedbackBanner'
import { getSuccessMessage, getEncourageMessage } from '../hooks/useRewards'

const WRITING_TIPS = [
  'Open with action so your reader wants to know what happens next.',
  'Add one feeling and one sound to bring the scene alive.',
  'Give your character a problem and a surprising choice.',
  'End with a mini cliff-hanger to keep the mystery going.',
]

export default function MysteryBag({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => { if (active && !current) next() }, [active, current])

  useEffect(() => {
    if (!current) return
    setText('')
    setFeedback(null)
    setIsSubmitted(false)
  }, [current])

  const tip = current ? WRITING_TIPS[current.length % WRITING_TIPS.length] : WRITING_TIPS[0]
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  const handleSubmit = () => {
    if (!text.trim()) {
      setFeedback({
        message: `${getEncourageMessage()} Write at least one sentence, then press Submit Writing.`,
        type: 'error',
      })
      return
    }

    markCompleted()
    award(1)
    setIsSubmitted(true)
    setFeedback({
      message: `${getSuccessMessage()} Great imagination. Tap Next Prompt for a new mystery.`,
      type: 'success',
    })
  }

  const handleNext = () => {
    setText('')
    setFeedback(null)
    setIsSubmitted(false)
    next()
  }

  return (
    <ActivityCard
      icon="🎒"
      title="Mystery Bag"
      description="Pull out a prompt and write something amazing!"
      coach={{
        steps: ['Read the mystery prompt', 'Write 3-5 sentences', 'Submit your writing to earn stars'],
        tip: 'Start with action, include one feeling, and finish with a mini cliff-hanger.',
      }}
      color="creative"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-3 sm:space-y-4">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-purple-50 rounded-xl p-4 text-base sm:text-lg font-semibold text-purple-900 border-2 border-purple-200"
          >
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-purple-500 mb-1">Mystery Prompt</p>
            <p>{current}</p>
          </motion.div>

          <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-3">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-700">Story tip</p>
            <p className="text-sm sm:text-base font-medium text-amber-900 mt-1">{tip}</p>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start your story here... Who is there? What goes wrong? What surprising thing happens next?"
            className="w-full h-36 p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-base resize-none font-medium"
            disabled={isSubmitted}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">
              Words: {words} {words < 12 && !isSubmitted ? '(try for 12+)' : ''}
            </p>
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Submit Writing ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Next Prompt ➜
              </button>
            )}
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />
        </div>
      )}
    </ActivityCard>
  )
}
