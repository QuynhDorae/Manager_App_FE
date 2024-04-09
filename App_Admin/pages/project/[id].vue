<script setup>
import MultiSelect from 'primevue/multiselect';
const route = useRoute()
const { id } = route.params
// Mảng chứa các role cứng
const roles = [
    { value: 'BA' },
    { value: 'TESTER' },
    { value: 'DEV' },
    { value: 'DA' },
    { value: 'DESIGN' },
]
const users = ref([])
const currentProject = ref({
    //users: []
})
const selected = reactive({
    users: [],
    role: null
})

async function init() {
    try {
        const res = await api.get(`/Project/project/${id}`)
        //alert('Success')
        log(res.data)
        currentProject.value = res.data
        selected.users = res.data.users.map((user) => user.id)
        selected.role = res.data.role
    } catch (err) {
        alert(`Cannot get the project ${id}`)
        log(err.response)
    }
}
//hàm lấy user theo project
// async function fetchUsersByProject(projectId) {
//     try {
//         const res = await api.get(`/User/filter-project/${projectId}`);
//         console.log(projectId)
//         selected.users.value = res.data;
//     } catch (err) {
//         console.error('Error fetching data:', err.response);
//     }
// }

async function fetchUsers() {
    try {
        const res = await api.get('/User/getall');
        users.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}

const submit = async () => {
    const selectedUsers = selected.users.reduce((acc, userId) => {
        const userFromId = users.value.find((user) => user.id === userId)
        acc.push(userFromId)
        return acc
    }, [])
    const projectData = {
        project: currentProject.value,
        role: selected.role,
        users: selectedUsers
    }
    // console.log(projectData.users)
    try {
        await api.post('/Project/', projectData)
        alert("update project thành công")

        currentProject.value.name = ''
        currentProject.value.description = ''
        selected.role = null
        selected.users = []
        navigateTo('/project/list')
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

onMounted(async () => {
    await init()
    // await fetchUsersByProject()
    await fetchUsers()
})
</script>
<template>
    <h1 class="text-lg uppercase">
        Update project
    </h1>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn role
            </label>
            <select id="dropdown" v-model="selected.role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="(role, index) in roles" :key="role.id ?? index" :value="role.value">
                    {{ role.value }}
                </option>
            </select>
            <label for="userDropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            </label>
            <MultiSelect v-model="selected.users" display="chip" :options="users" optionLabel="username"
                optionValue="id" placeholder="Chon" :maxSelectedLabels="10" class="w-full " />
        </div>
        <div class="mb-6">
            <label for="projectNameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Name
            </label>
            <input type="text" id="projectNameInput" v-model="currentProject.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="projectDescriptionInput"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Description
            </label>
            <input type="text" id="projectDescriptionInput" v-model="currentProject.description"
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
