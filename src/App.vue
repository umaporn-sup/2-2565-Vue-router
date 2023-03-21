<script setup>
import Nav from './components/Nav.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full max-w-5xl p-3">
    <div
      class="w-full flex text-2xl font-semibold tracking-widest justify-center"
    >
      <h1>~ Quiz Project ~</h1>
    </div>
    <Nav />
    <RouterView />
  </div>
</template>

<style scoped></style>
