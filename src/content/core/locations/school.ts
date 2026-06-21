import type {Action, GameContext, GameLocation, Passage} from '@/core/types.ts'
import type {Effect} from '@banglife/mod-types'
import {applyEffects} from '@/core/effects.ts'

export const schoolLocations: GameLocation[] = [
  {
    id: 'school.hanasakigawa',
    name: '花咲川女子学园',
    description: '花咲川女子学园中庭。花坛里随季节更换着花卉，课间常有学生在此交谈。',
    tags: ['outdoor', 'school'],
    x: 2, y: 1,
    connections: [
      {to: 'city.school_street', duration: 5, label: '去学园街', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'school.haneoka',
    name: '羽丘女子学园',
    description: '羽丘女子学园中庭。设有长椅与饮水处，午休时常有学生在此休息。',
    tags: ['outdoor', 'school'],
    x: 3, y: 1,
    connections: [
      {to: 'school.haneoka.classroom', duration: 1, label: '去教室', icon: 'book.svg', tag: 'place'},
      {to: 'school.haneoka.rooftop', duration: 1, label: '去天台', icon: 'stairs.svg', tag: 'place'},
      {to: 'school.haneoka.track', duration: 1, label: '去田径场', icon: 'basketball.svg', tag: 'place'},
      {to: 'school.haneoka.wind_ensemble', duration: 1, label: '去管乐部活动室', icon: 'piano.svg', tag: 'place'},
      {to: 'school.haneoka.astronomy_club', duration: 1, label: '去天文部活动室', icon: 'telescope.svg', tag: 'place'},
      {to: 'city.school_street', duration: 5, label: '去学园街', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'school.tsukinomori',
    name: '月之森女子学园',
    description: '月之森女子学园中庭。庭内铺设着石板步道，中央的小型喷泉流淌着清脆水声，周围绿篱修剪得整整齐齐。',
    tags: ['outdoor', 'school'],
    x: 4, y: 1,
    connections: [
      {to: 'school.tsukinomori.classroom', duration: 1, label: '去教室', icon: 'book.svg', tag: 'place'},
      {to: 'school.tsukinomori.gym', duration: 1, label: '去体育馆', icon: 'basketball.svg', tag: 'place'},
      {to: 'school.tsukinomori.auditorium', duration: 1, label: '去礼堂', icon: 'theater.svg', tag: 'place'},
      {to: 'school.tsukinomori.garden', duration: 1, label: '去菜园', icon: 'plant.svg', tag: 'place'},
      {to: 'city.school_street', duration: 5, label: '去学园街', icon: 'street.svg', tag: 'area'},
    ],
  },
  {
    id: 'school.haneoka.classroom',
    name: '教室',
    description: '羽丘女子学园的教室。课桌椅按行列整齐地排开，黑板旁的值日表上写着今日的扫除安排。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.haneoka', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.haneoka.rooftop',
    name: '天台',
    description: '羽丘女子学园的天台。围栏围绕着的开阔平台，可以远眺学园周边的街景。',
    tags: ['outdoor', 'school'],
    connections: [
      {to: 'school.haneoka', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.haneoka.track',
    name: '田径场',
    description: '羽丘女子学园的运动场。平整的土质地面上用白线划出跑道，场地中央摆放着排球网。',
    tags: ['outdoor', 'school'],
    connections: [
      {to: 'school.haneoka', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.haneoka.wind_ensemble',
    name: '管乐部活动室',
    description: '羽丘女子学园的管乐部活动室。靠墙的乐器柜里整齐摆放着长笛与单簧管，房间中央有一架立式钢琴，谱架上散落着合奏谱。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.haneoka', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.haneoka.astronomy_club',
    name: '天文部活动室',
    description: '羽丘女子学园的天文部活动室。靠窗摆放着一台小型望远镜，墙上贴满了海报，角落的书架上堆叠着天文学杂志。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.haneoka', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.tsukinomori.classroom',
    name: '教室',
    description: '月之森女子学园的教室。木质桌椅散发着淡淡的清漆味，黑板上写着今日课表。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.tsukinomori', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.tsukinomori.gym',
    name: '体育馆',
    description: '月之森女子学园的体育馆。高挑的穹顶下铺着光洁的木地板，靠墙整齐摆放着体操垫与球具。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.tsukinomori', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.tsukinomori.auditorium',
    name: '礼堂',
    description: '月之森女子学园的礼堂。舞台上方悬挂着深红色的幕布，吊灯在穹顶下折射出柔和的光芒。',
    tags: ['indoor', 'school'],
    connections: [
      {to: 'school.tsukinomori', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
  {
    id: 'school.tsukinomori.garden',
    name: '菜园',
    description: '月之森女子学园的菜园。整齐的田垄间种着应季蔬菜，角落里搭着攀爬黄瓜的竹架。',
    tags: ['outdoor', 'school'],
    connections: [
      {to: 'school.tsukinomori', duration: 1, label: '回中庭', icon: 'school.svg', tag: 'place'},
    ],
  },
]

interface Lesson {
  id: string
  label: string
  icon: string
  days: number[]
  startHour: number
  startMin: number
  endHour: number
  endMin: number
  effects: Effect[]
  passage: string
  execute?: () => void
  locationId: string[]
}

const lessons: Lesson[] = [
  {
    id: 'school.lesson.1',
    label: '上学科课',
    icon: 'book.svg',
    days: [1, 2, 3, 4, 5],
    startHour: 8,
    startMin: 30,
    endHour: 8,
    endMin: 50,
    effects: [
      {type: 'stat', key: 'knowledge', value: 3},
      {type: 'stat', key: 'stress', value: 5},
    ],
    passage: 'school.lesson.academic',
    locationId: ['school.hanasakigawa', 'school.tsukinomori.classroom', 'school.haneoka.classroom'],
  },
  {
    id: 'school.lesson.2',
    label: '上学科课',
    icon: 'book.svg',
    days: [1, 2, 3, 4, 5],
    startHour: 9,
    startMin: 30,
    endHour: 9,
    endMin: 50,
    effects: [
      {type: 'stat', key: 'knowledge', value: 3},
      {type: 'stat', key: 'stress', value: 5},
    ],
    passage: 'school.lesson.academic',
    locationId: ['school.hanasakigawa', 'school.tsukinomori.classroom', 'school.haneoka.classroom'],
  },
  {
    id: 'school.lesson.3',
    label: '上学科课',
    icon: 'book.svg',
    days: [1, 2, 3, 4, 5],
    startHour: 13,
    startMin: 0,
    endHour: 13,
    endMin: 20,
    effects: [
      {type: 'stat', key: 'knowledge', value: 3},
      {type: 'stat', key: 'stress', value: 5},
    ],
    passage: 'school.lesson.academic',
    locationId: ['school.hanasakigawa', 'school.tsukinomori.classroom', 'school.haneoka.classroom'],
  },
  {
    id: 'school.lesson.4',
    label: '上音乐课',
    icon: 'piano.svg',
    days: [1, 3, 5],
    startHour: 14,
    startMin: 0,
    endHour: 14,
    endMin: 20,
    effects: [],
    execute: () => {
      const stats = ['expression', 'pitch', 'technique', 'ensemble', 'rhythm', 'improvisation']
      const stat = stats[Math.floor(Math.random() * stats.length)]
      applyEffects([{type: 'stat', key: stat, value: 2}])
    },
    passage: 'school.lesson.music',
    locationId: ['school.hanasakigawa', 'school.tsukinomori.classroom', 'school.haneoka.classroom'],
  },
  {
    id: 'school.lesson.5',
    label: '上体育课',
    icon: 'basketball.svg',
    days: [2, 4],
    startHour: 14,
    startMin: 0,
    endHour: 14,
    endMin: 20,
    effects: [
      {type: 'stat', key: 'fatigue', value: 5},
      {type: 'stat', key: 'stress', value: -10},
    ],
    passage: 'school.lesson.sports',
    locationId: ['school.hanasakigawa', 'school.tsukinomori.gym', 'school.haneoka.track'],
  },
]

function getNextLessonId(ctx: GameContext): string | null {
  const weekday = ctx.time.weekday
  if (weekday < 1 || weekday > 5) return null
  const current = ctx.time.hour * 60 + ctx.time.minute
  let nextLesson: Lesson | null = null
  let nextStart = Infinity
  for (const lesson of lessons) {
    if (!lesson.days.includes(weekday)) continue
    const start = lesson.startHour * 60 + lesson.startMin
    const end = lesson.endHour * 60 + lesson.endMin
    if (current <= end && start < nextStart) {
      nextStart = start
      nextLesson = lesson
    }
  }
  return nextLesson?.id ?? null
}

function makeAction(lesson: Lesson): Action {
  return {
    id: lesson.id,
    label: lesson.label,
    icon: lesson.icon,
    duration: 50,
    tag: 'school',
    locationId: lesson.locationId,
    description: (ctx) => {
      const current = ctx.time.hour * 60 + ctx.time.minute
      const start = lesson.startHour * 60 + lesson.startMin
      const end = lesson.endHour * 60 + lesson.endMin
      if (current < start) return `未到上课时间（${String(lesson.startHour).padStart(2, '0')}:${String(lesson.startMin).padStart(2, '0')}-${String(lesson.endHour).padStart(2, '0')}:${String(lesson.endMin).padStart(2, '0')}）`
      if (current > end) return '已迟到'
      return ''
    },
    visible: (ctx) => {
      if (!ctx.locationId.includes(ctx.player.school)) return false
      return getNextLessonId(ctx) === lesson.id
    },
    available: (ctx) => {
      if (!ctx.locationId.includes(ctx.player.school)) return false
      if (!lesson.days.includes(ctx.time.weekday)) return false
      const current = ctx.time.hour * 60 + ctx.time.minute
      const start = lesson.startHour * 60 + lesson.startMin
      const end = lesson.endHour * 60 + lesson.endMin
      return current >= start && current <= end
    },
    effects: lesson.effects,
    execute: lesson.execute,
    passage: lesson.passage,
  }
}

export const schoolActions: Action[] = lessons.map(makeAction)

export const schoolPassages: Passage[] = [
  {id: 'school.lesson.academic', text: '你在课堂上认真听讲，完成了本节课的学习。知识 +3，压力 +5。'},
  {id: 'school.lesson.sports', text: '你完成了体能训练。尽管身体有些疲惫，但精神却放松了许多。疲劳 +5，压力 -10。'},
  {id: 'school.lesson.music', text: '你进行了乐器练习，乐感有所提升。随机演奏属性 +2。'},
]
