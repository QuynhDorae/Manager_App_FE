<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/composables/api'

const projects = ref([])
const project = ref(null)
const retros = ref([])
const retro = ref(null)
const users = ref([])
const user = ref(null)

const newReview = reactive({
    rate: null,
    comment: null,
    reviewDate: null
})
// lấy project theo user login
const fetchProjectByUser = async (userId) => {
    try {
        const res = await api.get(`/Project/filter-user/${userId}`);
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
//lấy retro theo project
const fetchRetroByProject = async (projectId) => {
    try {
        const res = await api.get(`/Retro/project/${projectId}`);
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
//lấy user theo project 
const fetchUserByProject = async (projectId) => {
    try {
        const res = await api.get(`/User/filter-project/${projectId}`);
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData();
});
const submit = async () => {
    try {
        await api.post('/Retro/', newRetro)
        alert("add retro thành công")
    } catch (err) {
        console.error('Error creating new retro:', err.response);
    }
}
</script>
<template>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Project
            </label>
            <select id="dropdown" v-model="project"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">
                    {{ project.name }}
                </option>
            </select>
        </div>
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Retro
            </label>
            <select id="dropdown" v-model="retro"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="retro in retros" :key="retro.id" :value="retro.id">
                    {{ retro.name }}
                </option>
            </select>
        </div>
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Reviewee
            </label>
            <select id="dropdown" v-model="user"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Rate
            </label>
            <input type="number" id="retroNameInput" v-model="newReview.rate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Comment</label>
            <input type="text" id="retroNameInput" v-model="newReview.comment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Review Date</label>
            <input type="date" id="retroNameInput" v-model="newReview.reviewDate"
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