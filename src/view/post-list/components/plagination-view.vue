<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    itemsPerPage: number,
    allItems: number,
    modelValue: number
}>()

const emit = defineEmits<{
    "update:modelValue": [value: number]
}>()

const lastPageNumber = computed(() => {
    return Math.ceil(props.allItems / props.itemsPerPage)
})


const isStatrPage = computed(() => {
    return props.modelValue === 1
})

const isLastPage = computed(() => {
    return lastPageNumber.value === props.modelValue
})

const tileItems = computed(() => {
    if (lastPageNumber.value < 7) return Array.from({length: lastPageNumber.value}, (_, index) => index + 1)
    const arr = [...Array(6).keys()].map(el => {
        if (props.modelValue < 6 ) return el + 1
        if (props.modelValue === lastPageNumber.value) return lastPageNumber.value - 5 + el
        return props.modelValue + el - 4
    })

    return arr
})

const showEllipsis = computed(() => {
    return tileItems.value[tileItems.value.length - 1] !== lastPageNumber.value
})

function setCurrentPage(page: number) {
    emit('update:modelValue', page)
}


</script>

<template>
    <div class="row tm-row tm-mt-100 tm-mb-75">
        <div
        v-if="!(isStatrPage && isLastPage)" 
            class="tm-prev-next-wrapper">
            <span 
                class="mb-2 tm-btn tm-btn-primary tm-prev-next tm-mr-20 point"
                :class="{'disabled': isStatrPage}"
                @click="!isStatrPage ? setCurrentPage(modelValue - 1) : null"
            >Prev</span>
            <span 
                class="mb-2 tm-btn tm-btn-primary tm-prev-next point"
                :class="{'disabled': isLastPage}"
                @click="!isLastPage ? setCurrentPage(modelValue + 1) : null"
            >Next</span>
        </div>
        <div class="tm-paging-wrapper">
            <span class="d-inline-block mr-3">Page</span>
            <nav class="tm-paging-nav d-inline-block">
                <ul>
                    <li 
                        v-for="tile in tileItems"
                        :key="tile"
                        class="tm-paging-item point"
                        :class="{'active': tile === modelValue}"
                        @click="emit('update:modelValue', tile)"
                    >
                        <span class="mb-2 tm-btn tm-paging-link">{{ tile }}</span>
                    </li>
                </ul>
            </nav>
            <span v-if="showEllipsis" class="ellipsis">
                ...
            </span>
        </div>                
    </div> 
</template>

<style>
.point {
    cursor: pointer;
}
.ellipsis {
    margin-left: 10px;
    position: relative;
    top: 10px;
}
</style>