import type {Action, NPC, Passage} from '@/core/types.ts'

export const tsugumi: NPC = {
  id: 'npc.tsugumi',
  name: '羽泽鸫',
  locationId: 'city.hanasawa_cafe',
  schedule: [
    {locationId: 'school.haneoka', startHour: 8, endHour: 15, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.hanasawa_cafe', startHour: 15, endHour: 20, weekday: [1, 2, 3, 4, 5]},
    {locationId: 'city.hanasawa_cafe', startHour: 10, endHour: 18, weekday: [0, 6]},
  ],
  actions: ['npc.tsugumi.ask_about_job'],
}

export const tsugumiActions: Action[] = [
  {
    id: 'npc.tsugumi.ask_about_job',
    label: '询问打工',
    icon: 'job.svg',
    duration: 1,
    tag: 'job',
    available: (ctx) => !Boolean(ctx.player.flags['job.hanasawa_cafe.active']),
    passage: 'npc.tsugumi.ask_about_job',
  },
]

export const tsugumiPassages: Passage[] = [
  {
    id: 'npc.tsugumi.ask_about_job',
    text: '诶？来问打工的事吗？我们店确实有在招人呢...',
    speaker: '羽泽鸫',
    choices: [
      {label: '询问薪水', effects: [], nextPassage: 'npc.tsugumi.ask_about_salary'},
      {
        label: '接取任务',
        effects: [
          {type: 'flag', key: 'job.hanasawa_cafe.active', value: true},
          {type: 'flag', key: 'job.hanasawa_cafe.hours', value: 0},
          {type: 'task', key: 'job.hanasawa_cafe'},
        ],
      },
    ],
  },
  {
    id: 'npc.tsugumi.ask_about_salary',
    text: '啊，时薪的话是 1300 円，工资周结。如果每周工作 10 小时以上，会有 3000 円的奖金哦。',
    speaker: '羽泽鸫',
  },
]
