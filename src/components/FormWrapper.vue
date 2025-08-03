<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'

const props = defineProps<{
  formLabel: string
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <p class="form-label">{{ formLabel }}</p>
    <hr />
    <slot></slot>

    <slot name="submit">
      <TheButton type="submit">Continue</TheButton>
    </slot>
  </form>
</template>

<style scoped>
form {
  padding: 1rem;
  border: 1px solid #4b4b4b;
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #27272a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
