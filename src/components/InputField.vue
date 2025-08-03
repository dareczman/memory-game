<template>
  <div class="input-field">
    <label v-if="formLabel" class="input-label">
      {{ formLabel }}
    </label>

    <input
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      class="input-element"
      :class="{ 'input-error': error }"
    />

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  formLabel?: string
  placeholder?: string
  type?: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.input-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.input-element {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.input-element:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.input-error {
  border-color: #e74c3c;
}

.error-message {
  font-size: 0.75rem;
  color: #e74c3c;
}
</style>
