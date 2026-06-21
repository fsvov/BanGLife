import type {Action, GameLocation, Item, Passage, Shop, Task} from '@/core/types.ts'
import {MINUTES_PER_WEEK} from '@/core/constants.ts'

export const livehouseRingLocations: GameLocation[] = [
  {
    id: 'city.livehouse_ring',
    name: 'LiveHouse RiNG',
    description: '备受瞩目的新锐 LiveHouse，集演出厅、录音室与咖啡馆于一体。',
    tags: ['indoor', 'city', 'music', 'livehouse'],
    x: 8, y: -1,
    connections: [
      {to: 'city.ring_cafe', duration: 1, label: '去 RiNG 咖啡厅', icon: 'coffee.svg', tag: 'place'},
      {to: 'city.station_front', duration: 5, label: '去车站前', icon: 'fountain.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.ring_cafe',
    name: 'RiNG 咖啡厅',
    description: 'LiveHouse RiNG 内的咖啡厅。环境宽敞明亮，桌椅错落有致。',
    tags: ['indoor', 'city', 'shop', 'drink', 'food'],
    x: 8, y: -2,
    connections: [
      {to: 'city.livehouse_ring', duration: 1, label: '去 LiveHouse RiNG', icon: 'microphone.svg', tag: 'place'},
    ],
  },
]

export const livehouseRingActions: Action[] = [
  {
    id: 'livehouse_ring.work',
    label: '开始打工',
    icon: 'job.svg',
    locationId: ['city.livehouse_ring', 'city.ring_cafe'],
    duration: 120,
    tag: 'job',
    visible: (ctx) =>
      Boolean(ctx.player.flags['job.livehouse_ring.active']),
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
      if (!Boolean(ctx.player.flags['job.livehouse_ring.active']) || Number(ctx.player.flags['job.livehouse_ring.hours'] ?? 0) >= 10) return false
      const stats = ctx.player.stats
      return (stats.fatigue ?? 0) < 50 && (stats.stress ?? 0) < 50 && (stats.hunger ?? 0) < 50
    },
    effects: [
      {type: 'stat', key: 'fatigue', value: 20},
      {type: 'stat', key: 'stress', value: 10},
    ],
    execute: (ctx) => {
      ctx.player.flags['job.livehouse_ring.hours'] = Number(ctx.player.flags['job.livehouse_ring.hours'] ?? 0) + 2
    },
    passage: 'livehouse_ring.work',
  },
]

export const livehouseRingPassages: Passage[] = [
  {
    id: 'livehouse_ring.work',
    text: '你在 RiNG 忙碌了 2 小时，完成了今天的工作。疲劳 +20，压力 +10。',
  },
]

export const livehouseRingItems: Item[] = [
  {
    id: 'drink.ring_cafe.espresso',
    name: '浓缩咖啡',
    description: '单份浓缩咖啡。咖啡系列的基础款，选用中深烘焙的拼配咖啡豆进行精细萃取，出品稳定，口感扎实浓烈。饮用后：疲劳 -15，压力 -5。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -15}, {type: 'stat', key: 'stress', value: -5}],
  },
  {
    id: 'drink.ring_cafe.americano',
    name: '美式咖啡',
    description: '大杯美式咖啡，通过向浓缩基底注入热水释放出柔和的谷物系香气，性价比高且适合长时间排练时饮用。饮用后：疲劳 -18，压力 -8。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -18}, {type: 'stat', key: 'stress', value: -8}],
  },
  {
    id: 'drink.ring_cafe.latte',
    name: '拿铁',
    description: '经典鲜奶拿铁。演出人员常点的经典款，在浓缩咖啡中融入大量蒸汽牛奶与薄层奶泡，奶香醇厚，入喉温润顺滑。饮用后：疲劳 -20，压力 -10。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -20}, {type: 'stat', key: 'stress', value: -10}],
  },
  {
    id: 'drink.ring_cafe.earl_grey',
    name: '热伯爵红茶',
    description: '经典伯爵红茶。以红茶为基底调入天然佛手柑精油，茶汤澄红透亮，香气清雅悠长，入口温润。饮用后：疲劳 -10，压力 -6。',
    tags: ['drink', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'fatigue', value: -10}, {type: 'stat', key: 'stress', value: -6}],
  },
  {
    id: 'food.ring_cafe.matcha_parfait',
    name: '抹茶芭菲',
    description: '店内人气甜品。层层铺叠抹茶冰淇淋、白玉、红豆与鲜奶油，顶部以抹茶粉点缀，整体口感绵密清雅，甜而不腻。食用后：饥饿 -25，压力 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -25}, {type: 'stat', key: 'stress', value: -15}],
  },
  {
    id: 'food.ring_cafe.strawberry_parfait',
    name: '草莓芭菲',
    description: '店内人气甜品。以新鲜草莓搭配香草冰淇淋与轻盈鲜奶油，酸甜交织，外观亮丽。食用后：饥饿 -25，压力 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -25}, {type: 'stat', key: 'stress', value: -15}],
  },
  {
    id: 'food.ring_cafe.chicken_sandwich',
    name: '鸡肉三明治',
    description: '全麦吐司夹入照烧鸡胸肉、生菜与少量蛋黄酱，分量充足且营养均衡，适合演出前后快速补充体力。食用后：饥饿 -35，疲劳 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -35}, {type: 'stat', key: 'fatigue', value: -15}],
  },
  {
    id: 'food.ring_cafe.veggie_sandwich',
    name: '蔬菜三明治',
    description: '全麦吐司夹入新鲜番茄、生菜、黄瓜与低脂酸奶酱，口感清爽。食用后：饥饿 -30，疲劳 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -30}, {type: 'stat', key: 'fatigue', value: -10}],
  },
  {
    id: 'food.ring_cafe.salad',
    name: '沙拉',
    description: '以混合嫩叶生菜为基底，搭配小番茄、紫甘蓝丝与烤面包丁，附赠自制油醋汁。食用后：饥饿 -5，压力 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -5}, {type: 'stat', key: 'stress', value: -10}],
  },
]

