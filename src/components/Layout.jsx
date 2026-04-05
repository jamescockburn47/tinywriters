import { motion } from 'framer-motion'
import ScoreBar from './ScoreBar'

const TABS = [
  {
    id: 'creative',
    label: 'Creative Writing',
    shortLabel: 'Creative',
    icon: '✨',
    activeClass: 'bg-purple-500 text-white shadow-md scale-[1.02]',
    inactiveClass: 'bg-white text-gray-600 hover:bg-purple-50 hover:text-gray-800',
  },
  {
    id: 'grammar',
    label: 'Grammar',
    shortLabel: 'Grammar',
    icon: '📝',
    activeClass: 'bg-blue-500 text-white shadow-md scale-[1.02]',
    inactiveClass: 'bg-white text-gray-600 hover:bg-blue-50 hover:text-gray-800',
  },
  {
    id: 'essay',
    label: 'Essay Skills',
    shortLabel: 'Essay',
    icon: '📖',
    activeClass: 'bg-emerald-500 text-white shadow-md scale-[1.02]',
    inactiveClass: 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-gray-800',
  },
]

export default function Layout({ activeTab, onTabChange, score, floatingStars, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-700 flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span>✏️</span>
            <span>TinyWriters</span>
          </h1>
          <ScoreBar score={score} floatingStars={floatingStars} />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white/50 border-b border-purple-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex gap-2 sm:gap-3 py-3">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 min-h-12 sm:min-h-13 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition-all cursor-pointer
                ${activeTab === tab.id ? tab.activeClass : tab.inactiveClass}
              `}
            >
              <span className="text-lg sm:text-xl">{tab.icon}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 sm:space-y-6"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 sm:py-6 text-sm sm:text-base text-gray-400 font-semibold">
        TinyWriters — Making writing fun!
      </footer>
    </div>
  )
}
