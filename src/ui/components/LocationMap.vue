<script lang="ts" setup>
import {computed} from 'vue'
import {usePlayerStore} from '@/stores/player'
import {useWorldStore} from '@/stores/world'
import {useUIStore} from '@/stores/ui'
import {registries} from '@/core/registry'
import type {Connection} from '@/core/types'
import {formatDate, formatTime} from '@/core/time'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const emit = defineEmits<{ move: [connection: Connection] }>()

const player = usePlayerStore()
const world = useWorldStore()
const ui = useUIStore()
const base = import.meta.env.BASE_URL

const currentLocationId = computed(() => player.state.currentLocationId)
const currentLocation = computed(() => world.getLocation(currentLocationId.value))

const timeStr = computed(() => formatTime(player.timeInfo))
const dateStr = computed(() => formatDate(player.timeInfo))

const mappedLocations = computed(() =>
  registries.locations.getAll().filter(loc => loc.x !== undefined && loc.y !== undefined)
)

const reachableIds = computed(() => new Set((currentLocation.value?.connections ?? []).map(c => c.to)))

function nodeStyle(isCur: boolean, isReach: boolean) {
  return {
    width: '100px',
    height: '42px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
    color: isCur ? '#f7a6c0' : isReach ? '#374151' : '#d4d4d4',
    backgroundColor: isCur || isReach ? '#ffffff' : '#fafafa',
    border: isCur
      ? '2px solid #f7a6c0'
      : isReach
        ? '1px solid #e5e5e5'
        : '1px solid #f5f5f5',
  }
}

const nodes = computed(() =>
  mappedLocations.value.map(loc => {
    const isCur = loc.id === currentLocationId.value
    const isReach = !isCur && reachableIds.value.has(loc.id)
    return {
      id: loc.id,
      type: 'default',
      position: {x: loc.x! * 150, y: loc.y! * 150},
      data: {label: loc.name},
      style: nodeStyle(isCur, isReach),
      connectable: false,
      selectable: false,
      draggable: false,
    }
  })
)

const edges = computed(() => {
  const list: any[] = []
  const drawn = new Set<string>()

  for (const loc of mappedLocations.value) {
    for (const conn of loc.connections) {
      const target = world.getLocation(conn.to)
      if (!target || target.x === undefined || target.y === undefined) continue
      const key = loc.id < conn.to ? `${loc.id}|${conn.to}` : `${conn.to}|${loc.id}`
      if (drawn.has(key)) continue
      drawn.add(key)

      const active = loc.id === currentLocationId.value || conn.to === currentLocationId.value
      list.push({
        id: key,
        source: loc.id,
        target: conn.to,
        style: {
          stroke: active ? '#f7a6c0' : '#e5e5e5',
          strokeWidth: active ? 2.5 : 1.5,
          strokeDasharray: active ? '' : '6,4',
        },
      })
    }
  }
  return list
})

const {zoomIn, zoomOut, fitView, onInit} = useVueFlow()

onInit(() => {
  requestAnimationFrame(() => fitView({padding: 0.2}))
})

function onNodeClick({node}: { node: { id: string } }) {
  const conn = currentLocation.value?.connections?.find(c => c.to === node.id)
  if (conn) emit('move', conn)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="map-slide">
      <div v-if="ui.activeMap" class="fixed inset-0 z-40 bg-white">
        <VueFlow
          :edges="edges"
          :nodes="nodes"
          :nodes-connectable="false"
          :nodes-draggable="false"
          :pan-on-drag="true"
          :zoom-on-scroll="true"
          class="w-full h-full"
          @node-click="onNodeClick"
        />

        <div class="absolute top-3 left-3 flex flex-col gap-1.5">
          <div class="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 shadow-sm">
            <div class="text-2xl font-bold tabular-nums leading-tight">{{ timeStr }}</div>
            <div class="text-xs text-muted mt-0.5 leading-tight">{{ dateStr }}</div>
          </div>
          <button
            class="w-full px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors shadow-sm"
            @click="ui.closeMap()"
          >
            收起地图
          </button>
        </div>

        <div class="absolute top-3 right-3 flex flex-col gap-1">
          <button
            class="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm"
            title="放大"
            @click="zoomIn()"
          >
            <img :src="`${base}icons/zoom-in.svg`" alt="放大" class="w-3.5 h-3.5"/>
          </button>
          <button
            class="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm"
            title="缩小"
            @click="zoomOut()"
          >
            <img :src="`${base}icons/zoom-out.svg`" alt="缩小" class="w-3.5 h-3.5"/>
          </button>
          <button
            class="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm"
            title="重置"
            @click="fitView({ padding: 0.2 })"
          >
            <img :src="`${base}icons/zoom-reset.svg`" alt="重置" class="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.map-slide-enter-active,
.map-slide-leave-active {
  transition: opacity 0.2s ease;
}

.map-slide-enter-from,
.map-slide-leave-to {
  opacity: 0;
}
</style>
