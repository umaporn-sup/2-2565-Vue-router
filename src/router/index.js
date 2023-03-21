import { createRouter, createWebHistory } from 'vue-router'
import QuestionsView from '../views/QuestionsView.vue'
import NotFound from '../views/NotFoundView.vue'
import OneQuestionManagement from '../components/OneQuestionManagement.vue'
import AboutView from '../views/AboutView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/questions'
    },
    {
      path: '/questions',
      name: 'QuestionsView',
      component: QuestionsView
    },
    {
      path: '/question/:id',
      name: 'question',
      component: OneQuestionManagement
    },
    {
      path: '/aboutus',
      name: 'About',
      component: AboutView
    },
    {
      path: '/:catchNotMathPath(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],

  linkExactActiveClass: 'text-blue-500',
  linkActiveClass: 'text-green-500'
})
export default router
// https://router.vuejs.org/api/interfaces/RouterOptions.html#Properties-linkActiveClass
