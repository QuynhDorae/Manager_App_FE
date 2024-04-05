<script setup>
const users = ref([])
const projects = ref([])
const project = ref(null)
// Biến để lưu trữ thông tin phân trang
const paginationData = reactive({
    isFirst: true,
    isLast: false,
    totalPage: 1,
    currentPage: 1
})

// Hàm để gọi API và cập nhật users và pageInfo
async function fetchData(page) {
    try {
        const res = await api.get(`/User?page=${page}`);
        users.value = res.data.content
        
        paginationData.currentPage = page
        paginationData.isFirst = Boolean(res.data.first)
        paginationData.isLast = Boolean(res.data.last)
        paginationData.totalPages = Number(res.data.totalPages)
    } catch (err) {
        console.error('Error fetching data:', err.response)
    }
}
//hàm lấy tất cả project
async function fetchProjects() {
    try {
        const res = await api.get('/Project/getall');
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

//hàm lấy user theo project
async function fetchUsersByProject(projectId) {
    try {
        const res = await api.get(`/User/filter-project/${projectId}`);
        console.log(projectId)
        users.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData(paginationData.currentPage)
    await fetchProjects()
    //  await fetchUsersByProject(projectId)
})

// Lắng nghe sự kiện thay đổi của project và gọi hàm fetchUsersByProject
const handleProjectChange = async () => {
    if (project.value) {
        await fetchUsersByProject(project.value);
    } else {
        // Nếu không có dự án được chọn, tải lại danh sách người dùng ban đầu
        // await fetchData(currentPage.value);
    }
}

//xóa user
const deleteUser = async (userId) => {
    try {
        const res = await api.delete(`/User/${userId}`);
        users.value = res.data;
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

</script>

<template>
    <h1 class="text-lg uppercase">
        LIST EMPLOYEE
    </h1>
    <div class="flex items-center justify-between mb-2">
        <div>
            <NuxtLink :to="{ name: 'employee-add' }" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Employee
            </NuxtLink>
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
                                    UserName
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Email
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Project
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Role
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ user.username }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ user.email }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ user.project }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ user.role }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <button @click="editUser(user.id)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </button>
                                    <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
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
        <Pagination v-bind="paginationData" @change="fetchData" />
    </div>
</template>
