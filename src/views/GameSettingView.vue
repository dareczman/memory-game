<script setup lang="ts">
import TheViewSectionContainer from '@/components/TheViewSectionContainer.vue'
import SeedStep from '@/components/setting/SeedStep.vue'
import { useSettingStore } from '@/stores/setting.ts'
import { storeToRefs } from 'pinia'
import DifficultySelectionStep from '@/components/setting/DifficultySelectionStep.vue'

const settingStore = useSettingStore()
const { currentStep } = storeToRefs(settingStore)
</script>

<template>
  <TheViewSectionContainer>
    <SeedStep v-if="currentStep === 'seed'" />
    <DifficultySelectionStep v-if="currentStep === 'difficulty'" />
  </TheViewSectionContainer>
</template>

<style scoped></style>
