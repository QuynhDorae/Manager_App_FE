<script setup>
const currentPage = shallowRef(1)

const emit = defineEmits([ 'change' ])
const props = defineProps({
    totalPages: {
        type: [ String, Number ],
        required: true
    },
    currentPage: {
        type: [ String, Number ],
        required: true
    },
    isFirst: {
        type: Boolean,
        required: true,
    },
    isLast: {
        type: Boolean,
        required: true
    }
})

const defaultClass = `bg-green-5 hover:bg-green-7 disabled:bg-green-8 text-white font-bold py-2 px-4 rounded`

watch(() => props.currentPage, (v) => currentPage.value = v, { immediate: true })

function onChange(pageNumb) {
    emit('change', pageNumb)
}
</script>

<template>
    <div class="space-x-4">
        <button @click="onChange(props.currentPage - 1)" :disabled="props.isFirst" :class="defaultClass">
            Previous
        </button>
        <span>
            {{ props.currentPage }} of {{ props.totalPages }}
        </span>
        <button @click="onChange(props.currentPage + 1)" :disabled="props.isLast" :class="defaultClass">
            Next
        </button>
    </div>
</template>