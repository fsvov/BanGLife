import type {Action, GameLocation, Passage} from '@/core/types.ts'
import {useUIStore} from '@/stores/ui.ts'
import {registries} from '@/core/registry'
import {applyEffects} from '@/core/effects'

export const homeLocations: GameLocation[] = [
  {
    id: 'home.bedroom',
    name: '卧室',
    description: '你的房间。书桌上放着乐谱，窗外是安静的住宅街。',
    tags: ['indoor', 'home', 'private'],
    x: -1, y: 0,
    connections: [
      {to: 'home.living', duration: 1, label: '去客厅', icon: 'sofa.svg', tag: 'place'},
    ],
  },
  {
    id: 'home.living',
    name: '客厅',
    description: '家里的公共区域。电视、沙发，简单而温馨。',
    tags: ['indoor', 'home'],
    x: 0, y: 0,
    connections: [
      {to: 'home.bedroom', duration: 1, label: '去卧室', icon: 'bed.svg', tag: 'place'},
      {to: 'home.bathroom', duration: 1, label: '去浴室', icon: 'bath.svg', tag: 'place'},
      {to: 'home.kitchen', duration: 1, label: '去厨房', icon: 'kitchen.svg', tag: 'place'},
      {to: 'city.residential_street', duration: 1, label: '出门', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'home.bathroom',
    name: '浴室',
    description: '家里的浴室。白色瓷砖墙面，洗发水和沐浴露整齐地摆在架子上。',
    tags: ['indoor', 'home'],
    x: 0, y: 1,
    connections: [
      {to: 'home.living', duration: 1, label: '去客厅', icon: 'sofa.svg', tag: 'place'},
    ],
  },
  {
    id: 'home.kitchen',
    name: '厨房',
    description: '整洁的厨房。水槽里没有堆积的碗筷，冰箱里常备着牛奶和鸡蛋。',
    tags: ['indoor', 'home'],
    x: 0, y: -1,
    connections: [
      {to: 'home.living', duration: 1, label: '去客厅', icon: 'sofa.svg', tag: 'place'},
    ],
  },
]

export const homeActions: Action[] = [
  {
    id: 'bedroom.climb_bed',
    label: '爬到床上',
    icon: 'bed.svg',
    duration: 1,
    tag: 'daily',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.hunger ?? 0) >= 90) return '无法睡觉：饥饿 ≥ 90'
      return ''
    },
    visible: () => true,
    available: (ctx) => (ctx.player.stats.hunger ?? 0) < 90,
    passage: 'bedroom.sleep',
  },
  {
    id: 'bathroom.shower',
    label: '洗澡',
    icon: 'bath.svg',
    duration: 30,
    tag: 'daily',
    locationId: 'home.bathroom',
    passage: 'bathroom.shower',
    effects: [
      {type: 'stat', key: 'stress', value: -20},
    ],
  },
  {
    id: 'bathroom.brush_teeth',
    label: '刷牙',
    icon: 'tooth.svg',
    duration: 5,
    tag: 'daily',
    locationId: 'home.bathroom',
    passage: 'bathroom.brush_teeth',
    effects: [
      {type: 'stat', key: 'stress', value: -5},
    ],
  },
  {
    id: 'bedroom.wardrobe',
    label: '打开衣柜',
    icon: 'wardrobe.svg',
    duration: 1,
    tag: 'daily',
    locationId: 'home.bedroom',
    execute() {
      useUIStore().openWardrobe()
    },
  },
  {
    id: 'bedroom.practice_singing',
    label: '练习演唱',
    icon: 'staff.svg',
    duration: 120,
    tag: 'practice',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.fatigue ?? 0) >= 50) return '无法练习：疲劳 ≥ 50'
      return ''
    },
    visible: () => true,
    available: (ctx) => (ctx.player.stats.fatigue ?? 0) < 50,
    passage: 'bedroom.practice_singing',
    effects: [
      {type: 'stat', key: 'vocal', value: 5},
      {type: 'stat', key: 'fatigue', value: 20},
      {type: 'stat', key: 'stress', value: 10},
    ],
  },
  {
    id: 'bedroom.practice_guitar',
    label: '练习吉他',
    icon: 'staff.svg',
    duration: 120,
    tag: 'practice',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.fatigue ?? 0) >= 50) return '无法练习：疲劳 ≥ 50'
      return ''
    },
    visible: (ctx) => ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('guitar') ?? false),
    available: (ctx) => (ctx.player.stats.fatigue ?? 0) < 50 && ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('guitar') ?? false),
    passage: 'bedroom.practice_guitar',
    execute: (ctx) => {
      const levels = [
        {id: 'instrument.guitar.bgl_master_ex', value: 10},
        {id: 'instrument.guitar.bgl_performer_x', value: 7},
        {id: 'instrument.guitar.bgl_rock_v', value: 5},
        {id: 'instrument.guitar.bgl_stage_20', value: 3},
        {id: 'instrument.guitar.bgl_starter_10', value: 2},
        {id: 'instrument.guitar.st_100', value: 1},
      ]
      for (const level of levels) {
        if (ctx.player.inventory.some(i => i.itemId === level.id)) {
          applyEffects([
            {type: 'stat', key: 'guitar', value: level.value},
            {type: 'stat', key: 'fatigue', value: 20},
            {type: 'stat', key: 'stress', value: 10},
          ])
          return
        }
      }
    },
  },
  {
    id: 'bedroom.practice_keyboard',
    label: '练习键盘',
    icon: 'staff.svg',
    duration: 120,
    tag: 'practice',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.fatigue ?? 0) >= 50) return '无法练习：疲劳 ≥ 50'
      return ''
    },
    visible: (ctx) => ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('keyboard') ?? false),
    available: (ctx) => (ctx.player.stats.fatigue ?? 0) < 50 && ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('keyboard') ?? false),
    passage: 'bedroom.practice_keyboard',
    execute: (ctx) => {
      const levels = [
        {id: 'instrument.keyboard.bgl_ultimate_880', value: 10},
        {id: 'instrument.keyboard.bgl_apex_760', value: 7},
        {id: 'instrument.keyboard.bgl_vanguard_490', value: 5},
        {id: 'instrument.keyboard.bgl_fusion_610', value: 3},
        {id: 'instrument.keyboard.bgl_neo_610', value: 2},
        {id: 'instrument.keyboard.p_61', value: 1},
      ]
      for (const level of levels) {
        if (ctx.player.inventory.some(i => i.itemId === level.id)) {
          applyEffects([
            {type: 'stat', key: 'keyboard', value: level.value},
            {type: 'stat', key: 'fatigue', value: 20},
            {type: 'stat', key: 'stress', value: 10},
          ])
          return
        }
      }
    },
  },
  {
    id: 'bedroom.practice_bass',
    label: '练习贝斯',
    icon: 'staff.svg',
    duration: 120,
    tag: 'practice',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.fatigue ?? 0) >= 50) return '无法练习：疲劳 ≥ 50'
      return ''
    },
    visible: (ctx) => ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('bass') ?? false),
    available: (ctx) => (ctx.player.stats.fatigue ?? 0) < 50 && ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('bass') ?? false),
    passage: 'bedroom.practice_bass',
    execute: (ctx) => {
      const levels = [
        {id: 'instrument.bass.bgl_maestro_b5', value: 10},
        {id: 'instrument.bass.bgl_virtuoso_b4', value: 7},
        {id: 'instrument.bass.bgl_groove_b4', value: 5},
        {id: 'instrument.bass.bgl_core_b4', value: 3},
        {id: 'instrument.bass.bgl_base_b4', value: 2},
        {id: 'instrument.bass.pb_100', value: 1},
      ]
      for (const level of levels) {
        if (ctx.player.inventory.some(i => i.itemId === level.id)) {
          applyEffects([
            {type: 'stat', key: 'bass', value: level.value},
            {type: 'stat', key: 'fatigue', value: 20},
            {type: 'stat', key: 'stress', value: 10},
          ])
          return
        }
      }
    },
  },
  {
    id: 'bedroom.practice_drum',
    label: '练习鼓',
    icon: 'staff.svg',
    duration: 120,
    tag: 'practice',
    locationId: 'home.bedroom',
    description: (ctx) => {
      if ((ctx.player.stats.fatigue ?? 0) >= 50) return '无法练习：疲劳 ≥ 50'
      return ''
    },
    visible: (ctx) => ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('drum') ?? false),
    available: (ctx) => (ctx.player.stats.fatigue ?? 0) < 50 && ctx.player.inventory.some(i => registries.items.get(i.itemId)?.tags?.includes('drum') ?? false),
    passage: 'bedroom.practice_drum',
    execute: (ctx) => {
      const levels = [
        {id: 'instrument.drum.bgl_summit_d5', value: 10},
        {id: 'instrument.drum.bgl_elite_d5', value: 7},
        {id: 'instrument.drum.bgl_advanced_d5', value: 5},
        {id: 'instrument.drum.bgl_standard_d5', value: 3},
        {id: 'instrument.drum.bgl_entry_d5', value: 2},
        {id: 'instrument.drum.e_65', value: 1},
      ]
      for (const level of levels) {
        if (ctx.player.inventory.some(i => i.itemId === level.id)) {
          applyEffects([
            {type: 'stat', key: 'drum', value: level.value},
            {type: 'stat', key: 'fatigue', value: 20},
            {type: 'stat', key: 'stress', value: 10},
          ])
          return
        }
      }
    },
  },
]

