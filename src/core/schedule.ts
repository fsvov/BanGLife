import type {GameContext, NPC, NPCSchedule} from '@/core/types'
import {registries} from '@/core/registry'

function isScheduleActive(entry: NPCSchedule, ctx: GameContext): boolean {
  if (entry.weekday && !entry.weekday.includes(ctx.time.weekday)) return false
  if (entry.season && ctx.time.season && !entry.season.includes(ctx.time.season)) return false
  if (entry.condition && !entry.condition(ctx)) return false

  const startMin = entry.startHour * 60 + (entry.startMinute ?? 0)
  const endMin = entry.endHour * 60 + (entry.endMinute ?? 0)
  const currentMin = ctx.time.hour * 60 + ctx.time.minute

  return currentMin >= startMin && currentMin < endMin
}

export function getNPCLocation(npc: NPC, ctx: GameContext): string | undefined {
  if (!npc.schedule || npc.schedule.length === 0) return npc.locationId

  const activeEntries = npc.schedule
    .filter(entry => isScheduleActive(entry, ctx))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

  if (activeEntries.length > 0) return activeEntries[0].locationId

  return npc.locationId
}

export function getNPCsByLocation(locationId: string, ctx: GameContext): NPC[] {
  return registries.npcs.getAll().filter(npc => {
    return getNPCLocation(npc, ctx) === locationId
  })
}
