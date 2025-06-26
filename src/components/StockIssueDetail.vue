<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="glass border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <button @click="goBack" class="mr-4 p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Stock Issue Details
              </h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="logout" class="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <!-- Loading State -->
      <div v-if="loading" class="animate-fade-in-up">
        <div class="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div class="animate-shimmer h-6 bg-gray-200 rounded mb-4"></div>
          <div class="animate-shimmer h-4 bg-gray-200 rounded mb-2"></div>
          <div class="animate-shimmer h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Stock Issue Info -->
      <div v-else-if="stockIssue" class="animate-fade-in-up">
        <!-- Header Card -->
        <div class="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ stockIssue.issueNumber }}</h2>
              <p class="text-gray-600">{{ stockIssue.description }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <span :class="getStatusClass(stockIssue.status)">
                {{ stockIssue.status }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 6h6m6-4a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V9z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-600">Department</p>
                  <p class="font-semibold">{{ stockIssue.department }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-secondary-50 to-accent-50 p-4 rounded-xl">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-secondary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-600">Requested By</p>
                  <p class="font-semibold">{{ stockIssue.requestedBy }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-accent-50 to-primary-50 p-4 rounded-xl">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9h6m2-6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-600">Date</p>
                  <p class="font-semibold">{{ formatDate(stockIssue.date) }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-600">Total Items</p>
                  <p class="font-semibold">{{ details.length }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Section -->
        <div class="bg-white rounded-2xl shadow-lg">
          <!-- Details Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Item Details</h3>
              <button @click="showAddDetailModal = true" class="btn-primary">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Item
              </button>
            </div>
          </div>

          <!-- Details Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="detail in details" :key="detail.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ detail.itemName }}</div>
                      <div class="text-sm text-gray-500">{{ detail.itemCode }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ detail.requestedQty }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ detail.approvedQty }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ detail.unit }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ detail.remarks }}</td>
                  <td class="px-6 py-4 text-sm font-medium space-x-2">
                    <button @click="editDetail(detail)" class="btn-secondary text-xs py-1 px-3">
                      Edit
                    </button>
                    <button @click="deleteDetail(detail.id)" class="btn-danger text-xs py-1 px-3">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="details.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No items added</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by adding an item to this stock issue.</p>
              <div class="mt-6">
                <button @click="showAddDetailModal = true" class="btn-primary">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="text-center py-4">
      <p class="text-sm text-gray-500">
        Crafted with ❤️ by <a href="https://github.com/AnnisaCode" target="_blank" class="font-semibold text-primary-600 hover:underline">AnnisaCode</a>
      </p>
    </footer>

    <!-- Add/Edit Detail Modal -->
    <div v-if="showAddDetailModal || editingDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingDetail ? 'Edit Item' : 'Add New Item' }}
        </h3>
        
        <form @submit.prevent="saveDetail" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Item Code</label>
            <input v-model="detailFormData.itemCode" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input v-model="detailFormData.itemName" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Requested Quantity</label>
            <input v-model.number="detailFormData.requestedQty" type="number" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Approved Quantity</label>
            <input v-model.number="detailFormData.approvedQty" type="number" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input v-model="detailFormData.unit" type="text" required class="form-input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <textarea v-model="detailFormData.remarks" rows="3" class="form-input"></textarea>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button type="submit" class="btn-primary flex-1">
              {{ editingDetail ? 'Update' : 'Add' }}
            </button>
            <button type="button" @click="closeDetailModal" class="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface StockIssueDetail {
  id: string;
  itemCode: string;
  itemName: string;
  requestedQty: number;
  approvedQty: number;
  unit: string;
  remarks: string;
}

interface StockIssue {
  id: string;
  issueNumber: string;
  date: string;
  department: string;
  requestedBy: string;
  status: string;
  description: string;
  details: StockIssueDetail[];
}

const router = useRouter()

// Props
const props = defineProps<{ id: string }>()

// State
const stockIssue = ref<StockIssue | null>(null)
const details = ref<StockIssueDetail[]>([])
const loading = ref(true)
const showAddDetailModal = ref(false)
const editingDetail = ref<StockIssueDetail | null>(null)

// Form data
const detailFormData = ref<Omit<StockIssueDetail, 'id'>>({
  itemCode: '',
  itemName: '',
  requestedQty: 0,
  approvedQty: 0,
  unit: '',
  remarks: ''
})

// Methods
const fetchStockIssue = async () => {
  try {
    const response = await fetch(`/api/stockissue/${props.id}`)
    if (response.ok) {
      const data: StockIssue = await response.json()
      stockIssue.value = data
      details.value = data.details || []
    }
  } catch (error) {
    console.error('Failed to fetch stock issue:', error)
  } finally {
    loading.value = false
  }
}

const saveDetail = async () => {
  try {
    const url = editingDetail.value 
      ? `/api/stockissue/${props.id}/details/${editingDetail.value.id}`
      : `/api/stockissue/${props.id}/details`
    const method = editingDetail.value ? 'PUT' : 'POST'
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detailFormData.value)
    })
    if (response.ok) {
      await fetchStockIssue()
      closeDetailModal()
    }
  } catch (error) {
    console.error('Failed to save detail:', error)
  }
}

const editDetail = (detail: StockIssueDetail) => {
  editingDetail.value = detail
  detailFormData.value = { ...detail }
  showAddDetailModal.value = false
}

const deleteDetail = async (detailId: string) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      const response = await fetch(`/api/stockissue/${props.id}/details/${detailId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        await fetchStockIssue()
      }
    } catch (error) {
      console.error('Failed to delete detail:', error)
    }
  }
}

const closeDetailModal = () => {
  showAddDetailModal.value = false
  editingDetail.value = null
  detailFormData.value = {
    itemCode: '',
    itemName: '',
    requestedQty: 0,
    approvedQty: 0,
    unit: '',
    remarks: ''
  }
}

const goBack = () => {
  router.push('/dashboard')
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userEmail')
  router.push('/login')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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
  fetchStockIssue()
})
</script>