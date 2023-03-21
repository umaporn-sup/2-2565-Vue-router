<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['edit', 'add'])
const props = defineProps({
  question: { type: Object }
})
// console.log(props.question)

const updatedQuestion = ref({})
onMounted(() => {
  if (props.question === undefined) {
    updatedQuestion.value = {
      text: '',
      options: [
        {
          id: 1,
          label: 'A',
          text: '',
          isCorrect: false
        },
        {
          id: 2,
          label: 'B',
          text: '',
          isCorrect: false
        },
        {
          id: 3,
          label: 'C',
          text: '',
          isCorrect: false
        },
        {
          id: 4,
          label: 'D',
          text: '',
          isCorrect: false
        }
      ]
    }
  } else updatedQuestion.value = props.question
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="space-x-2">
        <label>Question</label>
        <input
          type="text"
          v-model="updatedQuestion.text"
          class="border border-gray-300 rounded-md p-1"
        />
      </div>

      <ul class="pl-6">
        <li
          v-for="(option, index) in updatedQuestion.options"
          :key="option.id"
          class="space-x-2 p-1"
        >
          <input
            type="checkbox"
            class="border border-gray-200"
            v-model="updatedQuestion.options[index].isCorrect"
          /><label v-show="updatedQuestion.options[index].isCorrect"
            >Correct Answer</label
          >
          <label>{{ option.label }}.</label>
          <input
            type="text"
            v-model="updatedQuestion.options[index].text"
            class="border border-gray-300 rounded-md p-1"
          />
        </li>
      </ul>
    </div>
    <div class="w-full flex justify-end">
      <button
        v-if="updatedQuestion.id"
        class="bg-red-600 text-white p-1 rounded-md"
        @click="$emit('edit', updatedQuestion)"
      >
        Edit
      </button>
      <button
        @click="$emit('add', updatedQuestion)"
        v-else
        class="bg-emerald-600 text-white p-1 rounded-md"
      >
        Add
      </button>
    </div>
  </div>
</template>

<style scoped></style>
