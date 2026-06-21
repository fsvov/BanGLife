import type {Action, GameLocation, Item, Passage, Shop, Task} from '@/core/types.ts'
import {MINUTES_PER_WEEK} from '@/core/constants.ts'

export const hanasawaCafeLocations: GameLocation[] = [
  {
    id: 'city.hanasawa_cafe',
    name: '羽泽咖啡店',
    description: '商店街内的咖啡店。店内环境安静舒适，充盈着现磨咖啡的醇厚香气。',
    tags: ['indoor', 'city', 'shop', 'drink'],
    x: 1, y: -3,
    connections: [
      {to: 'city.shopping_street', duration: 1, label: '去商店街', icon: 'street.svg', tag: 'area'},
    ],
  },
]

export const hanasawaCafeActions: Action[] = [
  {
    id: 'hanasawa_cafe.work',
    label: '开始打工',
    icon: 'job.svg',
    locationId: 'city.hanasawa_cafe',
    duration: 120,
    tag: 'job',
    visible: (ctx) =>
      Boolean(ctx.player.flags['job.hanasawa_cafe.active']),
    description: (ctx) => {
      const stats = ctx.player.stats
      const reasons: string[] = []
      if ((stats.fatigue ?? 0) >= 50) reasons.push(`疲劳 ≥ 50`)
      if ((stats.stress ?? 0) >= 50) reasons.push(`压力 ≥ 50`)
      if ((stats.hunger ?? 0) >= 50) reasons.push(`饥饿 ≥ 50`)
      if (reasons.length > 0) return `无法打工：${reasons.join('、')}`
      return ''
    },
    available: (ctx) => {
      if (!Boolean(ctx.player.flags['job.hanasawa_cafe.active']) || Number(ctx.player.flags['job.hanasawa_cafe.hours'] ?? 0) >= 10) return false
      const stats = ctx.player.stats
      return (stats.fatigue ?? 0) < 50 && (stats.stress ?? 0) < 50 && (stats.hunger ?? 0) < 50
    },
    effects: [
      {type: 'stat', key: 'fatigue', value: 20},
      {type: 'stat', key: 'stress', value: 10},
    ],
    execute: (ctx) => {
      ctx.player.flags['job.hanasawa_cafe.hours'] = Number(ctx.player.flags['job.hanasawa_cafe.hours'] ?? 0) + 2
    },
    passage: 'hanasawa_cafe.work',
  },
]

export const hanasawaCafePassages: Passage[] = [
  {
    id: 'hanasawa_cafe.work',
    text: '你在羽泽咖啡店忙碌了 2 小时，完成了今天的工作。疲劳 +20，压力 +10。',
  },
]

export const hanasawaCafeItems: Item[] = [
  {
    id: 'drink.hanasawa_cafe.health_tea',
    name: '特制养生果茶',
    description: '以多种草本与鲜果低温慢煮调制的果茶，茶汤清透，入口柔润微甜，带有温和的草本回甘。饮用后：疲劳 -15，压力 -10。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -15}, {type: 'stat', key: 'stress', value: -10}],
  },
  {
    id: 'drink.hanasawa_cafe.americano',
    name: '经典美式咖啡',
    description: '选用深烘焙咖啡豆萃取的美式咖啡，口感醇厚顺滑，风味均衡，余韵悠长，传递着温暖的味道。饮用后：疲劳 -10，压力 -5。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -10}, {type: 'stat', key: 'stress', value: -5}],
  },
  {
    id: 'drink.hanasawa_cafe.latte',
    name: '拿铁',
    description: '新鲜浓缩咖啡与绵密奶泡的经典融合，奶香柔和，口感细腻，适合作为甜点的搭配饮品。饮用后：疲劳 -15，压力 -8。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -15}, {type: 'stat', key: 'stress', value: -8}],
  },
  {
    id: 'drink.hanasawa_cafe.hot_tea',
    name: '热红茶',
    description: '经典热红茶，附赠新鲜柠檬片，茶香浓郁明亮，入口温润，可依个人喜好添加柠檬饮用。饮用后：疲劳 -8，压力 -5。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -8}, {type: 'stat', key: 'stress', value: -5}],
  },
]

export const hanasawaCafeShops: Shop[] = [
  {
    id: 'shop.hanasawa_cafe',
    name: '羽泽咖啡店',
    icon: 'coffee.svg',
    locationId: 'city.hanasawa_cafe',
    items: [
      {itemId: 'drink.hanasawa_cafe.health_tea', buyPrice: 580},
      {itemId: 'drink.hanasawa_cafe.americano', buyPrice: 450},
      {itemId: 'drink.hanasawa_cafe.latte', buyPrice: 520},
      {itemId: 'drink.hanasawa_cafe.hot_tea', buyPrice: 420},
    ],
  },
]

export const hanasawaCafeTasks: Task[] = [
  {
    id: 'job.hanasawa_cafe',
    title: '羽泽咖啡店打工',
    description: '在羽泽咖啡店完成任意时长的工作。\n' +
      '打工要求：疲劳 < 50、压力 < 50、饥饿 < 50。\n' +
      '时薪 1300 円，周结发放。\n' +
      '若累计打工时长超过 10 小时，则在已有薪水基础上增加 3000 円奖金。',
    targets: [
      {
        title: '打工时长',
        description: '累计打工 10 小时',
        onProgress: (ctx) => Number(ctx.player.flags['job.hanasawa_cafe.hours'] ?? 0) / 10,
        onCheck: (ctx) => Number(ctx.player.flags['job.hanasawa_cafe.hours'] ?? 0) >= 10,
      },
      {
        title: '工资周结',
        description: '薪水将在任务过期时发放',
        onCheck: () => false,
      },
    ],
    expire: MINUTES_PER_WEEK,
    onCancel: (ctx) => {
      const hours = Number(ctx.player.flags['job.hanasawa_cafe.hours'] ?? 0)
      ctx.player.money = (ctx.player.money ?? 0) + hours * 1300 + (hours >= 10 ? 3000 : 0)
      ctx.player.flags['job.hanasawa_cafe.active'] = false
      ctx.player.flags['job.hanasawa_cafe.hours'] = 0
    },
  },
]
