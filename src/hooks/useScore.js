import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'tinywriters-score'

function loadScore() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { totalStars: 0, streak: 0, bestStreak: 0, completed: 0, badges: [] }
}

const BADGE_DEFS = [
  { id: 'first-star', name: 'First Star', icon: '🌟', condition: s => s.totalStars >= 1 },
  { id: 'ten-stars', name: 'Star Collector', icon: '⭐', condition: s => s.totalStars >= 10 },
  { id: 'fifty-stars', name: 'Superstar', icon: '🏆', condition: s => s.totalStars >= 50 },
  { id: 'hundred-stars', name: 'Legend', icon: '👑', condition: s => s.totalStars >= 100 },
  { id: 'streak-5', name: 'On Fire', icon: '🔥', condition: s => s.bestStreak >= 5 },
  { id: 'streak-10', name: 'Unstoppable', icon: '💫', condition: s => s.bestStreak >= 10 },
  { id: 'ten-done', name: 'Getting Going', icon: '🚀', condition: s => s.completed >= 10 },
  { id: 'fifty-done', name: 'Practice Pro', icon: '🎯', condition: s => s.completed >= 50 },
  { id: 'hundred-done', name: 'Writing Wizard', icon: '🧙', condition: s => s.completed >= 100 },
]

export default function useScore() {
  const [score, setScore] = useState(loadScore)
  const [newBadge, setNewBadge] = useState(null)
  const [floatingStars, setFloatingStars] = useState([])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score))
  }, [score])

  const award = useCallback((attempts) => {
    const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1

    setFloatingStars(prev => [...prev, { id: Date.now(), count: stars }])
    setTimeout(() => {
      setFloatingStars(prev => prev.slice(1))
    }, 1000)

    setScore(prev => {
      const next = {
        ...prev,
        totalStars: prev.totalStars + stars,
        streak: attempts === 1 ? prev.streak + 1 : 0,
        bestStreak: attempts === 1 ? Math.max(prev.bestStreak, prev.streak + 1) : prev.bestStreak,
        completed: prev.completed + 1,
        badges: [...prev.badges],
      }
      for (const badge of BADGE_DEFS) {
        if (!next.badges.includes(badge.id) && badge.condition(next)) {
          next.badges.push(badge.id)
          setNewBadge(badge)
          setTimeout(() => setNewBadge(null), 3000)
        }
      }
      return next
    })
  }, [])

  const dismissBadge = useCallback(() => setNewBadge(null), [])

  return { score, award, newBadge, dismissBadge, floatingStars, badges: BADGE_DEFS }
}
