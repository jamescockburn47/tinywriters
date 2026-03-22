import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePool from '../hooks/usePool'
import data from '../data/sentences'
import ActivityCard from '../components/ActivityCard'
import WordChip from '../components/WordChip'
import FeedbackBanner from '../components/FeedbackBanner'
import { TYPE_NAMES } from '../components/WordChip'
import { getSuccessMessage, getEncourageMessage } from '../hooks/useRewards'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function BuildSentence({ active, onSelect, award }) {
  const { current, next, completed, markCompleted, total } = usePool(data)
  const [shuffledWords, setShuffledWords] = useState([])
  const [targetWords, setTargetWords] = useState([])
  const [placed, setPlaced] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [wrongIdx, setWrongIdx] = useState(null)
  const [done, setDone] = useState(false)
  const [shownTypes, setShownTypes] = useState(new Set())

  useEffect(() => { if (active && !current) next() }, [active, current])

  useEffect(() => {
    if (current) {
      // Pick one variant: either the base ending or a random alternative
      const words = [...current.words]
      if (current.alternatives && current.alternatives.length > 0) {
        // All options for the last position: the base last word + each alternative
        const lastWord = words[words.length - 1]
        const allEndings = [lastWord, ...current.alternatives.map(alt => alt[0])]
        const chosen = allEndings[Math.floor(Math.random() * allEndings.length)]
        words[words.length - 1] = chosen
      }
      setTargetWords(words)
      setShuffledWords(shuffle(words))
      setPlaced([])
      setAttempts(0)
      setFeedback(null)
      setDone(false)
      setWrongIdx(null)
    }
  }, [current])

  const handleChipClick = (wordObj, idx) => {
    if (done || placed.includes(idx)) return

    const nextPos = placed.length
    const expected = targetWords[nextPos]
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (wordObj.word === expected.word && wordObj.type === expected.type) {
      const newPlaced = [...placed, idx]
      setPlaced(newPlaced)
      setWrongIdx(null)

      const isNewType = !shownTypes.has(wordObj.type)
      if (isNewType) {
        setShownTypes(prev => new Set([...prev, wordObj.type]))
        setFeedback({
          message: `${wordObj.type.charAt(0).toUpperCase() + wordObj.type.slice(1)} — a ${TYPE_NAMES[wordObj.type] || wordObj.type}!`,
          type: 'info'
        })
      } else {
        setFeedback(null)
      }

      if (newPlaced.length >= targetWords.length) {
        setFeedback({ message: getSuccessMessage(), type: 'success' })
        setDone(true)
        markCompleted()
        award(newAttempts)
      }
    } else {
      setWrongIdx(idx)
      setFeedback({ message: getEncourageMessage(), type: 'error' })
      setTimeout(() => setWrongIdx(null), 400)
    }
  }

  return (
    <ActivityCard
      icon="🔨"
      title="Build a Sentence"
      description="Click the words in order to build a sentence! Watch for word types."
      color="grammar"
      completed={completed}
      total={total}
      active={active}
      onClick={onSelect}
    >
      {current && (
        <div className="space-y-3 sm:space-y-4">
          {/* Build area - placed words */}
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4 min-h-[52px] sm:min-h-[64px] border-2 border-dashed border-blue-300 flex flex-wrap gap-1.5 sm:gap-2 items-center">
            {placed.length === 0 && (
              <span className="text-blue-300 italic text-sm sm:text-base">Click the words below in the right order...</span>
            )}
            <AnimatePresence>
              {placed.map((wordIdx) => {
                const w = shuffledWords[wordIdx]
                return (
                  <WordChip
                    key={`placed-${wordIdx}`}
                    word={w.word}
                    type={w.type}
                    placed
                    showType
                  />
                )
              })}
              {done && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-extrabold text-gray-700"
                >.</motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Word bank */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {shuffledWords.map((w, idx) => (
              <WordChip
                key={`bank-${idx}`}
                word={w.word}
                type={w.type}
                placed={placed.includes(idx)}
                wrong={wrongIdx === idx}
                disabled={placed.includes(idx) || done}
                onClick={() => handleChipClick(w, idx)}
              />
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
                className="bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-colors cursor-pointer"
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
