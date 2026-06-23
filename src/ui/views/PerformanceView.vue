<script lang="ts" setup>
import {computed, ref} from 'vue'
import {usePerformanceStore} from '@/stores/performance'
import {usePlayerStore} from '@/stores/player'
import {registries} from '@/core/registry'
import type {RoundResult} from '@/core/performance'
import {
  endPerformance,
  getAvailableStrategies,
  getMemberName,
  getPerformanceStatus,
  resolveRound,
} from '@/core/performance'
import type {PerformanceStrategy} from '@banglife/mod-types'

const performance = usePerformanceStore()
const player = usePlayerStore()
const base = import.meta.env.BASE_URL

const session = computed(() => performance.session)
const members = computed(() => player.state.band.members)

const roundResult = ref<RoundResult | null>(null)
const isResolving = ref(false)
const showResult = ref(false)

function getStrategyName(strategyId: string): string {
  return registries.strategies.get(strategyId)?.name ?? strategyId
}

function getStrategyDescription(strategyId: string): string {
  return registries.strategies.get(strategyId)?.description ?? ''
}

function getStrategiesByMember(memberId: string): PerformanceStrategy[] {
  const s = session.value
  if (!s) return []
  const member = members.value.find(m => m.id === memberId)
  if (!member) return []
  return getAvailableStrategies(member, s.currentRound, s.maxRounds, s.currentFever)
}

function handleNextRound() {
  if (!session.value || isResolving.value) return
  isResolving.value = true
  showResult.value = false

  roundResult.value = resolveRound()

  const status = getPerformanceStatus()
  if (status === 'success') {
    showResult.value = true
    setTimeout(() => {
      endPerformance('success')
      isResolving.value = false
    }, 1500)
  } else if (status === 'failure') {
    showResult.value = true
    setTimeout(() => {
      endPerformance('failure')
      isResolving.value = false
    }, 1500)
  } else {
    showResult.value = true
    isResolving.value = false
  }
}

function getMemberRoundScore(memberId: string): number {
  if (!roundResult.value) return 0
  return roundResult.value.memberResults[memberId]?.score ?? 0
}

function getMemberRoundFever(memberId: string): number {
  if (!roundResult.value) return 0
  return roundResult.value.memberResults[memberId]?.fever ?? 0
}

function getMemberRoundStrategy(memberId: string): string {
  if (!roundResult.value) return ''
  return roundResult.value.memberResults[memberId]?.strategyId ?? ''
}
</script>

<template>
  <div v-if="session" class="h-full overflow-y-auto bg-neutral-50">
    <div class="max-w-4xl mx-auto p-6 flex flex-col gap-5">
      <div class="rounded-xl border border-neutral-200 bg-white p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <h1 class="text-lg font-bold">{{ session.name }}</h1>
            <span class="text-sm text-muted">
              回合 {{ Math.min(session.currentRound, session.maxRounds) }}/{{ session.maxRounds }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3 mb-2">
          <span class="text-xs font-medium text-muted w-10 shrink-0">Fever</span>
          <div class="flex-1 h-3 rounded-full bg-neutral-100 overflow-hidden">
            <div
              :class="session.currentFever >= 70 ? 'bg-linear-to-r from-orange-400 to-red-500' : session.currentFever >= 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-neutral-300'"
              :style="{width: `${session.currentFever}%`}"
              class="h-full rounded-full transition-all duration-500"
            />
          </div>
          <span class="text-xs font-bold tabular-nums w-8 text-right">{{ session.currentFever }}</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-muted w-10 shrink-0">得分</span>
          <div class="flex-1 h-3 rounded-full bg-neutral-100 overflow-hidden">
            <div
              :style="{width: `${Math.min(100, (session.currentScore / session.targetScore) * 100)}%`}"
              class="h-full rounded-full bg-brand-pink transition-all duration-500"
            />
          </div>
          <span class="text-xs font-bold tabular-nums text-right">
            {{ Math.round(session.currentScore) }}/{{ session.targetScore }}
          </span>
        </div>
      </div>

      <div class="rounded-xl border border-neutral-200 bg-white p-4">
        <div class="text-xs text-muted font-medium mb-3">演出策略</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="member in members"
            :key="member.id"
            class="rounded-xl border border-neutral-200 bg-white p-3 flex flex-col gap-2"
          >
            <div class="flex items-center gap-1.5">
              <img
                :src="`${base}icons/character.svg`"
                alt=""
                class="w-3.5 h-3.5 shrink-0"
              />
              <span class="text-xs font-medium truncate">{{ getMemberName(member.id) }}</span>
              <span class="text-[10px] text-muted ml-auto">{{
                  registries.stats.get(member.instrument)?.name ?? member.instrument
                }}</span>
            </div>
            <select
              :value="session.strategies[member.id] ?? 'default'"
              class="text-xs rounded-lg border border-neutral-200 px-2 py-1.5 bg-white focus:outline-none focus:border-brand-pink w-full"
              @change="performance.assignStrategy(member.id, ($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="strategy in getStrategiesByMember(member.id)"
                :key="strategy.id"
                :value="strategy.id"
              >
                {{ strategy.name }}
              </option>
            </select>
            <div
              v-if="session.strategies[member.id]"
              class="text-[10px] text-muted leading-tight"
            >
              {{ getStrategyDescription(session.strategies[member.id]) }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="showResult && roundResult" class="rounded-xl border border-neutral-200 bg-white p-4">
        <div class="text-xs text-muted font-medium mb-3">
          第 {{ roundResult.round }} 回合
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="member in members"
            :key="member.id"
            class="flex items-center gap-2 text-xs"
          >
            <span class="font-medium w-20 truncate">{{ getMemberName(member.id) }}</span>
            <span class="text-muted">{{ getStrategyName(getMemberRoundStrategy(member.id)) }}</span>
            <span
              v-if="getMemberRoundFever(member.id) !== 0"
              :class="getMemberRoundFever(member.id) > 0 ? 'text-orange-500' : 'text-blue-500'"
              class="font-bold tabular-nums"
            >
              Fever {{ getMemberRoundFever(member.id) > 0 ? '+' : '' }}{{ getMemberRoundFever(member.id) }}
            </span>
            <span class="text-brand-pink font-bold tabular-nums ml-auto">
              +{{ Math.round(getMemberRoundScore(member.id)) }}
            </span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span class="text-muted">得分：</span>
          <span class="font-bold text-brand-pink">+{{ Math.round(roundResult.totalScore) }}</span>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          v-if="session.currentScore < session.targetScore && session.currentRound <= session.maxRounds"
          :disabled="isResolving"
          class="rounded-xl bg-brand-pink text-white px-8 py-3 text-sm font-bold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          @click="handleNextRound"
        >
          {{ isResolving ? '结算中...' : '下一回合' }}
        </button>
        <div v-else class="text-center">
          <div
            v-if="session.currentScore >= session.targetScore"
            class="text-lg font-bold text-brand-pink"
          >
            演出结束
          </div>
          <div v-else class="text-lg font-bold text-neutral-500">
            演出结束
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
