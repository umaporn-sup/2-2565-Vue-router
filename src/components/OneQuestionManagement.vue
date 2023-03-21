<script setup>
import { ref, onMounted } from 'vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import AddEditQuestion from './AddEditQuestion.vue'
import { getQuestion } from '../composable/getQuestion.js'
import { useRoute, useRouter } from 'vue-router'
const { params } = useRoute()
const router = useRouter()
const questions = ref([])

onMounted(async () => {
  questions.value = await getQuestion(parseInt(params.id))
  // console.log(questions.value)
})

const addNewQuestion = async (newQuestion) => {
  // console.log(newQuestion)
  try {
    const res = await fetch('http://localhost:5000/questions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      // body: JSON.stringify({
      //   text: newQuestion.text,
      //   options: newQuestion.options
      // })
      body: JSON.stringify(newQuestion)
    })
    if (res.status === 201) {
      const addedQuestion = await res.json()
      questions.value.push(addedQuestion)
      router.push({ name: 'QuestionsView' })
    } else throw new Error('There is something wrong, cannot add!')
  } catch (error) {
    console.log(error)
  }
}

const deleteQuestion = async (deleteId) => {
  try {
    const res = await fetch(`http://localhost:5000/questions/${deleteId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      questions.value = questions.value.filter((question) => {
        return question.id != deleteId
      })
    } else throw new Error('There is something wrong, cannot delete!')
  } catch (error) {
    console.log(error)
  }
}

const editQuestion = ref(undefined)
const setEditMode = (question) => {
  currentComponent.value = 'AddEditQuestion'
  editQuestion.value = question
}
const modifyQuestion = async (updatedQuestion) => {
  // console.log(updatedQuestion)
  try {
    const res = await fetch(
      `http://localhost:5000/questions/${updatedQuestion.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        // body: JSON.stringify({
        //   text: updatedQuestion.text,
        //   options: updatedQuestion.options
        // })
        body: JSON.stringify(updatedQuestion)
      }
    )
    if (res.ok) {
      questions.value = questions.value.map((quest) => {
        if (quest.id === updatedQuestion.id) {
          quest.text = updatedQuestion.text
          quest.options = updatedQuestion.options
        }
        return quest
      })
    } else throw new Error('There is something wrong, cannot edit!')
  } catch (error) {
    console.log(error)
  }
  editQuestion.value = undefined
  currentComponent.value = 'QuestionManagement'
}

const currentComponent = ref('QuestionManagement')
</script>

<template>
  <div class="p-2 max-w-5xl border border-gray-200">
    <h1 class="flex text-xl font-semibold pb-3">Question Management</h1>
    <div class="w-full flex pb-5 space-x-3">
      <button
        @click="currentComponent = 'AddEditQuestion'"
        class="bg-emerald-600 text-white p-1 rounded-lg"
      >
        + New Question
      </button>
    </div>

    <AddEditQuestion
      v-if="currentComponent === 'AddEditQuestion'"
      @add="addNewQuestion"
      :question="editQuestion"
      @edit="modifyQuestion"
    />

    <div v-else class="w-full">
      <div
        v-for="quest in questions"
        :key="quest.id"
        class="w-full flex flex-col"
      >
        <div class="flex items-center space-x-2">
          <DeleteIcon class="text-red-500" @click="deleteQuestion(quest.id)" />
          <h1 class="font-semibold">{{ quest.id }}. {{ quest.text }}</h1>
        </div>

        <ul class="pl-6">
          <li v-for="option in quest.options" :key="option.id">
            <p>{{ option.label }}. {{ option.text }}</p>
          </li>
        </ul>
        <button
          @click="setEditMode(quest)"
          class="bg-gray-300 shadow-sm rounded-lg"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
