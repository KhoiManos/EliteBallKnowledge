import { Suspense } from 'react'
import TranslateContent from './TranslateContent'

export default function TranslatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TranslateContent />
    </Suspense>
  )
}