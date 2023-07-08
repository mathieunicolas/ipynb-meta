<script setup>
import NotebookMeta from '../components/NotebookMeta.vue';

const fileRef = useFileRef()
</script>


<template>
    <UContainer>
    <DropZone></DropZone>
    <NotebookMeta v-if="fileRef" class="mb-4" />
    <CellsTable v-if="fileRef" />
    </UContainer>
</template>