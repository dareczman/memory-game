import { defineStore, storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores/setting.ts'
import { useStatisticStore } from '@/stores/statistic.ts'
import type { Card } from '@/types/game.ts'
import type { GameRecord, SeedRecord } from '@/types/history.ts'
import { addObjectToArrayInLocalStorage } from '@/utils/localStorage.ts'

export const useHistoryStore = defineStore('history', () => {
  const settingStore = useSettingStore()
  const { difficulty, seed } = storeToRefs(settingStore)

  const statisticStore = useStatisticStore()
  const { moveCount, elapsedTime } = storeToRefs(statisticStore)

  const history = ref<GameRecord[]>([])
  const ifGameSessionExists = ref(!!localStorage.getItem('cs2-current-game-history'))

  const saveGameToHistory = () => {
    const newRecord: GameRecord = {
      date: new Date().toISOString(),
      moves: moveCount.value,
      time: elapsedTime.value,
      difficulty: difficulty.value,
      seed: seed.value || undefined,
    }
    history.value.unshift(newRecord)
    history.value = history.value.slice(0, 10)
    localStorage.setItem('cs2-memory-history', JSON.stringify(history.value))
  }

  const loadHistory = () => {
    const saved = localStorage.getItem('cs2-memory-history')
    if (saved) {
      history.value = JSON.parse(saved)
    }
  }

  const saveCurrentGameHistory = (cards: Card[]) => {
    const simplifiedCards = cards.map(({ id, image, revealed, matched, quality }) => ({
      id,
      image,
      revealed,
      matched,
      quality,
    }))

    const historyGame = {
      cards: simplifiedCards,
      moves: moveCount.value,
      time: elapsedTime.value,
      difficulty: difficulty.value,
      seed: seed.value || undefined,
    }

    localStorage.setItem('cs2-current-game-history', JSON.stringify(historyGame))
  }

  const deleteCurrentGameHistory = () => {
    localStorage.removeItem('cs2-current-game-history')
    ifGameSessionExists.value = false
  }

  const saveSeedGameToHistory = (cards: Card[]) => {
    const simplifiedCards = cards.map(({ id, image, quality }) => ({
      id,
      image,
      revealed: false,
      matched: false,
      quality,
    }))

    const seedGame = {
      difficulty: difficulty.value,
      seed: seed.value,
      cards: simplifiedCards,
    }

    addObjectToArrayInLocalStorage('cs2-memory-seed-games', seedGame)
  }

  const getSeedGameSession = (seed: string) => {
    const seedGame = localStorage.getItem('cs2-memory-seed-games')

    return seedGame ? JSON.parse(seedGame).find((item: SeedRecord) => item.seed === seed) : false
  }

  const loadCurrentGameHistoryFromLocalStorage = () => {
    return JSON.parse(<string>localStorage.getItem('cs2-current-game-history'))
  }

  onMounted(() => {
    loadHistory()
  })

  return {
    history,
    saveGameToHistory,
    loadHistory,
    saveCurrentGameHistory,
    deleteCurrentGameHistory,
    ifGameSessionExists,
    saveSeedGameToHistory,
    getSeedGameSession,
    loadCurrentGameHistoryFromLocalStorage,
  }
})
