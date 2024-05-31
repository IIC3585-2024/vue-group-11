import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyBooks from '../views/MyBooks.vue'
import RecommendedBooks from '../views/RecommendedBooks.vue'
import AvailableBooks from '../views/AvailableBooks.vue'
import NextBooks from '../views/NextBooks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: MyBooks
    },
    {
      path: '/recommended',
      name: 'recommended',
      component: RecommendedBooks
    },
    {
      path: '/availables',
      name: 'availables',
      component: AvailableBooks
    },
    {
      path: '/nextbooks',
      name: 'nextbooks',
      component: NextBooks
    }
  ]
})

export default router
