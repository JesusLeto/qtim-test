<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PostCard from './components/post-card.vue';
import PlaginationView from './components/plagination-view.vue';
import * as postAPI from "@/api/posts"
import { type PostItem } from '@/definitions/post';
import {HttpError} from "@/api/http"

const postPerPage = 6

const emit = defineEmits<{
    show: [item: PostItem]
}>()


onMounted(async () => {
    isLoading.value = true
    const res = await postAPI.get()
    if (res instanceof HttpError) return
    data.value = res
    isLoading.value = false
}) 

const isLoading = ref(false)
const data = ref<PostItem[]>([])

const currentPage = ref(1)

const displayData = computed(() => {
    const rigthEl = currentPage.value * postPerPage > data.value.length ?  data.value.length : currentPage.value * postPerPage
    return data.value.slice((currentPage.value - 1) * postPerPage, rigthEl)
})
</script>

<template>
    <div class="container-fluid">
        <main class="tm-main">         
            <div class="row tm-row">
                <post-card
                    v-for="item in displayData"
                    :key="item.id"
                    :value="item"
                    @show-post="emit('show', item)"
                />
        </div>
            <plagination-view
                v-if="!isLoading"
                v-model="currentPage"
                :all-items="data.length"
                :items-per-page="postPerPage"
           />
        </main>
    </div>
</template>

<style scoped>
</style>
