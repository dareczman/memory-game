import type { Card } from '@/types/game.ts'
import type { DifficultyLevel } from '@/types/setting.ts'

export interface GameRecord {
  date: string
  moves: number
  time: number
  difficulty: DifficultyLevel
  seed?: string
}

export interface SeedRecord {
  difficulty: DifficultyLevel
  seed: string
  cards: Card[]
}
