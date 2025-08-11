import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatisticStore = defineStore('statistic', () => {
  const moveCount = ref(0)
  const elapsedTime = ref(0)
  const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)
  const startTime = ref<number | null>(null)

  const incrementMove = () => {
    moveCount.value++
  }

  const reset = () => {
    moveCount.value = 0
    elapsedTime.value = 0
    if (timerInterval.value) clearInterval(timerInterval.value)
  }

  const startTimer = (startFrom: number = 0) => {
    startTime.value = Date.now() - startFrom * 1000

    timerInterval.value = setInterval(() => {
      if (startTime.value !== null) {
        elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  return {
    moveCount,
    elapsedTime,
    timerInterval,
    incrementMove,
    reset,
    startTimer,
    stopTimer,
    startTime,
  }
})
