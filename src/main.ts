import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import Login from './components/Login.vue'
// @ts-ignore
import Dashboard from './components/Dashboard.vue'
// @ts-ignore
import StockIssueDetail from './components/StockIssueDetail.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/stockissue/:id', component: StockIssueDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple auth guard
router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')