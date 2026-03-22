import { useState } from 'react'
import Layout from './components/Layout'
import RewardPopup from './components/RewardPopup'
import useScore from './hooks/useScore'

import MysteryBag from './activities/MysteryBag'
import SimileBuilder from './activities/SimileBuilder'
import BuildSentence from './activities/BuildSentence'
import PunctuationDetective from './activities/PunctuationDetective'
import AdjectiveOrder from './activities/AdjectiveOrder'
import OpinionBuilder from './activities/OpinionBuilder'
import StorySequencer from './activities/StorySequencer'

const TAB_ACTIVITIES = {
  creative: ['mystery-bag', 'simile-builder'],
  grammar: ['build-sentence', 'punctuation-detective', 'adjective-order'],
  essay: ['opinion-builder', 'story-sequencer'],
}

export default function App() {
  const [activeTab, setActiveTab] = useState('creative')
  const [activeActivity, setActiveActivity] = useState(null)
  const { score, award, newBadge, dismissBadge, floatingStars } = useScore()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setActiveActivity(null)
  }

  const activities = TAB_ACTIVITIES[activeTab]

  return (
    <>
      <Layout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        score={score}
        floatingStars={floatingStars}
      >
        <div className="space-y-4">
          {activities.includes('mystery-bag') && (
            <MysteryBag
              active={activeActivity === 'mystery-bag'}
              onSelect={() => setActiveActivity('mystery-bag')}
              award={award}
            />
          )}
          {activities.includes('simile-builder') && (
            <SimileBuilder
              active={activeActivity === 'simile-builder'}
              onSelect={() => setActiveActivity('simile-builder')}
              award={award}
            />
          )}
          {activities.includes('build-sentence') && (
            <BuildSentence
              active={activeActivity === 'build-sentence'}
              onSelect={() => setActiveActivity('build-sentence')}
              award={award}
            />
          )}
          {activities.includes('punctuation-detective') && (
            <PunctuationDetective
              active={activeActivity === 'punctuation-detective'}
              onSelect={() => setActiveActivity('punctuation-detective')}
              award={award}
            />
          )}
          {activities.includes('adjective-order') && (
            <AdjectiveOrder
              active={activeActivity === 'adjective-order'}
              onSelect={() => setActiveActivity('adjective-order')}
              award={award}
            />
          )}
          {activities.includes('opinion-builder') && (
            <OpinionBuilder
              active={activeActivity === 'opinion-builder'}
              onSelect={() => setActiveActivity('opinion-builder')}
              award={award}
            />
          )}
          {activities.includes('story-sequencer') && (
            <StorySequencer
              active={activeActivity === 'story-sequencer'}
              onSelect={() => setActiveActivity('story-sequencer')}
              award={award}
            />
          )}
        </div>
      </Layout>

      <RewardPopup badge={newBadge} onDismiss={dismissBadge} />
    </>
  )
}
