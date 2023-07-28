<script setup lang="ts">
import SidebarView from './view/sidebar-view.vue';
import PostListView from './view/post-list/post-list-view.vue';
import PostView from './view/post/post-view.vue';
import { ref } from 'vue'
import type { PostItem } from './definitions/post';

const showPostItem = ref<PostItem | null>(null)


</script>


<template>
<body>
    <sidebar-view/>
    <post-view 
        v-if="showPostItem"
        :item="showPostItem"
        @close="showPostItem = null"
        />
    <post-list-view 
        v-else
        @show="(item) => showPostItem = item"
        />
</body>
</template>

<style scoped>
</style>
