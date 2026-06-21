import type {GameLocation} from '@/core/types.ts'

export const shoppingCenterLocations: GameLocation[] = [
  {
    id: 'city.shopping_center',
    name: '购物中心',
    description: '大型购物中心，各种商店应有尽有。',
    tags: ['indoor', 'city', 'shop'],
    x: 7, y: -1,
    connections: [
      {to: 'city.station_front', duration: 5, label: '去车站前', icon: 'fountain.svg', tag: 'area'},
    ],
  },
]
