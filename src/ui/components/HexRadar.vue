<script lang="ts" setup>
import {computed} from 'vue'
import {registries} from '@/core/registry'

const attributes = ['expression', 'technique', 'rhythm', 'pitch', 'ensemble', 'improvisation']

const props = defineProps<{
  values: Record<string, number>
  max?: number
  size?: number
}>()

const max = computed(() => props.max ?? 100)
const size = computed(() => props.size ?? 200)
const cx = computed(() => size.value / 2)
const cy = computed(() => size.value / 2)
const radius = computed(() => size.value / 2 - 28)

function angleFor(i: number): number {
  return -Math.PI / 2 + (2 * Math.PI * i) / attributes.length
}

function pointAt(i: number, r: number): { x: number; y: number } {
  const a = angleFor(i)
  return {
    x: cx.value + r * Math.cos(a),
    y: cy.value + r * Math.sin(a),
  }
}

const gridLevels = [0.25, 0.5, 0.75, 1]

const gridPaths = computed(() => gridLevels.map(level => {
  const r = radius.value * level
  return attributes.map((_, i) => {
    const p = pointAt(i, r)
    return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`
  }).join(' ') + ' Z'
}))

const valuePath = computed(() => {
  return attributes.map((id, i) => {
    const val = props.values[id] ?? 0
    const r = radius.value * Math.min(val / max.value, 1)
    const p = pointAt(i, r)
    return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`
  }).join(' ') + ' Z'
})

const labelPositions = computed(() => {
  return attributes.map((id, i) => {
    const p = pointAt(i, radius.value + 18)
    return {x: p.x, y: p.y, label: registries.stats.get(id)?.name ?? id, value: Math.round(props.values[id] ?? 0)}
  })
})

const axisLines = computed(() => {
  return attributes.map((_, i) => {
    const p = pointAt(i, radius.value)
    return {x1: cx.value, y1: cy.value, x2: p.x, y2: p.y}
  })
})
</script>

<template>
  <svg :height="size" :viewBox="`0 0 ${size} ${size}`" :width="size">
    <path
      v-for="(path, idx) in gridPaths"
      :key="'grid-' + idx"
      :d="path"
      fill="none"
      stroke="#e5e5e5"
      stroke-width="1"
    />
    <line
      v-for="(axis, idx) in axisLines"
      :key="'axis-' + idx"
      :x1="axis.x1" :x2="axis.x2"
      :y1="axis.y1" :y2="axis.y2"
      stroke="#e5e5e5"
      stroke-width="1"
    />
    <path
      :d="valuePath"
      fill="rgba(99, 102, 241, 0.15)"
      stroke="rgba(99, 102, 241, 0.6)"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <text
      v-for="(lp, idx) in labelPositions"
      :key="'label-' + idx"
      :x="lp.x"
      :y="lp.y"
      class="text-[10px] fill-neutral-500"
      dominant-baseline="central"
      text-anchor="middle"
    >
      {{ lp.label }} {{ lp.value }}
    </text>
  </svg>
</template>

<script lang="ts">
export default {name: 'HexRadar'}
</script>
