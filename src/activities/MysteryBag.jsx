import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/mysteryBag'
import ActivityCard from '../components/ActivityCard'

export default function MysteryBag({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [text, setText] = useState('')

  useEffect(() => { if (active && !current) next() }, [active, current])

  const handleNext = () => {
    if (text.trim().length > 0) {
      markCompleted()
      award(1)
    }
    setText('')
    next()
  }

  return (
    <ActivityCard
      icon="🎒"
      title="Mystery Bag"
      description="Pull out a prompt and write something amazing!"
      color="creative"
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
            className="bg-purple-50 rounded-xl p-4 text-lg font-medium text-purple-900 border-2 border-purple-200"
          >
            {current}
          </motion.div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Continue the story..."
            className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-base resize-none font-medium"
          />

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors cursor-pointer"
            >
              Next Prompt ➜
            </button>
          </div>
        </div>
      )}
    </ActivityCard>
  )
}
