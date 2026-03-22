import { motion } from 'framer-motion'
import ScoreBar from './ScoreBar'

const TABS = [
  {
    id: 'creative',
    label: 'Creative Writing',
    icon: '✨',
    activeClass: 'bg-purple-500 text-white shadow-md scale-[1.02]',
    inactiveClass: 'bg-white text-gray-600 hover:bg-purple-50 hover:text-gray-800',
  },
  {
    id: 'grammar',
    label: 'Grammar',
    icon: '📝',
    activeClass: 'bg-blue-500 text-white shadow-md scale-[1.02]',
    inactiveClass: 'bg-white text-gray-600 hover:bg-blue-50 hover:text-gray-800',
  },
  {
    id: 'essay',
    label: 'Essay Skills',
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
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-purple-700 flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span>✏️</span>
            <span>TinyWriters</span>
          </h1>
          <ScoreBar score={score} floatingStars={floatingStars} />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white/50 border-b border-purple-50">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 flex gap-1.5 sm:gap-2 py-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer
                ${activeTab === tab.id ? tab.activeClass : tab.inactiveClass}
              `}
            >
              <span className="text-base sm:text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 sm:py-4 text-xs sm:text-sm text-gray-400 font-medium">
        TinyWriters — Making writing fun!
      </footer>
    </div>
  )
}
