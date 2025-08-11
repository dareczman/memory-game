<script setup lang="ts">
import FormWrapper from '@/components/FormWrapper.vue'
import { useSettingStore } from '@/stores/setting.ts'
import { storeToRefs } from 'pinia'
import { redirectToRoute } from '@/router'
import TheButton from '@/components/TheButton.vue'
import { DifficultyLevel } from '@/types/setting.ts'

const settingStore = useSettingStore()
const { difficulty } = storeToRefs(settingStore)

const submitForm = (level: DifficultyLevel) => {
  difficulty.value = level
  redirectToRoute('GameBoard')
}
</script>

<template>
  <FormWrapper form-label="Select difficulty level">
    <template #submit>
      <div class="buttons-container">
        <TheButton type="submit" @click="submitForm(DifficultyLevel.Easy)">{{
          DifficultyLevel.Easy
        }}</TheButton>
        <TheButton type="submit" @click="submitForm(DifficultyLevel.Medium)">{{
          DifficultyLevel.Medium
        }}</TheButton>
        <TheButton type="submit" @click="submitForm(DifficultyLevel.Hard)">{{
          DifficultyLevel.Hard
        }}</TheButton>
      </div>
    </template>
  </FormWrapper>
</template>

<style scoped>
.buttons-container {
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
}
</style>
