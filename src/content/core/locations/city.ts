import type {GameLocation} from '@/core/types.ts'

export const cityLocations: GameLocation[] = [
  {
    id: 'city.residential_street',
    name: '住宅街',
    description: '安静的住宅区街道。两侧是整齐的楼房，偶尔有一两只猫走过。',
    tags: ['outdoor', 'city', 'residential'],
    x: 1, y: 0,
    connections: [
      {to: 'home.living', duration: 1, label: '回家', icon: 'home.svg', tag: 'place'},
      {to: 'city.livehouse_circle', duration: 5, label: '去 LiveHouse CiRCLE', icon: 'microphone.svg', tag: 'place'},
      {to: 'city.edogawa_instrument', duration: 5, label: '去江户川乐器店', icon: 'shop.svg', tag: 'place'},
      {to: 'city.school_street', duration: 5, label: '去学园街', icon: 'street.svg', tag: 'area'},
      {to: 'city.shopping_street', duration: 5, label: '去商店街', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.school_street',
    name: '学园街',
    description: '连接着几所女子学园的街道，道路两旁种着行道树。',
    tags: ['outdoor', 'city', 'school'],
    x: 3, y: 0,
    connections: [
      {to: 'school.hanasakigawa', duration: 5, label: '去花咲川女子学园', icon: 'school.svg', tag: 'place'},
      {to: 'school.haneoka', duration: 5, label: '去羽丘女子学园', icon: 'school.svg', tag: 'place'},
      {to: 'school.tsukinomori', duration: 5, label: '去月之森女子学园', icon: 'school.svg', tag: 'place'},
      {to: 'city.residential_street', duration: 5, label: '去住宅街', icon: 'street.svg', tag: 'area'},
      {to: 'city.walking_bridge', duration: 5, label: '去步道桥', icon: 'bridge.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.walking_bridge',
    name: '步道桥',
    description: '连接学园街和车站前的天桥，桥下是熙熙攘攘的街道。',
    tags: ['outdoor', 'city'],
    x: 5, y: 0,
    connections: [
      {to: 'city.school_street', duration: 5, label: '去学园街', icon: 'street.svg', tag: 'area'},
      {to: 'city.station_front', duration: 5, label: '去车站前', icon: 'fountain.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.station_front',
    name: '车站前',
    description: '繁忙的车站前广场，人来人往。',
    tags: ['outdoor', 'city'],
    x: 7, y: 0,
    connections: [
      {to: 'city.fast_food', duration: 5, label: '去快餐店', icon: 'burger.svg', tag: 'place'},
      {to: 'city.shopping_center', duration: 5, label: '去购物中心', icon: 'shop.svg', tag: 'place'},
      {to: 'city.livehouse_ring', duration: 5, label: '去 LiveHouse RiNG', icon: 'microphone.svg', tag: 'place'},
      {to: 'city.walking_bridge', duration: 5, label: '去步道桥', icon: 'bridge.svg', tag: 'area'},
      {to: 'city.university_road', duration: 5, label: '去大学路', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.university_road',
    name: '大学路',
    description: '连接两所大学的街道，路旁散落着咖啡馆和书店。',
    tags: ['outdoor', 'city'],
    x: 7, y: 3,
    connections: [
      {to: 'city.station_front', duration: 5, label: '去车站前', icon: 'fountain.svg', tag: 'area'},
    ],
  },
  {
    id: 'city.shopping_street',
    name: '商店街',
    description: '传统的日式商店街，有很多特色小店。',
    tags: ['outdoor', 'city', 'shop'],
    x: 1, y: -2,
    connections: [
      {to: 'city.yamabuki_bakery', duration: 1, label: '去山吹面包房', icon: 'bread.svg', tag: 'place'},
      {to: 'city.hanasawa_cafe', duration: 1, label: '去羽泽咖啡店', icon: 'coffee.svg', tag: 'place'},
      {to: 'city.residential_street', duration: 5, label: '去住宅街', icon: 'street.svg', tag: 'area'},
    ],
  },
]
