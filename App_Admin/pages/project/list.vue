<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Phương thức để tải lại trang
const reloadPage = () => {
    router.go() // Điều này sẽ tải lại trang hiện tại
}
const projects = ref([])
// Biến để lưu trữ thông tin phân trang
const paginationData = reactive({
    isFirst: true,
    isLast: false,
    totalPage: 1,
    currentPage: 1
})

// Hàm để gọi API và cập nhật projects và pageInfo
async function fetchData(page) {
    try {
        const res = await api.get(`/Project?page=${page}`);
        projects.value = res.data.content

        paginationData.currentPage = page
        paginationData.isFirst = Boolean(res.data.first)
        paginationData.isLast = Boolean(res.data.last)
        paginationData.totalPages = Number(res.data.totalPages)
    } catch (err) {
        console.error('Error fetching data:', err.response)
    }
}
// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData(paginationData.currentPage)
})
//xóa project
const deleteProject = async (projectId) => {
    try {
        const res = await api.delete(`/Project/${projectId}`);
        projects.value = res.data;
        await fetchData()
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
</script>

<template>
    <h1 class="text-lg uppercase" @click="reloadPage">
        LIST PROJECT
    </h1>
    <div class="mb-2">
        <NuxtLink :to="{ name: 'project-add' }"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Project
        </NuxtLink>
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
                                    Name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Description
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    User Name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Role
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Status
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(project, index) in projects" :key="index"
                                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ project.name }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ project.description }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ project.userName }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ project.role }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ project.status }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <NuxtLink :to="`/project/${project.id}`"
                                        class="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </NuxtLink>
                                    <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900">
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
