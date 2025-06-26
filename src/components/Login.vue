<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col justify-center items-center p-4">
    <div class="w-full max-w-md">
      <div class="glass rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl mb-4 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Stock Issue
          </h1>
          <p class="text-gray-600 mt-2">Management System</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary"
          >
            <span v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-purple-50 rounded-xl">
          <p class="text-sm text-purple-700 font-medium mb-2">Demo Credentials:</p>
          <p class="text-xs text-purple-600">Email: admin@stockissue.com</p>
          <p class="text-xs text-purple-600">Password: admin123</p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="mt-8 text-center">
      <p class="text-sm text-gray-500">
        Crafted with ❤️ by <a href="https://github.com/AnnisaCode" target="_blank" class="font-semibold text-primary-600 hover:underline">AnnisaCode</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  // Simple frontend validation (dummy authentication)
  if (email.value === 'admin@stockissue.com' && password.value === 'admin123') {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', email.value)
    
    setTimeout(() => {
      loading.value = false
      router.push('/dashboard')
    }, 1000)
  } else {
    setTimeout(() => {
      loading.value = false
      error.value = 'Invalid email or password'
    }, 1000)
  }
}
</script>