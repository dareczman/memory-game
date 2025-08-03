import { createRouter, createWebHistory } from 'vue-router'
import GameSettingView from '@/views/GameSettingView.vue'
import GameBoardView from '@/views/GameBoardView.vue'
import { storeToRefs } from 'pinia'
import { useHistoryStore } from '@/stores/history.ts'
import HistoryGameView from '@/views/HistoryGameView.vue'

const routes = [
  { path: '/', component: GameSettingView, name: 'Setting' },
  { path: '/game', component: GameBoardView, name: 'GameBoard' },
  { path: '/history', component: HistoryGameView, name: 'History' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const redirectToRoute = (name: string) => {
  router.push({ name: name }).then()
}

router.beforeEach((to, from, next) => {
  if (to.name === 'GameBoard' && !from.name) {
    const historyStore = useHistoryStore()
    const { ifGameSessionExists } = storeToRefs(historyStore)

    if (!ifGameSessionExists.value) return next({ name: 'Setting' })
  }
  next()
})
