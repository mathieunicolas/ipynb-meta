<script setup>
const colorMode = useColorMode()
const filename = useFilename()
const fileRef = useFileRef()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

const download = () => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(fileRef.value)));
    element.setAttribute('download', filename.value);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
</script>

<template>
    <div
        class="header sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
        <div class="flex flex-row content-center space-x-4 > * + *">
            <span class="titre">IPYNB - Meta</span>
        </div>
        <div class="flex flex-row content-center">
            <UButton v-if="fileRef" @click="download()" icon="i-heroicons-cloud-arrow-up" class="self-center">Télécharger</UButton>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
                aria-label="Theme" @click="isDark = !isDark" />
        </div>
    </div>
</template>

<style scoped>
.header {
    border-bottom: 1px solid lightgray;
    padding: 1rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.titre {
    font-size: 2rem;
}
</style>