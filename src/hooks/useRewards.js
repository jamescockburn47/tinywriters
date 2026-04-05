const SUCCESS_MESSAGES = [
  "Brilliant solving! 🌟",
  "Well done, writer! ⭐",
  "Amazing thinking! 🎉",
  "You nailed that one! 💪",
  "Fantastic focus! 🏆",
  "Super smart move! 🚀",
  "Wonderful effort! 🌈",
  "Great clue-spotting! 🧠",
  "Perfect pick! ✨",
  "You are a star today! 💫",
  "Keep that streak going! 🔥",
  "Spot on answer! 🎯",
]

const ENCOURAGE_MESSAGES = [
  "Nice try! Read it again and test another choice.",
  "Almost there! Look for a key clue and try again.",
  "Good effort! Slow down and give it one more go.",
  "So close! You are learning - pick your next best answer.",
  "Keep going! Check the words carefully and try again.",
  "Nearly there! One more thoughtful try will do it.",
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
