<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Phương thức để tải lại trang
const reloadPage = () => {
    router.go() // Điều này sẽ tải lại trang hiện tại
}
const retros = ref([])
// Biến để lưu trữ thông tin phân trang
const paginationData = reactive({
    isFirst: true,
    isLast: false,
    totalPage: 1,
    currentPage: 1
})

// Hàm để gọi API và cập nhật retros và pageInfo
async function fetchData(page) {
    try {
        const res = await api.get(`/Retro/admin/?page=${page}`);
        retros.value = res.data.content

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
//xóa retro
const deleteRetro = async (retroId) => {
    try {
        const res = await api.delete(`/Retro/admin/${retroId}`);
        retros.value = res.data;
        await fetchData()
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
</script>

<template>
    <div>
        <h1 class="text-lg uppercase">
            LIST RETRO
        </h1>
        <div class="mb-2">
            <NuxtLink :to="{ name: 'retro-add' }"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Retro
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
                                        Project
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Start Date
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        End Date
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(retro, index) in retros" :key="index"
                                    class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.project?.name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.startDate }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.endDate }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <NuxtLink :to="`/retro/${retro.id}`"
                                            class="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </NuxtLink>
                                        <button @click="deleteRetro(retro.id)" class="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Phân trang -->
        <Pagination v-bind="paginationData" @change="fetchData" />
    </div>
</template>