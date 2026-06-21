<script lang="ts" setup>
import {computed} from 'vue'
import {useUIStore} from '@/stores/ui'
import {usePlayerStore} from '@/stores/player'
import {registries} from '@/core/registry'
import {applyEffects} from '@/core/effects'
import {triggerEvents} from '@/core/scheduler'
import {makeGameContext} from '@/mod/api'
import type {Action} from '@/core/types'

const ui = useUIStore()
const player = usePlayerStore()

const base = import.meta.env.BASE_URL

const npc = computed(() => {
  if (!ui.activeNPCId) return null
  return registries.npcs.get(ui.activeNPCId) ?? null
})

const relationship = computed(() => {
  if (!ui.activeNPCId) return null
  return player.state.relationships[ui.activeNPCId] ?? null
})

const affection = computed(() => relationship.value?.affection ?? 0)

const barWidth = computed(() => Math.min(100, Math.max(0, affection.value)))

const npcActions = computed(() => {
  if (!npc.value?.actions) return []
  const context = makeGameContext()
  return npc.value.actions
    .map(actionId => registries.actions.get(actionId))
    .filter((action): action is Action => action !== undefined)
    .filter(action => {
      if (!context) return true
      return (action.visible ?? action.available)?.(context) ?? true
    })
})

function showPassageById(passageId: string) {
  const passage = registries.passages.get(passageId)
  if (!passage) return
  ui.showPassage({
    text: passage.text,
    speaker: passage.speaker,
    choices: passage.choices ?? [],
  })
}

function executeAction(action: Action) {
  const context = makeGameContext()
  if (action.available && !action.available(context)) return

  if (action.effects) applyEffects(action.effects)

  player.advanceTime(action.duration)

  triggerEvents({type: 'time:tick', minutes: action.duration}, makeGameContext())

  if (action.execute) {
    action.execute(makeGameContext())
  }

  const afterPassageId = triggerEvents({type: 'action:after', actionId: action.id}, makeGameContext())

  if (action.passage) {
    showPassageById(action.passage)
  } else if (afterPassageId) {
    showPassageById(afterPassageId)
  }
}

function isActionDisabled(action: Action): boolean {
  const context = makeGameContext()
  return !!action.available && !action.available(context)
}

function resolveDescription(action: Action): string {
  const context = makeGameContext()
  if (typeof action.description === 'function') return action.description(context)
  return action.description ?? ''
}

function getActionTitle(action: Action): string {
  const desc = resolveDescription(action)
  if (desc) return desc
  return action.label
}
</script>

<template>
  <Transition name="npc-overlay">
    <div
      v-if="npc"
      class="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4"
    >
      <div class="absolute inset-0" @click="ui.closeNPC()"></div>
      <div
        class="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-xl p-6"
      >
        <div class="flex items-center gap-3 mb-4">
          <img :alt="npc.name" :src="`${base}icons/character.svg`" class="w-5 h-5 shrink-0"/>
          <div class="text-base font-bold truncate">{{ npc.name }}</div>
        </div>

        <div class="rounded-xl border border-neutral-200 bg-white p-4 mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-muted">好感度</span>
            <span class="text-xs font-medium text-neutral-700">{{ affection }}</span>
          </div>
          <div class="h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              :style="{width: `${barWidth}%`}"
              class="h-full rounded-full bg-brand-pink transition-all duration-300"
            />
          </div>
        </div>

        <div v-if="npcActions.length > 0" class="flex flex-col gap-2">
          <div class="text-xs text-muted font-medium">互动</div>
          <div class="flex flex-col gap-2">
            <button
              v-for="action in npcActions"
              :key="action.id"
              :disabled="isActionDisabled(action)"
              :title="getActionTitle(action)"
              class="w-full text-left rounded-xl border border-neutral-200 bg-white px-4 py-2.5 hover:bg-pink-50/50 hover:border-brand-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              @click="executeAction(action)"
            >
              <span class="flex items-center justify-between">
                <span class="flex items-center gap-2">
                  <img v-if="action.icon" :alt="action.label" :src="`${base}icons/${action.icon}`" class="w-4 h-4"/>
                  <span class="text-sm">{{ action.label }}</span>
                </span>
                <span class="text-xs text-muted tabular-nums">{{ action.duration }} 分钟</span>
              </span>
              <span v-if="resolveDescription(action)" class="text-xs text-muted mt-0.5">
                {{ resolveDescription(action) }}
              </span>
            </button>
          </div>
        </div>

        <button
          class="mt-4 text-xs text-muted hover:text-brand-pink transition-colors"
          @click="ui.closeNPC()"
        >
          关闭 →
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.npc-overlay-enter-active,
.npc-overlay-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.npc-overlay-enter-from,
.npc-overlay-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
