import { useState, useCallback, useRef } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function usePool(data) {
  const [pool, setPool] = useState(() => shuffle([...Array(data.length).keys()]))
  const posRef = useRef(-1)
  const [current, setCurrent] = useState(null)
  const [completed, setCompleted] = useState(0)

  const next = useCallback(() => {
    posRef.current++
    if (posRef.current >= pool.length) {
      const newPool = shuffle([...Array(data.length).keys()])
      setPool(newPool)
      posRef.current = 0
      setCurrent(data[newPool[0]])
    } else {
      setCurrent(data[pool[posRef.current]])
    }
    setCompleted(c => c + (posRef.current > 0 || completed > 0 ? 0 : 0))
    return posRef.current
  }, [pool, data, completed])

  const markCompleted = useCallback(() => {
    setCompleted(c => c + 1)
  }, [])

  return { current, next, completed, markCompleted, total: data.length }
}
