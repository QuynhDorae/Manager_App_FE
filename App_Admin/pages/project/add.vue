<script setup>
import MultiSelect from 'primevue/multiselect';
// Mảng chứa các role cứng
const roles = [
    { value: 'BA' },
    { value: 'TESTER' },
    { value: 'DEV' },
    { value: 'DA' },
    { value: 'DESIGN' },
]
const users = ref([])
const newProject = reactive({
    name: null,
    description: null
})
const selected = reactive({
    users: [],
    role: null
}) // mảng user truyền vào

async function fetchUsers() {
    try {
        const res = await api.get('/User/admin-pm/getall');
        users.value = res.data; // Gán dữ liệu vào users
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
// Gọi fetchData() khi component được mounted
onMounted(async () => {
    await fetchUsers();
});
const submit = async () => {
    const projectData = {
        project: newProject,
        role: selected.role,
        users: selected.users.map((user) => ({ id: user.id }))
    }
    // console.log(projectData.users)
    try {
        await api.post('/Project/admin', projectData)
        alert("add project thành công")
        newProject.name = ''
        newProject.description = ''
        selected.role = null
        selected.users = []
        navigateTo('/project/list')
    } catch (err) {
        console.error('Error fetching data:', err.response);
    }
}
</script>
<template>
    <h1 class="text-lg uppercase">
        Add project
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
                Chọn user
            </label>
            <MultiSelect v-model="selected.users" display="chip" :options="users" optionLabel="username"
                placeholder="Chon" :maxSelectedLabels="10" class="w-full " />
        </div>
        <div class="mb-6">
            <label for="projectNameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Name
            </label>
            <input type="text" id="projectNameInput" v-model="newProject.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="projectDescriptionInput"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Description
            </label>
            <input type="text" id="projectDescriptionInput" v-model="newProject.description"
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
