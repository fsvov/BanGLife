import type {GameLocation, Item, Shop} from '@/core/types.ts'

export const fastFoodLocations: GameLocation[] = [
  {
    id: 'city.fast_food',
    name: '快餐店',
    description: '提供各种套餐的快餐店，价格实惠。',
    tags: ['indoor', 'city', 'shop', 'food'],
    x: 6, y: -1,
    connections: [
      {to: 'city.station_front', duration: 5, label: '去车站前', icon: 'fountain.svg', tag: 'area'},
    ],
  },
]

export const fastFoodItems: Item[] = [
  {
    id: 'food.fast_food.gyudon',
    name: '经典牛丼饭',
    description: '薄切肥牛与洋葱在微甜的酱汁中煮至入味，铺在热腾腾的米饭上，是简单而饱腹的经典选择。食用后：饥饿 -35，疲劳 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -35}, {type: 'stat', key: 'fatigue', value: -10}],
  },
  {
    id: 'food.fast_food.fries',
    name: '薯条',
    description: '金黄酥脆的炸薯条，外酥内软，附赠番茄酱包，适合作为快捷的轻食补给。食用后：饥饿 -20，压力 -8。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -20}, {type: 'stat', key: 'stress', value: -8}],
  },
  {
    id: 'food.fast_food.curry_rice',
    name: '咖喱饭',
    description: '以多种香辛料熬煮的日式咖喱，搭配土豆、胡萝卜与肉类，酱汁浓郁，配白米饭食用。食用后：饥饿 -40，疲劳 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -40}, {type: 'stat', key: 'fatigue', value: -15}],
  },
  {
    id: 'food.fast_food.tonkotsu_ramen',
    name: '豚骨拉面',
    description: '长时间熬煮的猪骨汤底浓郁顺滑，配以叉烧、溏心蛋与木耳丝，面条筋道，汤味醇厚。食用后：饥饿 -45，疲劳 -15，压力 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -45}, {type: 'stat', key: 'fatigue', value: -15}, {
      type: 'stat',
      key: 'stress',
      value: -10
    }],
  },
  {
    id: 'food.fast_food.breakfast_set',
    name: '早餐定食',
    description: '日式早餐套餐，包含烤鱼、玉子烧、味噌汤、渍物与米饭，搭配齐全，无需单点拼凑。食用后：饥饿 -30，疲劳 -15。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -30}, {type: 'stat', key: 'fatigue', value: -15}],
  },
  {
    id: 'food.fast_food.roast_beef_set',
    name: '烤牛肉定食',
    description: '日式定食套餐，薄切烤牛肉搭配新鲜蔬菜，附有味噌汤、渍物与米饭，分量扎实。食用后：饥饿 -45，疲劳 -20。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -45}, {type: 'stat', key: 'fatigue', value: -20}],
  },
  {
    id: 'food.fast_food.burger_set',
    name: '汉堡套餐',
    description: '牛肉汉堡排配以松软面包与新鲜蔬菜，附赠薯条与自选饮料，是满足感十足的餐点组合。食用后：饥饿 -50，疲劳 -15，压力 -10。',
    tags: ['food', 'consumable'],
    stackable: true, usable: true, droppable: true, consumable: true,
    useEffects: [{type: 'stat', key: 'hunger', value: -50}, {type: 'stat', key: 'fatigue', value: -15}, {
      type: 'stat',
      key: 'stress',
      value: -10
    }],
  },
]

export const fastFoodShops: Shop[] = [
  {
    id: 'shop.fast_food',
    name: '快餐店',
    icon: 'burger.svg',
    locationId: 'city.fast_food',
    items: [
      {itemId: 'food.fast_food.gyudon', buyPrice: 400},
      {itemId: 'food.fast_food.fries', buyPrice: 300},
      {itemId: 'food.fast_food.curry_rice', buyPrice: 540},
      {itemId: 'food.fast_food.tonkotsu_ramen', buyPrice: 560},
      {itemId: 'food.fast_food.breakfast_set', buyPrice: 360},
      {itemId: 'food.fast_food.roast_beef_set', buyPrice: 600},
      {itemId: 'food.fast_food.burger_set', buyPrice: 650},
    ],
  },
]
