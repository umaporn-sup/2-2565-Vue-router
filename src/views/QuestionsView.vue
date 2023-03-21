<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getQuestions } from '../composable/getQuestions.js'
const questions = ref([])
const router = useRouter()

onMounted(async () => {
  questions.value = await getQuestions()
})

const gotoQuestion = (questId) => {
  // console.log(questId)
  router.push({ name: 'question', params: { id: questId } })
}
</script>

<template>
  <div class="w-full max-w-5xl p-3 border border-gray-200">
    <div class="w-full flex flex-col">
      <h1 class="flex text-xl font-semibold pb-3">Question List</h1>

      <div class="w-full">
        <div v-for="quest in questions" :key="quest.id">
          <button
            @click="gotoQuestion(quest.id)"
            class="flex w-full p-1 hover:bg-blue-50 rounded-lg"
          >
            {{ quest.id }}. {{ quest.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
