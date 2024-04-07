<script setup>
const reviews = ref([])

const projects = ref([])
const project = ref(null)

const users = ref([])
const user = ref(null)

const date = ref(null)

// Biến để lưu trữ thông tin phân trang
const paginationData = reactive({
    isFirst: true,
    isLast: false,
    totalPage: 1,
    currentPage: 1
})

// Hàm để gọi API và cập nhật reviews và pageInfo
const fetchData = async (userId) => {
    try {
        const res = await api.get(`/Review/getall-user/${userId}`);
        reviews.value = res.data
        // paginationData.currentPage = page
        // paginationData.isFirst = Boolean(res.data.first)
        // paginationData.isLast = Boolean(res.data.last)
        // paginationData.totalPages = Number(res.data.totalPages)
    } catch (err) {
        console.error('Error fetching data:', err.response)
    }
}

//hàm lấy tất cả user
async function fetchUsers() {
    try {
        const res = await api.get('/User/getall');
        users.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

//hàm lấy review theo user
async function fetchReviewsByUser(userId) {
    try {
        const res = await api.get(`/Review/user/${userId}`);
        reviews.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData(userId) //fetchReviews
    await fetchUsers()
})

// Lắng nghe sự kiện thay đổi của user
const handleUserChange = async () => {
    if (user.value) {
        await fetchReviewsByUser(user.value);
    } else {
        // Nếu không có dự án được chọn, tải lại danh sách người dùng ban đầu
        // await fetchData(currentPage.value);
    }
}

</script>

<template>
    <h1 class="text-lg uppercase">
        LIST REVIEW
    </h1>
    <div class="flex items-center justify-between mb-2">
        <div class="mb-2">
            <NuxtLink :to="{ name: 'review-add' }"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Review
            </NuxtLink>
        </div>
        <div class="ml-4">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn User
            </label>
            <select id="dropdown" v-model="user" @change="handleUserChange"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="w-full border-collapse">
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
                            <tr v-for="(review, index) in reviews" :key="index"
                                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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
                                    {{ review.reviewDate }}
                                </td>
                                <!-- <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <button @click="editReview(review)"
                                        class="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </button>
                                    <button @click="deleteReview(review)" class="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Phân trang -->
        <!-- <Pagination v-bind="paginationData" @change="fetchData" /> -->
    </div>
</template>