const SUCCESS_MESSAGES = [
  "Brilliant! 🌟",
  "Well done! ⭐",
  "Amazing work! 🎉",
  "You nailed it! 💪",
  "Fantastic! 🏆",
  "Super job! 🚀",
  "Wonderful! 🌈",
  "Great thinking! 🧠",
  "Perfect! ✨",
  "You're a star! 💫",
  "Keep it up! 🔥",
  "Spot on! 🎯",
]

const ENCOURAGE_MESSAGES = [
  "Not quite — try again!",
  "Almost! Have another go!",
  "Keep trying — you've got this!",
  "So close! Try another one!",
  "Good effort — try again!",
  "Nearly there! One more try!",
]

let successIdx = 0
let encourageIdx = 0

export function getSuccessMessage() {
  const msg = SUCCESS_MESSAGES[successIdx % SUCCESS_MESSAGES.length]
  successIdx++
  return msg
}

export function getEncourageMessage() {
  const msg = ENCOURAGE_MESSAGES[encourageIdx % ENCOURAGE_MESSAGES.length]
  encourageIdx++
  return msg
}
