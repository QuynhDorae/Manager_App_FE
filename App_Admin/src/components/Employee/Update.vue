<script setup>
import { reactive } from 'vue'
import api from '@/composables/api'
const newEmployee = reactive({
    username: null,
    password: null,
    email: null,
    role: null
})
// Mảng chứa các role cứng
const roles = [
    { value: 'USER' },
    { value: 'PM' }
]
// Hàm để gửi dữ liệu đến API
async function submit() {
    try {
        const res = await api.post('/User', newEmployee)
        alert('Success')
        console.log('Success:', res.data)
    } catch (err) {
        alert('Error')
        console.error('Error:', err.response)
    }
}

</script>
<template>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn role
            </label>
            <select id="role-dropdown" v-model="newEmployee.role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="(role, index) in roles" :key="role.id ?? index" :value="role.value">
                    {{ role.value }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Username
            </label>
            <input type="text" id="username" v-model="newEmployee.username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Password
            </label>
            <input type="password" id="password" v-model="newEmployee.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Email
            </label>
            <input type="email" id="email" v-model="newEmployee.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <!-- Thêm mỗi input khác một id duy nhất và sử dụng v-model -->
        <div class="flex items-center justify-between">
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
        </div>
    </form>
</template>

<style scoped></style>