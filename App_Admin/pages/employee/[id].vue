<script setup>
const route = useRoute()
const { id } = route.params

const currentEmployee = ref({
    email: null
})
const idAccount = ref()
const accounts = ref([])
const account = ref(null)
const roles = [
    { value: 'USER' },
    { value: 'PM' }
]



async function init() {
    try {
        const res = await api.get(`/User/user/${id}`)
        // alert('Success')
        log(res.data)
        currentEmployee.value = res.data
    } catch (err) {
        //alert(`Cannot get the employee ${id}`)
        log(err.response)
    }

    
}

const submit = async () => {
    try {
        await api.put('/User', currentEmployee.value)
        navigateTo('/employee/list')
    } catch (err) {

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
async function handleUsernameChange() {
    const selectedUsernameId = currentEmployee.value.username
    // Lấy ra id của username được chọn
    const selectedAccountId = accounts.value.find(item => item.username === selectedUsernameId)?.id
    // Gán id của tài khoản vào currentEmployee
    idAccount.value = selectedAccountId
    getByIdAccount(idAccount.value)
    console.log(idAccount.value)
}
async function getByIdAccount(id) {
    try {
        const res = await api.get(`/Account/${id}`)
        // alert('Success')
        log(res.data)
        account.value = res.data
        console.log(account)

    } catch (err) {

    }
}

onMounted(async () => {
    await init()
    await fetchDataAccount()
    await handleUsernameChange()


  //  await getByIdAccount(idAccount.value)
})
</script>

<template>
    <h1 class="text-lg uppercase">
        Update Employee
    </h1>
    <form @submit.prevent="submit">
        <div class="mb-5">
            <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Chọn role
            </label>
            <select id="role-dropdown" v-model="currentEmployee.role"
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
        <select id="role-dropdown" v-model="currentEmployee.username" @change="handleUsernameChange"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Vui lòng chọn</option>
            <option v-for="(item, index) in accounts" :key="item.id">
                {{ item.username }}
            </option>
        </select>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Password
            </label>
            <input type="password" id="password" v-model="currentEmployee.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <label for="role-dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Chọn email
        </label>
        <select id="role-dropdown" v-model="currentEmployee.email"
            class="mb-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option :value="null">Vui lòng chọn</option>
            <option>
                {{ account?.email }}
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