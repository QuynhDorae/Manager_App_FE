<script setup>
import { ref } from 'vue'
const selectedRole = ref('') // Biến để lưu trữ role được chọn
const userName = ref('')
const passWord = ref('')
const email = ref('')
// Mảng chứa các role cứng
const roles = ref([
    { value: 'USER' },
    { value: 'PM' }
])
// Hàm để gửi dữ liệu đến API
async function submitForm() {
    const userData = {
        username: userName.value,
        email: email.value,
        password: passWord.value,
        role: selectedRole.value
    }

    try {
        const response = await fetch('http://localhost:8081/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }
        const responseData = await response.json()
        console.log('Success:', responseData)
        // Xử lý dữ liệu phản hồi ở đây
    } catch (error) {
        console.error('Error:', error)
    }
}

</script>
<template>
    <form>
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Chọn role
            </label>
            <select id="dropdown" v-model="selectedRole"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.value }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">User
                Name</label>
            <input type="text" id="usernameInput" v-model="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">PassWord
            </label>
            <input type="password" id="usernameInput" v-model="passWord"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Email
            </label>
            <input type="email" id="usernameInput" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <!-- Thêm mỗi input khác một id duy nhất và sử dụng v-model -->
        <div class="flex items-center justify-between">
            <button @click="submitForm"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Save
            </button>
        </div>
    </form>
</template>

<style scoped></style>