export const homePassages: Passage[] = [
  {
    id: 'bedroom.sleep',
    text: '你躺在柔软的床上，感到一阵困意袭来...',
    choices: [
      {label: '睡 8 小时', effects: [{type: 'time', value: 480}, {type: 'stat', key: 'fatigue', value: -50}]},
      {label: '睡 7 小时', effects: [{type: 'time', value: 420}, {type: 'stat', key: 'fatigue', value: -40}]},
      {label: '睡 6 小时', effects: [{type: 'time', value: 360}, {type: 'stat', key: 'fatigue', value: -30}]},
      {label: '睡 5 小时', effects: [{type: 'time', value: 300}, {type: 'stat', key: 'fatigue', value: -25}]},
      {label: '睡 4 小时', effects: [{type: 'time', value: 240}, {type: 'stat', key: 'fatigue', value: -20}]},
      {label: '睡 3 小时', effects: [{type: 'time', value: 180}, {type: 'stat', key: 'fatigue', value: -15}]},
      {label: '睡 2 小时', effects: [{type: 'time', value: 120}, {type: 'stat', key: 'fatigue', value: -10}]},
      {label: '睡 1 小时', effects: [{type: 'time', value: 60}, {type: 'stat', key: 'fatigue', value: -5}]},
      {label: '爬下床', effects: []},
    ],
  },
  {
    id: 'bathroom.shower',
    text: '温热的水流冲刷着身体，一天的疲惫仿佛都被冲走了。洗完澡后，整个人都轻松了许多。压力 -20。',
  },
  {
    id: 'bathroom.brush_teeth',
    text: '你认真地刷着牙，每一颗牙齿都变得干干净净。压力 -5。',
  },
  {
    id: 'bedroom.practice_singing',
    text: '你练习了演唱。演唱技能提升，疲劳 +20，压力 +10。',
  },
  {
    id: 'bedroom.practice_guitar',
    text: '你练习了吉他。吉他技能提升，疲劳 +20，压力 +10。',
  },
  {
    id: 'bedroom.practice_keyboard',
    text: '你练习了键盘。键盘技能提升，疲劳 +20，压力 +10。',
  },
  {
    id: 'bedroom.practice_bass',
    text: '你练习了贝斯。贝斯技能提升，疲劳 +20，压力 +10。',
  },
  {
    id: 'bedroom.practice_drum',
    text: '你练习了鼓。鼓技能提升，疲劳 +20，压力 +10。',
  },
]
