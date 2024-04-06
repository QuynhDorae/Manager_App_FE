<script setup>
const loginData = reactive({
    username: null,
    password: null
})

const submit = async () => {
    try {
        const res = await api.post('/auth/login', loginData)
        useCookie('token').value = res.data.token
        useCookie('refreshToken').value = res.data.refreshToken
        alert('Logged in')
    } catch (err) {
        alert('Error')
        log(err.response)
    }
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Username
            </label>
            <input type="text" id="username" v-model="loginData.username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Password
            </label>
            <input type="password" id="password" v-model="loginData.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="">
        </div>
        <button type="submit">
            Login
        </button>
    </form>
</template>