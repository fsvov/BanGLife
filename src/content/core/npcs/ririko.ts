import type {Action, NPC, Passage} from '@/core/types.ts'

export const ririko: NPC = {
  id: 'npc.ririko',
  name: '真次凛凛子',
  locationId: 'city.ring_cafe',
  schedule: [
    {locationId: 'city.livehouse_ring', startHour: 10, endHour: 12, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.ring_cafe', startHour: 12, endHour: 18, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.livehouse_ring', startHour: 18, endHour: 22, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.ring_cafe', startHour: 10, endHour: 20, weekday: [0, 6]},
  ],
  actions: ['npc.ririko.ask_about_job'],
}

export const ririkoActions: Action[] = [
  {
    id: 'npc.ririko.ask_about_job',
    label: '询问打工',
    icon: 'job.svg',
    duration: 1,
    tag: 'job',
    available: (ctx) => !Boolean(ctx.player.flags['job.livehouse_ring.active']),
    passage: 'npc.ririko.ask_about_job',
  },
  {
    id: 'npc.ririko.ask_about_salary',
    label: '询问薪水',
    icon: 'job.svg',
    duration: 1,
    tag: 'job',
    passage: 'npc.ririko.ask_about_salary',
  },
]

export const ririkoPassages: Passage[] = [
  {
    id: 'npc.ririko.ask_about_job',
    text: '哎呀，想来 RiNG 帮忙？最近正觉得人手有点不够，你能来的话太好了呢~',
    speaker: '真次凛凛子',
    choices: [
      {label: '询问薪水', effects: [], nextPassage: 'npc.ririko.ask_about_salary'},
      {
        label: '接取任务',
        effects: [
          {type: 'flag', key: 'job.livehouse_ring.active', value: true},
          {type: 'flag', key: 'job.livehouse_ring.hours', value: 0},
          {type: 'task', key: 'job.livehouse_ring'},
        ],
      },
    ],
  },
  {
    id: 'npc.ririko.ask_about_salary',
    text: '时薪是 1400 円，一次至少帮忙 2 小时就好。\n' +
      '工资周结，每周需要来 10 小时以上，如果不够的话会扣 3000 円调整费，这点要注意哦~',
    speaker: '真次凛凛子',
  },
]
