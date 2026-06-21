import {defineStore} from 'pinia'
import {ref, watch} from 'vue'

const STORAGE_KEY = 'banglife:settings'

interface Settings {
  autoSave: boolean
}

const defaultSettings: Settings = {
  autoSave: true,
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {...defaultSettings}
    return {...defaultSettings, ...JSON.parse(raw)}
  } catch {
    return {...defaultSettings}
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>(loadSettings())

  watch(settings, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, {deep: true})

  return {
    settings,
  }
})
