<script setup>
async function logoutUser() {
    try {
        const response = await api.post('auth/logout');
        useCookie('token').value = null
        useCookie('refreshToken').value = null
        useCookie('userId').value = null
        console.log(response.data);
        navigateTo('/')
    } catch (error) {
        console.error('Error logging out:', error);
        // Xử lý lỗi nếu cần
    }
}
onMounted(async () => {
    await logoutUser();
});
</script>

<template>

</template>