<script setup>
import { ref, onMounted, reactive } from 'vue'

// Biến để lưu trữ dữ liệu retros từ API
const retros = ref([])
// Biến để lưu trữ thông tin phân trang
const isLast = ref(false)
const isFirst = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)

// Hàm để gọi API và cập nhật retros và pageInfo
const fetchData = async (page) => {
    try {
        const response = await fetch(`http://localhost:8081/api/Retro?page=${page}`);
        if (response.ok) {
            const data = await response.json()
            retros.value = data.content
            isFirst.value = Boolean(data.first)
            isLast.value = Boolean(data.last)
            totalPages.value = Number(data.totalPages)
        } else {
            console.error('Failed to fetch data')
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchData(currentPage.value)
})


// Hàm để chuyển đến trang trước đó
// const prevPage = async () => {
//     if (isFirst.value) return
//     currentPage.value -= 1
//     await fetchData(currentPage.value)
// }

// const nextPage = async () => {
//     if (isLast.value) return
//     currentPage.value += 1
//     await fetchData(currentPage.value)
// }

const setPage = async (pageNumb) => {
    currentPage.value = pageNumb
    await fetchData(currentPage.value)
}

</script>

<template>
    <div>
        <div>LIST RETRO</div>
        <div class="mb-2">
            <button @click="addRetro"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Retro
            </button>
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
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index +
                                        1
                                        }}</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.name }}</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{
                                        retro.project.name }}</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {{ retro.startDate
                                        }}</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{
                                        retro.endDate
            }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <button @click="editRetro(retro)"
                                            class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button @click="deleteRetro(retro)"
                                            class="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Phân trang -->
        <div class="pagination">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded"
                @click="setPage(currentPage - 1)" :disabled="isFirst">Previous</button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded"
                @click="setPage(currentPage + 1)" :disabled="isLast">Next</button>
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
