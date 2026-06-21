<script lang="ts" setup>
import {computed} from 'vue'
import {usePlayerStore} from '@/stores/player'
import {useWorldStore} from '@/stores/world'
import {useUIStore} from '@/stores/ui'
import {registries} from '@/core/registry'
import {makeGameContext} from '@/mod/api'
import {triggerEvents} from '@/core/scheduler'
import {applyEffects} from '@/core/effects'
import {getShopsByLocation} from '@/core/shop'
import {getNPCsByLocation} from '@/core/schedule'
import type {Action, Connection} from '@/core/types'
import {ACTION_TAG_LABELS, CONNECTION_TAG_LABELS} from '@/core/constants'
import LocationMap from '@/ui/components/LocationMap.vue'

const player = usePlayerStore()
const world = useWorldStore()
const ui = useUIStore()

const base = import.meta.env.BASE_URL

const location = computed(() => world.getLocation(player.state.currentLocationId))
const connections = computed(() => location.value?.connections ?? [])
const ctx = computed(() => makeGameContext())
const locationActions = computed(() => world.getActionsForLocation(player.state.currentLocationId, ctx.value))
const locationShops = computed(() => getShopsByLocation(player.state.currentLocationId, ctx.value))
const locationNPCs = computed(() => getNPCsByLocation(player.state.currentLocationId, ctx.value))

function getNPCActions(npcId: string): Action[] {
  const npc = registries.npcs.get(npcId)
  if (!npc?.actions) return []
  const context = ctx.value
  return npc.actions
    .map(actionId => registries.actions.get(actionId))
    .filter((action): action is Action => action !== undefined)
    .filter(action => {
      if (!context) return true
      return (action.visible ?? action.available)?.(context) ?? true
    })
}

const groupedActions = computed(() => {
  const groups: Record<string, Action[]> = {}
  for (const action of locationActions.value) {
    const tag = action.tag ?? 'other'
    if (!groups[tag]) groups[tag] = []
    groups[tag].push(action)
  }
  return groups
})

