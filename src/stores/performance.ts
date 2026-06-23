import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {RoundResult} from '@/core/performance'

export interface PerformanceSession {
  name: string
  currentScore: number
  targetScore: number
  currentFever: number
  currentRound: number
  maxRounds: number
  roundHistory: RoundResult[]
  strategies: Record<string, string>
  onSuccess: () => void
  onFailure: () => void
}

export const usePerformanceStore = defineStore('performance', () => {
  const session = ref<PerformanceSession | null>(null)

  function startSession(s: PerformanceSession): void {
    session.value = s
  }

  function assignStrategy(memberId: string, strategyId: string): void {
    if (!session.value) return
    session.value.strategies[memberId] = strategyId
  }

  function applyRoundResult(result: RoundResult): void {
    if (!session.value) return
    session.value.currentScore = result.currentScore
    session.value.currentFever = result.currentFever
    session.value.roundHistory.push(result)
    session.value.currentRound++
  }

  function endSession(): void {
    session.value = null
  }

  return {
    session,
    startSession,
    assignStrategy,
    applyRoundResult,
    endSession,
  }
})
