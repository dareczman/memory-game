<script setup lang="ts"></script>

<template>
  <button type="submit">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3b7cc4;
}
</style>
