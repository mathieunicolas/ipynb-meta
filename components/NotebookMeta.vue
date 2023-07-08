<script setup>
const fileRef = useFileRef()
const metadata = computed({
    get() {
        return JSON.stringify(fileRef.value.metadata, null, '\t')
    },
    set(newValue) {
        fileRef.value.metadata = JSON.parse(newValue)
    }
})
</script>

<template>
    <UCard>
        <h1 class="text-lg font-semibold">Métadonnées du notebook</h1>
        <UTextarea v-model="metadata" autoresize />
    </UCard>
</template>