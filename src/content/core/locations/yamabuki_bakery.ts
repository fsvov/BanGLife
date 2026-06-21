import type {Action, GameLocation, Item, Passage, Shop} from '@/core/types.ts'

export const yamabukiBakeryLocations: GameLocation[] = [
  {
    id: 'city.yamabuki_bakery',
    name: '山吹面包房',
    description: '商店街内的面包房。玻璃柜台内陈列着各式各样的面包，空气中弥漫着黄油与焦糖混合的甜香。',
    tags: ['indoor', 'city', 'shop', 'food'],
    x: 0, y: -3,
    connections: [
      {to: 'city.shopping_street', duration: 1, label: '去商店街', icon: 'street.svg', tag: 'area'},
    ],
  },
]

export const yamabukiBakeryActions: Action[] = [
  {
    id: 'yamabuki_bakery.work',
    label: '开始打工',
    icon: 'job.svg',
    locationId: 'city.yamabuki_bakery',
    duration: 60,
    tag: 'job',
    visible: (ctx) => Boolean(ctx.player.flags['job.yamabuki_bakery.active']),
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
      if (!Boolean(ctx.player.flags['job.yamabuki_bakery.active'])) return false
      const stats = ctx.player.stats
      return (stats.fatigue ?? 0) < 50 && (stats.stress ?? 0) < 50 && (stats.hunger ?? 0) < 50
    },
    effects: [
      {type: 'stat', key: 'fatigue', value: 10},
      {type: 'stat', key: 'stress', value: 5},
      {type: 'money', value: 1200},
    ],
    passage: 'yamabuki_bakery.work',
  },
]

export const yamabukiBakeryPassages: Passage[] = [
  {
    id: 'yamabuki_bakery.work',
    text: '你在山吹面包房忙碌了 1 小时，完成了今天的工作。疲劳 +10，压力 +5，获得 1200 円。',
  },
]

export const yamabukiBakeryItems: Item[] = [
  {
    id: 'food.yamabuki_bakery.chocolate_croissant',
    name: '巧克力牛角包',
    description: '人气产品。层层酥皮包裹巧克力内馅，加热后呈现半流心质地，甜度适中。食用后：饥饿 -30，压力 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -30}, {type: 'stat', key: 'stress', value: -10}],
  },
  {
    id: 'food.yamabuki_bakery.cream_roll',
    name: '奶油蛋卷',
    description: '质地松软，内馅为卡仕达奶油，表面撒有薄层糖粉。食用后：饥饿 -25，压力 -8。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -25}, {type: 'stat', key: 'stress', value: -8}],
  },
  {
    id: 'food.yamabuki_bakery.croquette_bread',
    name: '可乐饼面包',
    description: '炸制可乐饼夹入软面包中，淋有中浓酱汁，外层面包松软，内里酥脆。食用后：饥饿 -35，疲劳 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -35}, {type: 'stat', key: 'fatigue', value: -15}],
  },
  {
    id: 'food.yamabuki_bakery.sliced_bread',
    name: '切片面包',
    description: '一袋六片装方形吐司，质地柔软，适合日常备餐。食用后：饥饿 -20，疲劳 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -20}, {type: 'stat', key: 'fatigue', value: -10}],
  },
]

export const yamabukiBakeryShops: Shop[] = [
  {
    id: 'shop.yamabuki_bakery',
    name: '山吹面包房',
    icon: 'bread.svg',
    locationId: 'city.yamabuki_bakery',
    items: [
      {itemId: 'food.yamabuki_bakery.chocolate_croissant', buyPrice: 380},
      {itemId: 'food.yamabuki_bakery.cream_roll', buyPrice: 320},
      {itemId: 'food.yamabuki_bakery.croquette_bread', buyPrice: 350},
      {itemId: 'food.yamabuki_bakery.sliced_bread', buyPrice: 280},
    ],
  },
]
