<script setup lang="ts">
import TheViewSectionContainer from '@/components/TheViewSectionContainer.vue'
import GameBoard from '@/components/game/GameBoard.vue'
import StatsPanel from '@/components/game/StatsPanel.vue'
import TheActionButtons from '@/components/game/TheActionButtons.vue'
</script>

<template>
  <div class="game-board-section">
    <TheViewSectionContainer>
      <TheActionButtons />
      <StatsPanel />
      <GameBoard />
    </TheViewSectionContainer>
  </div>
</template>

<style scoped></style>
