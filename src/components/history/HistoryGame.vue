<template>
  <div class="history">
    <h1 class="title">Game history</h1>
    <hr />
    <ul v-if="history.length > 0">
      <li v-for="(record, index) in history" :key="index">
        <h3>
          <strong>{{ formatDate(record.date) }}</strong>
        </h3>
        <p>
          Moves: <strong>{{ record.moves }}</strong> | Time: <strong>{{ record.time }}s</strong>
        </p>
        <p>
          Difficulty level: {{ record.difficulty }}
          <span v-if="record.seed"
            >| Seed: <strong>{{ record.seed }}</strong></span
          >
        </p>
      </li>
    </ul>
    <p v-else>No saved games.</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHistoryStore } from '@/stores/history.ts'

const historyStore = useHistoryStore()
const { history } = storeToRefs(historyStore)

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.history {
  background: #1a1a1a;
  border-radius: 8px;
  font-size: 0.9rem;
}

.title {
  padding: 1rem;
}

li {
  padding: 1rem;
  border-bottom: 1px solid #333;
  list-style: none;
}

li:nth-child(even) {
  background-color: #333;
}
</style>
