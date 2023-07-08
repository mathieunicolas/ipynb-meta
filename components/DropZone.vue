<script setup>
const dropZoneRef = ref()
const fileRef = useFileRef()
const filename = useFilename()
const selected = useSelected()

function onDrop(files) {
    // called when files are dropped on zone
    for (let i = 0; i < files.length; i++) {
        filename.value = files[i].name
        files[i].text().then(value => fileRef.value = JSON.parse(value)).then(value => selected.value = fileRef.value.cells.map(x => false))
    }
}

const onUpload = (event) => {
    const file = event.target.files[0]
    
    file.text().then(e => fileRef.value = JSON.parse(e))
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
    <UCard v-if="fileRef === undefined" ref="dropZoneRef" class="flex flex-row justify-center items-center cursor-pointer w-3/4 lg:w-1/2 h-48 m-auto relative hover:bg-primary-300" :ui="isOverDropZone ? { background: 'bg-primary-400' } : { background: 'bg-primary-200' }">
        <input type="file" @change="onUpload" class="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer" id="input_file" />
        <div>Déposez votre fichier IPYNB ici, ou cliquez pour parcourir vos fichiers.</div>
    </UCard>
</template>

<style scoped>

.over-drop {
  background-color: rgba(0, 128, 0, 0.26);
}

.not-over-drop {
  background-color: rgba(0, 51, 128, 0.26);
}
</style>