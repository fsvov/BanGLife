import type {Action, GameLocation, Passage} from '@/core/types.ts'
import {useUIStore} from '@/stores/ui.ts'

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
]
