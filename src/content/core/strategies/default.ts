import type {PerformanceStrategy} from '@/core/types'
import {computeBaseScore} from "@/core/performance.ts";

export const defaultStrategies: PerformanceStrategy[] = [
  {
    id: 'default',
    name: '正常发挥',
    description: '获得 1.0 倍基础得分。',
    category: 'standard',
    available: () => true,
    resolve: (ctx) => {
      const base = computeBaseScore(ctx.member, ctx.memberStats) / ctx.maxRounds * (0.85 + Math.random() * 0.3)
      return {score: base, fever: 0}
    },
  },
  {
    id: 'steady',
    name: '稳扎稳打',
    description: '消耗 10% 得分，Fever 提升 5 点。',
    category: 'standard',
    available: () => true,
    resolve: (ctx) => {
      const base = computeBaseScore(ctx.member, ctx.memberStats) / ctx.maxRounds * (0.85 + Math.random() * 0.3)
      return {score: base * 0.9, fever: 5}
    },
  },
  {
    id: 'improvise',
    name: '即兴演出',
    description: '获得 0.6 ~ 1.8 倍基础得分，Fever 提升 10 点。',
    category: 'standard',
    available: () => true,
    resolve: (ctx) => {
      const base = computeBaseScore(ctx.member, ctx.memberStats) / ctx.maxRounds * (0.85 + Math.random() * 0.3)
      const multiplier = 0.6 + Math.random() * 1.2
      return {score: base * multiplier, fever: 10}
    },
  },
  {
    id: 'warmup',
    name: '暖场互动',
    description: '演出前半段，消耗 50% 得分，Fever 提升 20 点。',
    category: 'advanced',
    available: (ctx) => ctx.currentRound <= Math.floor(ctx.maxRounds / 2),
    resolve: (ctx) => {
      const base = computeBaseScore(ctx.member, ctx.memberStats) / ctx.maxRounds * (0.85 + Math.random() * 0.3)
      return {score: base * 0.5, fever: 20}
    },
  },
  {
    id: 'climax',
    name: '高潮爆发',
    description: '演出后半段，消耗 15 点 Fever，得分提升 50%。',
    category: 'advanced',
    available: (ctx) => ctx.currentRound > Math.floor(ctx.maxRounds / 2) && ctx.currentFever >= 70,
    resolve: (ctx) => {
      const base = computeBaseScore(ctx.member, ctx.memberStats) / ctx.maxRounds * (0.85 + Math.random() * 0.3)
      return {score: base * 1.5, fever: -15}
    },
  },
]
