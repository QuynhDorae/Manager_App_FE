<script setup>
const route = useRoute()
const { id } = route.params

const accounts = ref([])
const newEmployee = reactive({
    username: null,
    email: null,
    role: null
})
//const username=accounts.value.map((username)=>({id:username.id}))
// Mảng chứa các role cứng
const roles = [
    { value: 'USER' },
    { value: 'PM' }
]
// Hàm để gửi dữ liệu đến API
async function submit() {
    try {
        const res = await api.post('/User',
            newEmployee)
        // alert('Success')
        navigateTo('/employee/list')
        console.log('Success:', res.data)
    } catch (err) {
        // alert('Error')
        console.error('Error:', err.response)
    }
}

async function fetchDataAccount() {
    try {
        const res = await api.get('/Account/getall');
        accounts.value = res.data
    } catch (err) {
        console.error('Error fetching data:', err.response)
    }
}
onMounted(async () => {
    await fetchDataAccount()
})
</script>
<template>
    <h1 class="text-lg uppercase">
        add employee
    </h1>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn role
            </label>
            <select id="role-dropdown" v-model="newEmployee.role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Vui lòng chọn</option>
                <option v-for="(role, index) in roles" :key="role.id ?? index" :value="role.value">
                    {{ role.value }}
                </option>
            </select>
        </div>
        <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Chọn username
        </label>
        <select id="role-dropdown" v-model="newEmployee.username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Vui lòng chọn</option>
            <option v-for="(item, index) in accounts">
                {{ item.username }}
            </option>
        </select>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Password
            </label>
            <input type="password" id="password" v-model="newEmployee.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Chọn email
        </label>
        <select id="role-dropdown" v-model="newEmployee.email"
            class="mb-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Vui lòng chọn</option>
            <option v-for="(item1, index) in accounts">
                {{ item1.email }}
            </option>
        </select>
        <!-- Thêm mỗi input khác một id duy nhất và sử dụng v-model -->
        <div class="flex items-center justify-between">
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
        </div>
    </form>
</template>
