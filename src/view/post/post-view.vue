<script setup lang="ts">
import type { PostItem } from '@/definitions/post';
import { DateTime } from 'luxon';
import { computed } from 'vue';

const props = defineProps<{
    item: PostItem
}>()

const emit = defineEmits<{
    close: []
}>()

const beautyDate = computed(() => {
    return DateTime.fromISO(props.item.createdAt).toLocaleString({ day: "2-digit", month: "2-digit", year: "numeric" })
})

</script>

<template>
    <div class="container-fluid">
        <main class="tm-main">          
            <div class="row tm-row">
                <div class="col-12">
                    <div>
                        <span 
                            class="mb-2 tm-btn tm-btn-primary tm-prev-next tm-mr-20 point"
                            @click="emit('close')"
                            >Back</span>
                    </div>
                    <hr class="tm-hr-primary tm-mb-55">
                    <img src="https://placekitten.com/954/535" width="954" height="535" alt="Image" class="img-fluid">

                </div>
            </div>
            <div class="row tm-row">
                <div class="col-lg-8 tm-post-col">
                    <div class="tm-post-full">                    
                        <div class="mb-4">
                            <h2 class="pt-2 tm-color-primary tm-post-title">{{item.title}}</h2>
                            <p class="tm-mb-40">{{ beautyDate }}</p>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>