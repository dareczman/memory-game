import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useStatisticStore } from '@/stores/statistic'
import { useHistoryStore } from '@/stores/history'
import { useSettingStore } from '@/stores/setting'
import { generateShuffledCards } from '@/composables/useCardUtils'
import { preloadImages, drawBoard, setCanvasSize, canvasRef } from '@/composables/useCanvas'
import { handleMouseMove } from '@/composables/useListeners'
import type { Card } from '@/types/game'
import { redirectToRoute } from '@/router'
import type { SeedRecord } from '@/types/history.ts'
import { useCardStore } from '@/stores/card.ts'

export const useGameStore = defineStore('game', () => {
  const statisticStore = useStatisticStore()
  const historyStore = useHistoryStore()
  const settingStore = useSettingStore()
  const cardStore = useCardStore()

  const { difficulty, seed } = storeToRefs(settingStore)
  const { startTime, moveCount, elapsedTime } = storeToRefs(statisticStore)
  const { cards } = storeToRefs(cardStore)

  const rows = computed(() => settingStore.difficultyTilesMap[settingStore.difficulty].rows)
  const cols = computed(() => settingStore.difficultyTilesMap[settingStore.difficulty].cols)

  const gameWon = ref(false)
  const isActiveGame = ref(false)
  const isSeedSessionGame = ref(false)
  const isGamePaused = ref(false)

  const resetGameState = () => {
    gameWon.value = false
    statisticStore.reset()
    isActiveGame.value = false
    isGamePaused.value = false
  }

  const setupCanvas = () => {
    setCanvasSize(cols.value, rows.value)
    preloadImages(cards.value, () => drawBoard(cards.value, cols.value, rows.value))
    canvasRef.value?.addEventListener('mousemove', handleMouseMove(cards.value, cols.value))
    isActiveGame.value = true
  }

  const pauseGame = () => {
    isActiveGame.value = false
    statisticStore.stopTimer()
    isGamePaused.value = true
  }

  const resumeGame = () => {
    isActiveGame.value = true
    isGamePaused.value = false
    statisticStore.startTimer(elapsedTime.value)
  }

  const setNewGame = () => {
    resetGameState()
    historyStore.deleteCurrentGameHistory()
    redirectToRoute('Setting')
    settingStore.reset()
  }

  const startSeedSessionGame = () => {
    startTime.value = Date.now()
    statisticStore.startTimer()
    setupCanvas()
  }

  const startGame = () => {
    resetGameState()
    statisticStore.startTimer()
    cards.value = generateShuffledCards(rows.value, cols.value)
    setupCanvas()
  }

  const setSeedSessionGame = (seedGameSession: SeedRecord) => {
    difficulty.value = seedGameSession.difficulty
    seed.value = seedGameSession.seed
    isSeedSessionGame.value = true
    cards.value = seedGameSession.cards.map((card: Card) => ({
      ...card,
      parallaxOffset: { x: 0, y: 0 },
    }))
  }

  const setLastSessionGame = () => {
    const historyGame = historyStore.loadCurrentGameHistoryFromLocalStorage()
    moveCount.value = historyGame.moves
    elapsedTime.value = historyGame.time
    difficulty.value = historyGame.difficulty
    seed.value = historyGame.seed
  }

  const continueGame = () => {
    const historyGame = historyStore.loadCurrentGameHistoryFromLocalStorage()
    gameWon.value = false
    startTime.value = Date.now()
    statisticStore.startTimer(historyGame.time)
    cards.value = historyGame.cards.map((card: Card) => ({
      ...card,
      parallaxOffset: { x: 0, y: 0 },
    }))
    setupCanvas()
  }

  return {
    canvasRef,
    gameWon,
    isActiveGame,
    startGame,
    setSeedSessionGame,
    setLastSessionGame,
    continueGame,
    setNewGame,
    startSeedSessionGame,
    isSeedSessionGame,
    pauseGame,
    resumeGame,
    isGamePaused,
  }
})
