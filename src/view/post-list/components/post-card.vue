<script setup lang="ts">
import { type PostItem } from '@/definitions/post';
import { DateTime } from "luxon"
import { computed } from 'vue';

const props = defineProps<{
  value: PostItem
}>()

const emit = defineEmits<{
    showPost: []
}>()

const beautyDate = computed(() => {
    return DateTime.fromISO(props.value.createdAt).toLocaleString({ day: "2-digit", month: "2-digit", year: "numeric" })
})


</script>

<template>
    <article class="col-12 col-md-6 tm-post">
        <hr class="tm-hr-primary">
        <span class="effect-lily tm-post-link tm-pt-60" @click="emit('showPost')">
            <div class="tm-post-link-inner">
                <img src="https://placekitten.com/640/480" height="480" width="640" alt="Image" class="img-fluid">                            
            </div>
            <h2 class="tm-pt-30 tm-color-primary tm-post-title">{{ value.title }}</h2>
        </span>                    
        <p class="tm-pt-30"> {{ value.description }} </p>
        <div class="d-flex justify-content-between tm-pt-15">      
            <span class="tm-color-primary">{{ beautyDate }}</span>
        </div>

    </article>	
</template>

<style scoped>
</style>
