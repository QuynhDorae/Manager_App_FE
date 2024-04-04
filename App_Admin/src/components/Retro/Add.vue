<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const projects = ref([])
const project = ref({})
const retroName = ref('')
const startDate = ref('')
const endDate = ref('')
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/Project/getall');
        projects.value = response.data; // Gán dữ liệu vào users
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
        project: { id: project.value },
        name: retroName.value,
        startDate: startDate.value,
        endDate: endDate.value
    }
    try {
        await axios.post('http://localhost:8081/api/Retro/', projectData)
        alert("add retro thành công")
    } catch (error) {
    }
}
</script>
<template>
    <form>
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Chọn Project
            </label>
            <select id="dropdown" v-model="project"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">
                    {{ project.name }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Name</label>
            <input type="text" id="retroNameInput" v-model="retroName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Start Date</label>
            <input type="date" id="retroNameInput" v-model="startDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                End Date</label>
            <input type="date" id="retroNameInput" v-model="endDate"
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