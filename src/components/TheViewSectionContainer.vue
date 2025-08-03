<script setup lang="ts"></script>

<template>
  <div class="main-section">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem 0.5rem;
  }
}
</style>
