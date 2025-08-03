import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { Card } from '@/types/game.ts'
import { canvasRef, drawBoard, tileSize } from '@/composables/useCanvas.ts'
import { useSettingStore } from '@/stores/setting.ts'
import { useStatisticStore } from '@/stores/statistic.ts'
import { useHistoryStore } from '@/stores/history.ts'
import { useGameStore } from '@/stores/game.ts'

export const useCardStore = defineStore('card', () => {
  const cards = ref<Card[]>([])
  const selectedCards = ref<Card[]>([])
  const isProcessing = ref(false)

  const statisticStore = useStatisticStore()
  const historyStore = useHistoryStore()
  const settingStore = useSettingStore()
  const gameStore = useGameStore()

  const { seed } = storeToRefs(settingStore)
  const { moveCount, elapsedTime } = storeToRefs(statisticStore)

  const rows = computed(() => settingStore.difficultyTilesMap[settingStore.difficulty].rows)
  const cols = computed(() => settingStore.difficultyTilesMap[settingStore.difficulty].cols)

  const playSound = (src: string) => new Audio(src).play()

  const setWin = () => {
    gameStore.gameWon = true
    gameStore.isActiveGame = false
    statisticStore.stopTimer()
    historyStore.saveGameToHistory()
    if (seed.value && !gameStore.isSeedSessionGame) {
      historyStore.saveSeedGameToHistory(cards.value)
    }
    gameStore.isSeedSessionGame = false
  }

  const getClickedCard = (event: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const col = Math.floor(mouseX / tileSize.value)
    const row = Math.floor(mouseY / tileSize.value)
    return cards.value[row * cols.value + col] || null
  }

  const revealCard = (card: Card) => {
    card.revealed = true
    selectedCards.value.push(card)
    drawBoard(cards.value, cols.value, rows.value)
  }

  const checkMatch = () => {
    const [a, b] = selectedCards.value
    if (a.image === b.image) {
      a.matched = b.matched = true
      playSound('/sounds/level-up-05-326133.mp3')
    } else {
      a.revealed = b.revealed = false
    }
    selectedCards.value = []
    drawBoard(cards.value, cols.value, rows.value)
  }

  const handleClick = (event: MouseEvent) => {
    if (isProcessing.value) return

    const card = getClickedCard(event)
    if (!card || card.revealed || card.matched) return

    playSound('/sounds/bubble-pop-04-323580.mp3')
    revealCard(card)

    if (selectedCards.value.length === 2) {
      isProcessing.value = true
      statisticStore.incrementMove()

      setTimeout(() => {
        checkMatch()
        isProcessing.value = false

        historyStore.saveCurrentGameHistory(cards.value)

        if (cards.value.every((c) => c.matched)) {
          setWin()
          historyStore.deleteCurrentGameHistory()
          alert(`🎉 Congratulations! Moves: ${moveCount.value}, Time: ${elapsedTime.value}s`)
        }
      }, 300)
    }
  }

  return { cards, handleClick }
})