export const livehouseRingShops: Shop[] = [
  {
    id: 'shop.ring_cafe',
    name: 'RiNG 咖啡厅',
    icon: 'coffee.svg',
    locationId: 'city.ring_cafe',
    items: [
      {itemId: 'drink.ring_cafe.espresso', buyPrice: 420},
      {itemId: 'drink.ring_cafe.americano', buyPrice: 480},
      {itemId: 'drink.ring_cafe.latte', buyPrice: 550},
      {itemId: 'drink.ring_cafe.earl_grey', buyPrice: 500},
      {itemId: 'food.ring_cafe.matcha_parfait', buyPrice: 1080},
      {itemId: 'food.ring_cafe.strawberry_parfait', buyPrice: 1290},
      {itemId: 'food.ring_cafe.chicken_sandwich', buyPrice: 780},
      {itemId: 'food.ring_cafe.veggie_sandwich', buyPrice: 780},
      {itemId: 'food.ring_cafe.salad', buyPrice: 650},
    ],
  },
]

export const livehouseRingTasks: Task[] = [
  {
    id: 'job.livehouse_ring',
    title: 'RiNG 打工',
    description: '在 LiveHouse RiNG 完成至少 10 小时的工作。\n' +
      '打工要求：疲劳 < 50、压力 < 50、饥饿 < 50。\n' +
      '时薪 1400 円，周结发放。\n' +
      '若累计打工时长未满 10 小时，则在已有薪水基础上扣除 3000 円调整费。',
    targets: [
      {
        title: '打工时长',
        description: '累计打工 10 小时',
        onProgress: (ctx) => Number(ctx.player.flags['job.livehouse_ring.hours'] ?? 0) / 10,
        onCheck: (ctx) => Number(ctx.player.flags['job.livehouse_ring.hours'] ?? 0) >= 10,
      },
      {
        title: '工资周结',
        description: '薪水将在任务过期时发放',
        onCheck: () => false,
      },
    ],
    expire: MINUTES_PER_WEEK,
    onCancel: (ctx) => {
      const hours = Number(ctx.player.flags['job.livehouse_ring.hours'] ?? 0)
      ctx.player.money = (ctx.player.money ?? 0) + hours * 1400 - (hours < 10 ? 3000 : 0)
      ctx.player.flags['job.livehouse_ring.active'] = false
      ctx.player.flags['job.livehouse_ring.hours'] = 0
    },
  },
]
