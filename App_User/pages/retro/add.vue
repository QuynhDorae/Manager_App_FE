<script setup>
const projects = ref([])

const newRetro = reactive({
    project: null,
    name: null,
    startDate: null,
    endDate: null
})

async function fetchProjects() {
    try {
        const res = await api.get('/Project/getall');
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}


// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchProjects();
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
    <h1 class="text-lg uppercase">
        Add retro
    </h1>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Project
            </label>
            <select id="dropdown" v-model="newRetro.project" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">
                    {{ project.name }}
                </option>
            </select>
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Name
            </label>
            <input type="text" id="retroNameInput" v-model="newRetro.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Start Date</label>
            <input type="date" id="retroNameInput" v-model="newRetro.startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                End Date</label>
            <input type="date" id="retroNameInput" v-model="newRetro.endDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="">
        </div>
        <!-- Thêm mỗi input khác một id duy nhất và sử dụng v-model -->
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
        </div>
    </form>
</template>
