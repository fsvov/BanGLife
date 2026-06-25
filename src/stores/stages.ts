import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {registries} from '@/core/registry'
import type {Stage} from '@/core/types'

export const useStagesStore = defineStore('stages', () => {
  const stages = computed<Stage[]>(() => registries.stages.getAll())
  const completedIds = ref<Set<string>>(new Set())

  function completeStage(stageId: string): void {
    completedIds.value.add(stageId)
  }

  function isCompleted(stageId: string): boolean {
    return completedIds.value.has(stageId)
  }

  function isUnlocked(stage: Stage): boolean {
    if (!stage.requires) return true
    return isCompleted(stage.requires)
  }

  function serialize(): string[] {
    return Array.from(completedIds.value)
  }

  function deserialize(data: string[] | undefined): void {
    completedIds.value = new Set(Array.isArray(data) ? data : [])
  }

  return {
    stages,
    completeStage,
    isCompleted,
    isUnlocked,
    serialize,
    deserialize,
  }
})
