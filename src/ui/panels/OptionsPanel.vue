<script lang="ts" setup>
import {ref} from 'vue'
import ModPanel from '@/ui/panels/ModPanel.vue'
import {useSettingsStore} from '@/stores/settings'

const activeTab = ref<'general' | 'mods'>('general')
const settings = useSettingsStore()
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex border-b border-neutral-200 shrink-0">
      <button
        :class="activeTab === 'general'
          ? 'border-b-2 border-brand-pink text-brand-pink'
          : 'text-muted hover:text-neutral-700'"
        class="flex-1 text-xs py-2 transition-colors"
        @click="activeTab = 'general'"
      >
        通用
      </button>
      <button
        :class="activeTab === 'mods'
          ? 'border-b-2 border-brand-pink text-brand-pink'
          : 'text-muted hover:text-neutral-700'"
        class="flex-1 text-xs py-2 transition-colors"
        @click="activeTab = 'mods'"
      >
        Mod 管理
      </button>
    </div>

    <div class="flex-1 overflow-hidden">
      <div v-if="activeTab === 'general'" class="p-4 flex flex-col gap-4">
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-xs">自动存档</span>
          <input
            v-model="settings.settings.autoSave"
            class="w-4 h-4"
            type="checkbox"
          />
        </label>
      </div>
      <ModPanel v-else/>
    </div>
  </div>
</template>
