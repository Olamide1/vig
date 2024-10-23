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

/**
 * Maybe later
 * https://vue-meta.nuxtjs.org/guide/metainfo.html
 */

const meta = {
  title: 'AI Viral Content Idea Generator',
  description: 'Effortlessly generate viral content ideas tailored to your platform and audience based on real-time trends.',
  'og:title': 'AI Viral Content Idea Generator',
  'og:description': 'Create viral content ideas with ease. AI-powered, real-time suggestions for any platform.',
  'og:image': '/images/demo.png',
  'og:url': 'https://simplevig.com/',
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta,
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: CancelComponent,
    meta,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    meta,
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackComponent,
    meta,
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingComponent,
    meta,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
    meta,
  },
  {
    path: '/roadmap',
    name: 'roadmap',
    component: RoadmapComponent,
    meta,
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessComponent,
    meta,
  },
  {
    path: '/login',
    name: 'login',
    component: UserAuthComponent,
    meta,
  },

  // leaving here for reference
  {
    path: '/about',
    name: 'about',
    meta,
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

// set title dynamically https://mokkapps.de/vue-tips/dynamically-change-page-title
router.beforeEach((to,) => {
  document.title = to.meta?.title ?? 'Vig'

  const descriptionElement = document.querySelector('head meta[name="description"]')
  descriptionElement?.setAttribute('content', to.meta?.description || '')

  const ogTitleElement = document.querySelector('head meta[name="og:title"]')
  ogTitleElement?.setAttribute('content', to.meta?.['og:title'] || '')

  const ogImageElement = document.querySelector('head meta[name="og:image"]')
  ogImageElement?.setAttribute('content', to.meta?.['og:image'] || '')

  const ogUrlElement = document.querySelector('head meta[name="og:url"]')
  ogUrlElement?.setAttribute('content', to.meta?.['og:url'] || '')

  const ogDescriptionElement = document.querySelector('head meta[name="og:description"]')
  ogDescriptionElement?.setAttribute('content', to.meta?.['og:description'] || '')

})


export default router
