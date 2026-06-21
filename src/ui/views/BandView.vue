<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useBandStore} from '@/stores/band'
import {useUIStore} from '@/stores/ui'
import {usePlayerStore} from '@/stores/player'
import {registries} from '@/core/registry'
import type {BandMember} from '@banglife/mod-types'

const band = useBandStore()
const ui = useUIStore()
const player = usePlayerStore()

const base = import.meta.env.BASE_URL

const editingName = ref(false)
const nameInput = ref('')
const showInvite = ref(false)

const bandName = computed(() => band.band.name || '未命名的乐队')

function getMemberName(id: string) {
  if (id === 'player') return player.state.name
  return registries.npcs.get(id)?.name ?? id
}

interface MemberSlot {
  type: 'member'
  member: BandMember
}

interface EmptySlot {
  type: 'empty'
}

type BandSlot = MemberSlot | EmptySlot

const memberSlots = computed<BandSlot[]>(() => {
  const slots: BandSlot[] = []
  for (const member of band.band.members) {
    slots.push({type: 'member', member})
  }
  while (slots.length < 6) {
    slots.push({type: 'empty'})
  }
  return slots
})

function startEditName() {
  nameInput.value = band.band.name
  editingName.value = true
}

function confirmName() {
  band.setBandName(nameInput.value)
  editingName.value = false
}

function cancelEditName() {
  editingName.value = false
}

function handleAddMember(npcId: string) {
  if (band.addMember(npcId, 'vocal', 'rhythm')) {
    showInvite.value = false
  }
}

function handleAddPlayer() {
  if (band.addMember('player', 'vocal', 'lead')) {
    showInvite.value = false
  }
}

function handleRemoveMember(npcId: string) {
  ui.showConfirm({
    title: '移除成员',
    description: `确定要将该成员从乐队中移除吗？`,
    variant: 'danger',
    onConfirm: () => {
      band.removeMember(npcId)
    },
  })
}
</script>

<template>
  <div class="h-full overflow-y-auto bg-neutral-50">
    <div class="max-w-12xl mx-auto p-6 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="`${base}icons/microphone.svg`" alt="乐队" class="w-5 h-5"/>
          <div v-if="!editingName" class="flex items-center gap-2">
            <h1 class="text-lg font-bold">{{ bandName }}</h1>
            <button
              class="text-xs text-muted hover:text-brand-pink transition-colors"
              @click="startEditName"
            >
              <img :src="`${base}icons/edit.svg`" alt="编辑" class="w-3.5 h-3.5"/>
            </button>
          </div>
          <div v-else class="flex items-center gap-2">
            <input
              v-model="nameInput"
              class="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm focus:outline-none focus:border-brand-pink"
              placeholder="输入乐队名称"
              @keydown.enter="confirmName"
              @keydown.esc="cancelEditName"
            />
            <button
              class="text-xs font-medium text-brand-pink hover:underline"
              @click="confirmName"
            >
              确定
            </button>
            <button
              class="text-xs text-muted hover:underline"
              @click="cancelEditName"
            >
              取消
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-neutral-200 bg-white p-4">
        <div class="text-xs text-muted font-medium mb-3">成员 ({{ band.band.members.length }}/6)</div>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <template v-for="(slot, idx) in memberSlots" :key="idx">
            <div
              v-if="slot.type === 'member'"
              class="rounded-xl border border-neutral-200 bg-white p-2 flex flex-col gap-1.5 h-24"
            >
              <div class="flex items-center gap-1">
                <img :src="`${base}icons/character.svg`" alt="" class="w-3.5 h-3.5 shrink-0"/>
                <span class="text-xs font-medium truncate flex-1">{{ getMemberName(slot.member.id) }}</span>
                <button
                  class="text-[10px] text-muted hover:text-red-500 transition-colors"
                  @click="handleRemoveMember(slot.member.id)"
                >
                  ✕
                </button>
              </div>
              <select
                :value="slot.member.instrument"
                class="text-xs rounded-md border border-neutral-200 px-2 py-1 bg-white focus:outline-none focus:border-brand-pink w-full"
                @change="band.updateMember(slot.member.id, {instrument: ($event.target as HTMLSelectElement).value})"
              >
                <option v-for="inst in registries.stats.getAll().filter(s => s.category === 'instrument')"
                        :key="inst.id" :value="inst.id">
                  {{ inst.name }}
                </option>
              </select>
              <select
                :value="slot.member.role"
                class="text-xs rounded-md border border-neutral-200 px-2 py-1 bg-white focus:outline-none focus:border-brand-pink w-full"
                @change="band.updateMember(slot.member.id, {role: ($event.target as HTMLSelectElement).value as 'lead' | 'rhythm'})"
              >
                <option value="lead">主音</option>
                <option value="rhythm">节奏</option>
              </select>
            </div>
            <button
              v-else
              :disabled="band.band.members.length >= 6"
              class="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-3 flex flex-col items-center justify-center text-muted hover:border-brand-pink hover:text-brand-pink transition-colors disabled:opacity-40 disabled:cursor-not-allowed h-24"
              @click="showInvite = true"
            >
              <span class="text-xl">+</span>
            </button>
          </template>
        </div>
      </div>

      <div v-if="showInvite" class="rounded-xl border border-neutral-200 bg-white p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-xs text-muted font-medium">邀请</div>
          <button
            class="text-xs text-muted hover:text-brand-pink transition-colors"
            @click="showInvite = false"
          >
            关闭
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-if="!band.band.members.some(m => m.id === 'player')"
            class="rounded-xl border border-neutral-200 bg-white p-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <img :src="`${base}icons/character.svg`" alt="" class="w-4 h-4"/>
              <span class="text-sm font-medium">{{ player.state.name || '自己' }}</span>
            </div>
            <button
              class="rounded-lg border border-brand-pink/40 bg-pink-50 px-3 py-1.5 text-xs font-medium text-brand-pink hover:bg-pink-100 transition-colors"
              @click="handleAddPlayer"
            >
              加入
            </button>
          </div>
          <div
            v-for="npc in band.availableNPCs"
            :key="npc.id"
            class="rounded-xl border border-neutral-200 bg-white p-3 flex items-center justify-between"
          >
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <img :src="`${base}icons/character.svg`" alt="" class="w-4 h-4"/>
                <span class="text-sm font-medium">{{ npc.name }}</span>
              </div>
              <span class="text-[10px] text-muted">好感度 {{
                  player.state.relationships[npc.id]?.affection ?? 0
                }}</span>
            </div>
            <button
              class="rounded-lg border border-brand-pink/40 bg-pink-50 px-3 py-1.5 text-xs font-medium text-brand-pink hover:bg-pink-100 transition-colors"
              @click="handleAddMember(npc.id)"
            >
              邀请
            </button>
          </div>
          <div v-if="band.availableNPCs.length === 0 && band.band.members.some(m => m.id === 'player')"
               class="text-xs text-neutral-400 text-center py-2">
            暂无可邀请的角色
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
