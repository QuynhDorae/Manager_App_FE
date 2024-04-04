<script setup>
import { ref, onMounted } from 'vue'
import api from '@/composables/api'
const reviews = ref([])
const projects = ref([])
const project = ref(null)
const users = ref([])
const user = ref(null)
const date = ref(null)

// Biến để lưu trữ thông tin phân trang
const isLast = ref(false)
const isFirst = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)

// Hàm để gọi API và cập nhật reviews và pageInfo
const fetchData = async (page) => {
    try {
        const res = await api.get(`/Review?page=${page}`);
        reviews.value = res.data.content
        isFirst.value = Boolean(res.data.first)
        isLast.value = Boolean(res.data.last)
        totalPages.value = Number(res.data.totalPages)
    } catch (err) {
        console.error('Error fetching data:', err.response)
    }
}

//hàm lấy tất cả project
const fetchProject = async () => {
    try {
        const res = await api.get('/Project/getall');
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
//hàm lấy tất cả user
const fetchUser = async () => {
    try {
        const res = await api.get('/User/getall');
        users.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
//hàm lấy review theo project
const fetchReviewByProject = async (projectId) => {
    try {
        const res = await api.get(`/Review/project/${projectId}`);
        console.log(projectId)
        reviews.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

//hàm lấy review theo project
const fetchReviewByUser = async (userId) => {
    try {
        const res = await api.get(`/Review/user/${userId}`);
        reviews.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
//hàm lấy review theo project
const fetchReviewByDate = async (date) => {
    try {
        const res = await api.get(`/Review/date/${date}`);
        reviews.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData(currentPage.value)
    await fetchProject(),
        await fetchUser()
})
// Lắng nghe sự kiện thay đổi của project
const handleProjectChange = async () => {
    if (project.value) {
        await fetchReviewByProject(project.value);
    } else {
        // Nếu không có dự án được chọn, tải lại danh sách người dùng ban đầu
        // await fetchData(currentPage.value);
    }
}
// Lắng nghe sự kiện thay đổi của user
const handleUserChange = async () => {
    if (user.value) {
        await fetchReviewByUser(user.value);
    } else {
        // Nếu không có dự án được chọn, tải lại danh sách người dùng ban đầu
        // await fetchData(currentPage.value);
    }
}
// Lắng nghe sự kiện thay đổi của date
const handleDateChange = async () => {
    if (user.value) {
        await fetchReviewByDate(date.value);
    } else {
        // Nếu không có dự án được chọn, tải lại danh sách người dùng ban đầu
        // await fetchData(currentPage.value);
    }
}
const setPage = async (pageNumb) => {
    currentPage.value = pageNumb
    await fetchData(currentPage.value)
}
</script>

<template>
    <div>LIST REVIEW</div>
    <div class="flex items-center justify-between mb-2">
        <div class="mb-2">
            <button @click="addReview" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Review
            </button>
        </div>
        <div class="ml-4">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Project
            </label>
            <select id="dropdown" v-model="project" @change="handleProjectChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">
                    {{ project.name }}
                </option>
            </select>
        </div>
        <div class="ml-4">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn User
            </label>
            <select id="dropdown" v-model="user" @change="handleUserChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>
        <div class="ml-4">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Chọn Review
                Date</label>
            <input type="date" id="dropdown" v-model="date" @change="handleDateChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
    </div>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-200 border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Reviewer
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Retro
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Reviewee
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Rate
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Comment
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    ReviewDate
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review, index) in reviews" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.nameUserReviewer }}</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.nameRetro }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.nameUserReviewee }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.rate }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.comment }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ review.reviewDatex }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <button @click="editReview(review)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </button>
                                    <button @click="deleteReview(review)" class="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Phân trang -->
        <div class="pagination">
            <button @click="setPage(currentPage - 1)" :disabled="isFirst" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded">
                Previous
            </button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
            <button @click="setPage(currentPage + 1)" :disabled="isLast" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded">
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Bổ sung CSS để làm cho bảng to hơn */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
}
</style>