<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Mảng chứa các role cứng
const roles = ref([
    { value: 'BA' },
    { value: 'TESTER' },
    { value: 'DEV' },
    { value: 'DA' },
    { value: 'DESIGN' },
])
const users = ref([])
const project = ref({
    name: '',
    description: ''
})
const selectedUsers = ref([]) // mảng user truyền vào
const selectedRole = ref('') // Biến để lưu trữ role được chọn
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/User/getall');
        users.value = response.data; // Gán dữ liệu vào users
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData();
});
const submitForm = async () => {
    const projectData = {
        project: { name: project.value.name, description: project.value.description },
        role: selectedRole.value,
        users: [{ id: selectedUsers.value }],
    }
    console.log(projectData.users)
    try {
        await axios.post('http://localhost:8081/api/Project/', projectData)
        alert("add project thành công")
        projectName.value = ''
        projectDescription.value = ''
        selectedRole.value = null
        selectedUsers.value = []
    } catch (error) {

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
            <label for="userDropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Chọn user
            </label>
            <select id="userDropdown" v-model="selectedUsers" :multiple
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Name</label>
            <input type="text" id="projectNameInput" v-model="project.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description
            </label>
            <input type="text" id="projectDescriptionInput" v-model="project.description"
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