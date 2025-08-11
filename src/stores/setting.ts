import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DifficultyLevel, type StepName, type TilesDimension } from '@/types/setting.ts'

export const useSettingStore = defineStore('setting', () => {
  const seed = ref('')
  const difficulty = ref<DifficultyLevel>(DifficultyLevel.Medium)
  const currentStep = ref<StepName>('seed')
  const difficultyTilesMap = ref<Record<DifficultyLevel, TilesDimension>>({
    easy: { rows: 2, cols: 4 },
    medium: { rows: 3, cols: 4 },
    hard: { rows: 4, cols: 4 },
  })

  const setNextStep = (step: StepName) => {
    currentStep.value = step
  }

  const reset = () => {
    seed.value = ''
    difficulty.value = DifficultyLevel.Medium
    currentStep.value = 'seed'
  }

  return {
    seed,
    difficulty,
    currentStep,
    setNextStep,
    difficultyTilesMap,
    reset,
  }
})
