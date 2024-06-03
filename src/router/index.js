import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompletedBooks from '../views/CompletedBooks.vue'
import RecommendedBooks from '../views/RecommendedBooks.vue'
import AvailableBooks from '../views/AvailableBooks.vue'
import FavoriteBooks from '../views/FavoriteBooks.vue'
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
      path: '/completedbooks',
      name: 'completedbooks',
      component: CompletedBooks
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
      path: '/favorites',
      name: 'favorites',
      component: FavoriteBooks
    },
    {
      path: '/nextbooks',
      name: 'nextbooks',
      component: NextBooks
    }
  ]
})

export default router
