import { createRouter, createWebHistory } from 'vue-router'

// leaving this for reference.
import HomeView from '../views/HomeView.vue'

// components serving as full pages
import CancelComponent from '../components/Cancel.vue'
import DashboardComponent from '../components/Dashboard.vue'
import FeedbackComponent from '../components/Feedback.vue'
import PricingComponent from '../components/Pricing.vue'
import ProfileComponent from '../components/Profile.vue'
import RoadmapComponent from '../components/Roadmap.vue'
import SuccessComponent from '../components/Success.vue'
import UserAuthComponent from '../components/UserAuth.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: CancelComponent
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackComponent
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingComponent
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent
  },
  {
    path: '/roadmap',
    name: 'roadmap',
    component: RoadmapComponent
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessComponent
  },
  {
    path: '/login',
    name: 'login',
    component: UserAuthComponent
  },

  // leaving here for reference
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
