<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="glass border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h1 class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Stock Issue Dashboard
              </h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ userEmail }}</span>
            <button @click="logout" class="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <!-- Page Title -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Stock Issues</h2>
        <p class="text-gray-600">Manage your stock issue requests and approvals</p>
      </div>

      <!-- Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-4">
          <button @click="showCreateModal = true" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Stock Issue
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stock issues..."
            class="form-input max-w-xs"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-2xl p-6 shadow-lg">
          <div class="animate-shimmer h-4 bg-gray-200 rounded mb-4"></div>
          <div class="animate-shimmer h-3 bg-gray-200 rounded mb-2"></div>
          <div class="animate-shimmer h-3 bg-gray-200 rounded mb-4"></div>
          <div class="animate-shimmer h-8 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Stock Issues Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="issue in filteredIssues"
          :key="issue.id"
          class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl card-hover cursor-pointer border border-gray-100"
          @click="viewDetails(issue.id)"
        >
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ issue.issueNumber }}
              </h3>
              <p class="text-sm text-gray-500">{{ formatDate(issue.date) }}</p>
            </div>
            <span :class="getStatusClass(issue.status)">
              {{ issue.status }}
            </span>
          </div>

          <!-- Content -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span class="text-sm">{{ issue.department }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm">{{ issue.requestedBy }}</span>
            </div>
            <p class="text-sm text-gray-700 line-clamp-2">{{ issue.description }}</p>
          </div>

          <!-- Footer -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <span class="text-xs text-gray-500">
              {{ issue.details?.length || 0 }} items
            </span>
            <div class="flex space-x-2" @click.stop>
              <button @click="editIssue(issue)" class="btn-secondary text-xs py-1 px-3">
                Edit
              </button>
              <button @click="deleteIssue(issue.id)" class="btn-danger text-xs py-1 px-3">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredIssues.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No stock issues</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new stock issue.</p>
        <div class="mt-6">
          <button @click="showCreateModal = true" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Stock Issue
          </button>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="text-center py-4">
      <p class="text-sm text-gray-500">
        Crafted with ❤️ by <a href="https://github.com/AnnisaCode" target="_blank" class="font-semibold text-primary-600 hover:underline">AnnisaCode</a>
      </p>
    </footer>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingIssue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingIssue ? 'Edit Stock Issue' : 'Create New Stock Issue' }}
        </h3>
        
        <form @submit.prevent="saveIssue" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Issue Number</label>
            <input v-model="formData.issueNumber" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input v-model="formData.date" type="date" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input v-model="formData.department" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
            <input v-model="formData.requestedBy" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="formData.status" required class="form-input">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="formData.description" rows="3" class="form-input"></textarea>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button type="submit" class="btn-primary flex-1">
              {{ editingIssue ? 'Update' : 'Create' }}
            </button>
            <button type="button" @click="closeModal" class="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

interface StockIssue {
  id: string;
  issueNumber: string;
  date: string;
  department: string;
  requestedBy: string;
  status: string;
  description: string;
  details?: any[];
}

const router = useRouter()

// State
const stockIssues = ref<StockIssue[]>([])
const loading = ref(true)
const searchQuery = ref('')
const showCreateModal = ref(false)
const editingIssue = ref<StockIssue | null>(null)
const userEmail = ref(localStorage.getItem('userEmail') || '')

// Form data
const formData = ref<Omit<StockIssue, 'id' | 'details'>>({
  issueNumber: '',
  date: '',
  department: '',
  requestedBy: '',
  status: 'pending',
  description: ''
})

// Computed
const filteredIssues = computed(() => {
  if (!searchQuery.value) return stockIssues.value
  const query = searchQuery.value.toLowerCase()
  return stockIssues.value.filter((issue: StockIssue) => 
    issue.issueNumber.toLowerCase().includes(query) ||
    issue.department.toLowerCase().includes(query) ||
    issue.requestedBy.toLowerCase().includes(query) ||
    issue.description.toLowerCase().includes(query)
  )
})

// Methods
const fetchStockIssues = async () => {
  try {
    const response = await fetch('/api/stockissue')
    stockIssues.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch stock issues:', error)
  } finally {
    loading.value = false
  }
}

const saveIssue = async () => {
  try {
    const url = editingIssue.value 
      ? `/api/stockissue/${editingIssue.value.id}`
      : '/api/stockissue'
    const method = editingIssue.value ? 'PUT' : 'POST'
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })
    if (response.ok) {
      await fetchStockIssues()
      closeModal()
    }
  } catch (error) {
    console.error('Failed to save stock issue:', error)
  }
}

const editIssue = (issue: StockIssue) => {
  editingIssue.value = issue
  formData.value = { ...issue }
  showCreateModal.value = false
}

const deleteIssue = async (id: string) => {
  if (confirm('Are you sure you want to delete this stock issue?')) {
    try {
      const response = await fetch(`/api/stockissue/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        await fetchStockIssues()
      }
    } catch (error) {
      console.error('Failed to delete stock issue:', error)
    }
  }
}

const viewDetails = (id: string) => {
  router.push(`/stockissue/${id}`)
}

const closeModal = () => {
  showCreateModal.value = false
  editingIssue.value = null
  formData.value = {
    issueNumber: '',
    date: '',
    department: '',
    requestedBy: '',
    status: 'pending',
    description: ''
  }
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userEmail')
  router.push('/login')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'approved': return 'status-approved'
    case 'pending': return 'status-pending'
    case 'rejected': return 'status-rejected'
    default: return 'status-pending'
  }
}

// Lifecycle
onMounted(() => {
  fetchStockIssues()
})
</script>