import type {GameLocation, Item, Shop} from '@/core/types.ts'

export const edogawaInstrumentLocations: GameLocation[] = [
  {
    id: 'city.edogawa_instrument',
    name: '江户川乐器店',
    description: '品种齐全的乐器店，从配件到专业乐器一应俱全。',
    tags: ['indoor', 'city', 'shop', 'music'],
    x: 2, y: -1,
    connections: [
      {to: 'city.residential_street', duration: 5, label: '去住宅街', icon: 'street.svg', tag: 'area'},
    ],
  },
]

export const edogawaInstrumentItems: Item[] = [
  {
    id: 'instrument.guitar.st_100',
    name: 'ST-100',
    description: '进口仿制吉他。固定琴桥，单双拾音器，ST琴型。手感粗糙，琴颈边缘硌手，音准稳定性较差。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.guitar.bgl_starter_10',
    name: 'BGL Starter-10',
    description: 'BGL 的入门型吉他。固定琴桥，单单双拾音器，ST琴型。做工合格，手感适中，适合初学者日常练习。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.guitar.bgl_stage_20',
    name: 'BGL Stage-20',
    description: 'BGL 的基础型吉他。单摇琴桥，单单拾音器，TL琴型。在学生乐队中较为常见，性能均衡。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.guitar.bgl_rock_v',
    name: 'BGL Rock-V',
    description: 'BGL 的进阶型吉他。大双摇琴桥，双双可切单拾音器，V字琴型。舞台存在感强，适合视觉系演出。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.guitar.bgl_performer_x',
    name: 'BGL Performer-X',
    description: 'BGL 的专业型吉他。小双摇琴桥，单单单可切单单双拾音器，TL琴型。职业乐手常用的级别，二手流通价值较高。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.guitar.bgl_master_ex',
    name: 'BGL Master-EX',
    description: 'BGL 的旗舰型吉他。小双摇琴桥，双单双拾音器，LP琴型。做工精良，音色饱满，受到众多资深吉他手的认可。',
    tags: ['guitar', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.p_61',
    name: 'P-61',
    description: '进口仿制键盘。61键，无合成功能，塑料按键。手感生硬，键噪明显，动态响应较差。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.bgl_neo_610',
    name: 'BGL Neo-610',
    description: 'BGL 的入门型键盘。61键，基本音色，半配重按键。做工合格，键感适中，适合初学者日常练习。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.bgl_fusion_610',
    name: 'BGL Fusion-610',
    description: 'BGL 的基础型键盘。61键，合成音色，半配重按键。在学生乐队中较为常见，音色覆盖较为均衡。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.bgl_vanguard_490',
    name: 'BGL Vanguard-490',
    description: 'BGL 的进阶型键盘。49键，合成音色，半配重按键，配有琴头控制器。便携性强，适合移动演出和视觉系舞台。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.bgl_apex_760',
    name: 'BGL Apex-760',
    description: 'BGL 的专业型键盘。76键，编程音色，全配重按键。职业乐手常用的级别，音色编辑能力强，二手流通价值较高。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.keyboard.bgl_ultimate_880',
    name: 'BGL Ultimate-880',
    description: 'BGL 的旗舰型键盘。88键，编程音色，全配重按键。做工精良，手感细腻，动态表现优秀，受到众多资深键盘手的认可。',
    tags: ['keyboard', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.pb_100',
    name: 'PB-100',
    description: '进口仿制贝斯。4弦，P型贝斯。做工粗糙，手感生硬，品丝边缘刮手，音准稳定性较差。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.bgl_base_b4',
    name: 'BGL Base-B4',
    description: 'BGL 的入门型贝斯。4弦，JP型贝斯。做工合格，手感适中，适合初学者日常练习。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.bgl_core_b4',
    name: 'BGL Core-B4',
    description: 'BGL 的基础型贝斯。4弦，J型贝斯。音色清晰明亮，适合爵士及日摇风格。在学生乐队中较为常见，性能均衡。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.bgl_groove_b4',
    name: 'BGL Groove-B4',
    description: 'BGL 的进阶型贝斯。4弦，P型贝斯。音色沉稳，低频饱满，适合乐队合奏。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.bgl_virtuoso_b4',
    name: 'BGL Virtuoso-B4',
    description: 'BGL 的专业型贝斯。4弦，JP型贝斯。职业乐手常用的级别，二手流通价值较高。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.bass.bgl_maestro_b5',
    name: 'BGL Maestro-B5',
    description: 'BGL 的旗舰型贝斯。5弦，JP型贝斯。做工精良，音色饱满，动态表现优秀，受到众多资深贝斯手的认可。',
    tags: ['bass', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.e_65',
    name: 'E-65',
    description: '进口仿制电子鼓。65mm打击垫，基础音色，塑料支架。手感生硬，动态响应较差。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.bgl_entry_d5',
    name: 'BGL Entry-D5',
    description: 'BGL 的入门型鼓组。基础五鼓配置，做工合格，手感适中，适合初学者日常练习。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.bgl_standard_d5',
    name: 'BGL Standard-D5',
    description: 'BGL 的基础型鼓组。完整五鼓配置，音色均衡，在学生乐队中较为常见，性能稳定。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.bgl_advanced_d5',
    name: 'BGL Advanced-D5',
    description: 'BGL 的进阶型鼓组。完整鼓组加爵士鼓组，舞台存在感强，适合摇滚及视觉系演出。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.bgl_elite_d5',
    name: 'BGL Elite-D5',
    description: 'BGL 的专业型鼓组。完整鼓组加拓展鼓组，职业鼓手常用的级别，二手流通价值较高。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
  {
    id: 'instrument.drum.bgl_summit_d5',
    name: 'BGL Summit-D5',
    description: 'BGL 的旗舰型鼓组。完整鼓组加拓展鼓组，做工精良，音色饱满，动态表现优秀，受到众多资深鼓手的认可。',
    tags: ['drum', 'instrument'],
    stackable: false
  },
]

export const edogawaInstrumentShops: Shop[] = [
  {
    id: 'shop.edogawa_instrument',
    name: '江户川乐器店',
    icon: 'shop.svg',
    locationId: 'city.edogawa_instrument',
    items: [
      {itemId: 'instrument.guitar.st_100', buyPrice: 15000, sellPrice: 8000},
      {itemId: 'instrument.guitar.bgl_starter_10', buyPrice: 39888, sellPrice: 19888},
      {itemId: 'instrument.guitar.bgl_stage_20', buyPrice: 140000, sellPrice: 80000},
      {itemId: 'instrument.guitar.bgl_rock_v', buyPrice: 180000, sellPrice: 100000},
      {itemId: 'instrument.guitar.bgl_performer_x', buyPrice: 280000, sellPrice: 180000},
      {itemId: 'instrument.guitar.bgl_master_ex', buyPrice: 550000, sellPrice: 300000},
      {itemId: 'instrument.keyboard.p_61', buyPrice: 15000, sellPrice: 8000},
      {itemId: 'instrument.keyboard.bgl_neo_610', buyPrice: 57800, sellPrice: 28000},
      {itemId: 'instrument.keyboard.bgl_fusion_610', buyPrice: 89000, sellPrice: 45000},
      {itemId: 'instrument.keyboard.bgl_vanguard_490', buyPrice: 145000, sellPrice: 70000},
      {itemId: 'instrument.keyboard.bgl_apex_760', buyPrice: 273000, sellPrice: 130000},
      {itemId: 'instrument.keyboard.bgl_ultimate_880', buyPrice: 455000, sellPrice: 228000},
      {itemId: 'instrument.bass.pb_100', buyPrice: 15000, sellPrice: 8000},
      {itemId: 'instrument.bass.bgl_base_b4', buyPrice: 39888, sellPrice: 20000},
      {itemId: 'instrument.bass.bgl_core_b4', buyPrice: 140000, sellPrice: 70000},
      {itemId: 'instrument.bass.bgl_groove_b4', buyPrice: 165000, sellPrice: 83000},
      {itemId: 'instrument.bass.bgl_virtuoso_b4', buyPrice: 280000, sellPrice: 140000},
      {itemId: 'instrument.bass.bgl_maestro_b5', buyPrice: 550000, sellPrice: 275000},
      {itemId: 'instrument.drum.e_65', buyPrice: 67000, sellPrice: 35000},
      {itemId: 'instrument.drum.bgl_entry_d5', buyPrice: 76300, sellPrice: 38000},
      {itemId: 'instrument.drum.bgl_standard_d5', buyPrice: 140000, sellPrice: 80000},
      {itemId: 'instrument.drum.bgl_advanced_d5', buyPrice: 210700, sellPrice: 100000},
      {itemId: 'instrument.drum.bgl_elite_d5', buyPrice: 299000, sellPrice: 150000},
      {itemId: 'instrument.drum.bgl_summit_d5', buyPrice: 693000, sellPrice: 350000},
    ],
  },
]
