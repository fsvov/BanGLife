import type {GameLocation} from '@/core/types.ts'

export const livehouseCircleLocations: GameLocation[] = [
  {
    id: 'city.livehouse_circle',
    name: 'LiveHouse CiRCLE',
    description: '知名的 LiveHouse，经常举办各种演出。',
    tags: ['indoor', 'city', 'music', 'livehouse'],
    x: 2, y: -2,
    connections: [
      {to: 'city.residential_street', duration: 5, label: '去住宅街', icon: 'street.svg', tag: 'area'},
    ],
  },
]
