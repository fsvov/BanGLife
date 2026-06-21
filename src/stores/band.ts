import {defineStore} from 'pinia'
import {computed} from 'vue'
import {usePlayerStore} from './player'
import {registries} from '@/core/registry'
import type {BandMember} from '@banglife/mod-types'

export const useBandStore = defineStore('band', () => {
  const player = usePlayerStore()

  const band = computed(() => player.state.band)

  const availableNPCs = computed(() => {
    const memberIds = new Set(band.value.members.map(m => m.id))
    return registries.npcs.getAll().filter(npc => {
      if (memberIds.has(npc.id)) return false
      const rel = player.state.relationships[npc.id]
      if (!rel || rel.affection <= 40) return false
      return npc.tags?.includes('band') ?? false
    })
  })

  function addMember(id: string, instrument: string, role: 'lead' | 'rhythm'): boolean {
    if (band.value.members.length >= 6) return false
    if (band.value.members.some(m => m.id === id)) return false
    if (id === 'player') {
      band.value.members.push({id: 'player', instrument, role})
      return true
    }
    const npc = registries.npcs.get(id)
    if (!npc) return false
    const rel = player.state.relationships[id]
    if (!rel || rel.affection <= 40) return false
    if (!(npc.tags?.includes('band') ?? false)) return false
    band.value.members.push({id, instrument, role})
    return true
  }

  function removeMember(id: string): boolean {
    const idx = band.value.members.findIndex(m => m.id === id)
    if (idx === -1) return false
    band.value.members.splice(idx, 1)
    return true
  }

  function updateMember(id: string, updates: Partial<Pick<BandMember, 'instrument' | 'role'>>): void {
    const member = band.value.members.find(m => m.id === id)
    if (!member) return
    if (updates.instrument !== undefined) member.instrument = updates.instrument
    if (updates.role !== undefined) member.role = updates.role
  }

  function setBandName(name: string): void {
    band.value.name = name
  }

  return {
    band,
    availableNPCs,
    addMember,
    removeMember,
    updateMember,
    setBandName,
  }
})
