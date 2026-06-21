import type {Action, NPC, Passage} from '@/core/types.ts'

export const saya: NPC = {
  id: 'npc.saya',
  name: '山吹沙绫',
  locationId: 'city.yamabuki_bakery',
  schedule: [
    {locationId: 'school.hanasakigawa', startHour: 8, endHour: 15, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.yamabuki_bakery', startHour: 15, endHour: 19, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.yamabuki_bakery', startHour: 9, endHour: 17, weekday: [0, 6]},
  ],
  actions: ['npc.saya.ask_about_job'],
}

export const sayaActions: Action[] = [
  {
    id: 'npc.saya.ask_about_job',
    label: '询问打工',
    icon: 'job.svg',
    duration: 1,
    tag: 'job',
    available: (ctx) => !Boolean(ctx.player.flags['job.yamabuki_bakery.active']),
    passage: 'npc.saya.ask_about_job',
  },
]

export const sayaPassages: Passage[] = [
  {
    id: 'npc.saya.ask_about_job',
    text: '诶，对打工感兴趣吗？店里确实有些人手不足呢...啊，不过不是什么辛苦的活啦。',
    speaker: '山吹沙绫',
    choices: [
      {label: '询问薪水', effects: [], nextPassage: 'npc.saya.ask_about_salary'},
      {
        label: '接受工作',
        effects: [
          {type: 'flag', key: 'job.yamabuki_bakery.active', value: true},
        ],
      },
    ],
  },
  {
    id: 'npc.saya.ask_about_salary',
    text: '唔...时薪是 1200 円，每次做完工作就可以直接拿到。',
    speaker: '山吹沙绫',
  },
]
