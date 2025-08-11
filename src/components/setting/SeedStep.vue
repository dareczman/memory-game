<script setup lang="ts">
import FormWrapper from '@/components/FormWrapper.vue'
import InputField from '@/components/InputField.vue'
import { useSettingStore } from '@/stores/setting.ts'
import { storeToRefs } from 'pinia'
import { useHistoryStore } from '@/stores/history.ts'
import { useGameStore } from '@/stores/game.ts'
import { redirectToRoute } from '@/router'

const settingStore = useSettingStore()
const { seed } = storeToRefs(settingStore)

const historyStore = useHistoryStore()
const gameStore = useGameStore()

const submitForm = () => {
  if (seed.value && historyStore.getSeedGameSession(seed.value)) {
    gameStore.setSeedSessionGame(historyStore.getSeedGameSession(seed.value))
    redirectToRoute('GameBoard')
    return
  }
  settingStore.setNextStep('difficulty')
}
</script>

<template>
  <FormWrapper form-label="Enter an existing seed or create a new one" @submit="submitForm">
    <InputField v-model="seed" formLabel="Seed" placeholder="Enter seed" />
  </FormWrapper>
</template>

<style scoped></style>
