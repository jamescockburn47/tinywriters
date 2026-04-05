import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/opinions'
import ActivityCard from '../components/ActivityCard'
import FeedbackBanner from '../components/FeedbackBanner'
import { getSuccessMessage, getEncourageMessage } from '../hooks/useRewards'

export default function OpinionBuilder({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [think, setThink] = useState('')
  const [because, setBecause] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => { if (active && !current) next() }, [active, current])

  useEffect(() => {
    if (!current) return
    setThink('')
    setBecause('')
    setFeedback(null)
    setIsSubmitted(false)
  }, [current])

  const handleSubmit = () => {
    if (think.trim().length === 0 || because.trim().length === 0) {
      setFeedback({
        message: `${getEncourageMessage()} Fill in both boxes to submit your opinion.`,
        type: 'error',
      })
      return
    }

    markCompleted()
    award(1)
    setIsSubmitted(true)
    setFeedback({
      message: `${getSuccessMessage()} Clear opinion and reason. Press Next Question to continue.`,
      type: 'success',
    })
  }

  const handleNext = () => {
    setThink('')
    setBecause('')
    setFeedback(null)
    setIsSubmitted(false)
    next()
  }

  return (
    <ActivityCard
      icon="💬"
      title="Opinion Builder"
      description="Share what you think and explain why!"
      coach={{
        steps: ['Write what you think', 'Explain why you think it', 'Submit to earn stars'],
        tip: 'Use because and add one example to make your reason stronger.',
      }}
      color="essay"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-4">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-50 rounded-xl p-4 text-lg font-bold text-emerald-900 border-2 border-emerald-200 text-center"
          >
            {current}
          </motion.div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">I think...</label>
              <textarea
                value={think}
                onChange={e => setThink(e.target.value)}
                placeholder="Share your opinion..."
                className="w-full h-20 p-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-base resize-none font-medium"
                disabled={isSubmitted}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">...because</label>
              <textarea
                value={because}
                onChange={e => setBecause(e.target.value)}
                placeholder="Give your reasons..."
                className="w-full h-20 p-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-base resize-none font-medium"
                disabled={isSubmitted}
              />
            </div>
          </div>

          <FeedbackBanner message={feedback?.message} type={feedback?.type} />

          <div className="flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Submit Opinion ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Next Question ➜
              </button>
            )}
          </div>
        </div>
      )}
    </ActivityCard>
  )
}
