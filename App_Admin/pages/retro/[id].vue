<script setup>
const route = useRoute()
const { id } = route.params
const projects = ref([])
//const project = ref();
const currentRetro = ref({
    project:{}
})

async function fetchProjects() {
    try {
        const res = await api.get('/Project/getall');
        projects.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

async function init() {
    try {
        const res = await api.get(`/Retro/${id}`)
        //alert('Success')
        log(res.data)
        currentRetro.value = res.data
        console.log(currentRetro.value.project.name)
    } catch (err) {
        alert(`Cannot get the retro ${id}`)
        log(err.response)
    }
}

const submit = async () => {
    try {

    } catch (err) {

    }
}

onMounted(async () => {
    await init()
    await fetchProjects()
})
</script>
<template>
    <h1 class="text-lg uppercase">
        Update Retro
    </h1>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn Project
            </label>
            <select id="dropdown" v-model="currentRetro.project.id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <input type="text" id="retroNameInput" v-model="currentRetro.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Start Date</label>
            <input type="date" id="retroNameInput" v-model="currentRetro.startDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="usernameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                End Date</label>
            <input type="date" id="retroNameInput" v-model="currentRetro.endDate"
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