const groupedConnections = computed(() => {
  const groups: Record<string, Connection[]> = {}
  for (const conn of connections.value) {
    const tag = conn.tag ?? 'other'
    if (!groups[tag]) groups[tag] = []
    groups[tag].push(conn)
  }
  return groups
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

function moveTo(connection: Connection) {
  player.advanceTime(connection.duration)
  triggerEvents({type: 'time:tick', minutes: connection.duration}, makeGameContext())
  player.moveTo(connection.to)
  const evtPassageId = triggerEvents({type: 'location:enter', locationId: connection.to}, makeGameContext())
  if (evtPassageId) showPassageById(evtPassageId)
}

function isActionDisabled(action: Action): boolean {
  const context = ctx.value
  return !!action.available && !action.available(context)
}

function resolveDescription(action: Action): string {
  const context = ctx.value
  if (typeof action.description === 'function') return action.description(context)
  return action.description ?? ''
}

function getActionTitle(action: Action): string {
  const desc = resolveDescription(action)
  if (desc) return desc
  return action.label
}

function executeAction(action: Action) {
  const context = ctx.value
  if (action.available && !action.available(context)) return

  if (action.effects) {
    applyEffects(action.effects)
  }

  player.advanceTime(action.duration)

  const tickPassageId = triggerEvents({type: 'time:tick', minutes: action.duration}, makeGameContext())

  if (action.execute) {
    action.execute(makeGameContext())
  }

  const afterPassageId = triggerEvents({type: 'action:after', actionId: action.id}, makeGameContext())

  if (action.passage) {
    showPassageById(action.passage)
  } else if (afterPassageId) {
    showPassageById(afterPassageId)
  } else if (tickPassageId) {
    showPassageById(tickPassageId)
  }
}
</script>

<template>
  <main class="flex flex-col h-full overflow-hidden">
    <div class="px-6 pt-5 pb-3 border-b border-neutral-200 bg-white shrink-0">
      <div class="flex items-center gap-3">
        <h2 class="text-xl font-bold">{{ location?.name ?? '未知地点' }}</h2>
        <button
          class="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm"
          title="区域地图"
          @click="ui.openMap()"
        >
          <img :src="`${base}icons/map.svg`" alt="地图" class="w-3.5 h-3.5"/>
        </button>
      </div>
      <p class="text-sm text-muted mt-1 leading-relaxed">{{ location?.description ?? '' }}</p>
    </div>

    <div class="flex-1 overflow-y-auto min-h-0 px-6 py-4 flex flex-col gap-4">
      <div v-for="(acts, tag) in groupedActions" :key="tag">
        <div class="text-xs text-muted mb-2 font-medium">{{ ACTION_TAG_LABELS[tag] ?? tag }}</div>
        <div class="flex flex-col gap-2">
          <button
            v-for="action in acts"
            :key="action.id"
            :disabled="isActionDisabled(action)"
            :title="getActionTitle(action)"
            class="w-full text-left rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:border-brand-pink hover:shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            @click="executeAction(action)"
          >
            <span class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <img v-if="action.icon" :alt="action.label" :src="`${base}icons/${action.icon}`" class="w-4 h-4"/>
                <span class="text-sm font-medium">{{ action.label }}</span>
              </span>
              <span class="text-xs text-muted tabular-nums">{{ action.duration }} 分钟</span>
            </span>
            <span v-if="resolveDescription(action)" class="text-xs text-muted mt-0.5">{{
                resolveDescription(action)
              }}</span>
          </button>
        </div>
      </div>

      <div v-if="locationShops.length > 0">
        <div class="text-xs text-muted mb-2 font-medium">商店</div>
        <div class="flex flex-col gap-2">
          <button
            v-for="shop in locationShops"
            :key="shop.id"
            class="w-full text-left rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:border-brand-pink hover:bg-pink-50/50 transition-all"
            @click="ui.openShop(shop.id)"
          >
            <span class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <img v-if="shop.icon" :alt="shop.name" :src="`${base}icons/${shop.icon}`" class="w-4 h-4"/>
                <span class="text-sm font-medium">打开商店</span>
              </span>
              <span class="text-xs text-muted tabular-nums">0 分钟</span>
            </span>
            <span v-if="shop.description" class="block text-xs text-muted mt-0.5">{{ shop.description }}</span>
          </button>
        </div>
      </div>

      <div v-if="locationNPCs.length > 0">
        <div class="text-xs text-muted mb-2 font-medium">角色</div>
        <div class="flex flex-col gap-2">
          <template v-for="npc in locationNPCs" :key="npc.id">
            <button
              class="rounded-xl border border-neutral-200 bg-white px-4 py-3 flex items-center gap-2 hover:border-brand-pink hover:bg-pink-50/50 transition-all w-full text-left"
              @click="ui.openNPC(npc.id)"
            >
              <img :alt="npc.name" :src="`${base}icons/character.svg`" class="w-4 h-4"/>
              <span class="text-sm font-medium">{{ npc.name }}</span>
            </button>
            <div class="ml-5 flex flex-col gap-2">
              <div
                v-for="action in getNPCActions(npc.id)"
                :key="action.id"
                class="flex items-center gap-3"
              >
                <span class="w-1.5 h-1.5 bg-neutral-400 rounded-full shrink-0"></span>
                <button
                  :disabled="isActionDisabled(action)"
                  :title="getActionTitle(action)"
                  class="flex-1 text-left rounded-xl border border-neutral-200 bg-white px-4 py-2.5 hover:bg-pink-50/50 hover:border-brand-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          </template>
        </div>
      </div>

      <div v-for="(conns, tag) in groupedConnections" :key="tag">
        <div class="text-xs text-muted mb-2 font-medium">{{ CONNECTION_TAG_LABELS[tag] ?? tag }}</div>
        <div class="flex flex-col gap-2">
          <button
            v-for="conn in conns"
            :key="conn.to"
            class="w-full text-left rounded-xl border border-dashed border-neutral-300 bg-white px-4 py-3 hover:border-brand-pink hover:bg-pink-50/50 transition-all"
            @click="moveTo(conn)"
          >
            <span class="flex items-center justify-between">
              <span class="flex items-center gap-2">
                <img v-if="conn.icon" :alt="conn.label" :src="`${base}icons/${conn.icon}`" class="w-4 h-4"/>
                <span class="text-sm font-medium">{{ conn.label ?? conn.to }}</span>
              </span>
              <span class="text-xs text-muted tabular-nums">→ {{ conn.duration }} 分钟</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <LocationMap @move="moveTo"/>
  </main>
</template>
