<script setup>
</script>

<template>
    <!-- component -->
    <div
        class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div class="mb-2 p-4">
            <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
                RETRO APP</h5>
        </div>
        <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">

            <nuxt-link to="/review/list">
                <div role="button" tabindex="0"
                    class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            aria-hidden="true" class="h-5 w-5">
                            <path fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>REVIEW
                </div>
            </nuxt-link>
            <div role="button" tabindex="0"
                class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                <div class="grid place-items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        class="h-5 w-5">
                        <path fill-rule="evenodd"
                            d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>Log Out
            </div>
        </nav>
    </div>
</template>