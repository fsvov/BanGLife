import type {
  Action,
  Connection,
  GameEvent,
  GameLocation,
  GameTime,
  Item,
  NPC,
  NPCSchedule,
  Passage,
  PerformanceStrategy,
  Period,
  Shop,
  ShopItem,
  Stage,
  StatDef,
  StrategyContext,
  StrategyResult,
  Target,
  Task,
} from '@banglife/mod-types'

export type {
  GameTime,
  Period,
  GameLocation,
  Connection,
  Action,
  GameEvent,
  Item,
  Shop,
  ShopItem,
  StatDef,
  NPC,
  NPCSchedule,
  Passage,
  Target,
  Task,
  PerformanceStrategy,
  StrategyContext,
  StrategyResult,
  Stage,
}
export type {
  PlayerState, InventoryItem, Relationship, GameContext, AppearanceState, PartSelection, Band
} from '@banglife/mod-types'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface TimeInfo {
  absolute: GameTime
  day: number
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6
  hour: number
  minute: number
  period: Period
  season: Season
}

export type TriggerSignal =
  | { type: 'location:enter'; locationId: string }
  | { type: 'location:leave'; locationId: string }
  | { type: 'time:tick'; minutes: number }
  | { type: 'day:start' }
  | { type: 'day:end' }
  | { type: 'action:before'; actionId: string }
  | { type: 'action:after'; actionId: string }
  | { type: 'flag:change'; key: string }
  | { type: 'stat:change'; statId: string }
  | { type: 'manual'; eventId: string }
