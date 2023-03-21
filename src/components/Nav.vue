<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="p-2">
    <RouterLink
      to="/questions"
      active-class="active"
      exact-active-class="exact-active"
      >Question List </RouterLink
    >|
    <RouterLink
      active-class="active"
      exact-active-class="exact-active"
      to="/aboutus"
      >Aboutus</RouterLink
    >
  </div>
</template>

<style scoped>
.active {
  color: purple;
}
.exact-active {
  color: blue;
}
</style>
