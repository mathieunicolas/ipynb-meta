<script setup>
const fileRef = useFileRef()
const selectedType = ref('all')
const selected = ref([])
const sourceSize = ref(80)

const columns = [{
    label: 'Métadonnées',
    key: 'metadata'
}, {
    label: 'Type',
    key: 'cell_type'
}, {
    label: 'Source',
    key: 'source'
}]

const cell_types = [{
    name: 'Toutes',
    value: 'all',
}, {
    name: 'Markdown',
    value: 'markdown',
}, {
    name: 'Code',
    value: 'code'
}, {
    name: 'Texte Brut',
    value: 'raw'
}]

const filteredRows = computed(() => {
    return fileRef.value.cells.filter(el => {
        return el.cell_type === selectedType.value || selectedType.value === 'all'
    })
})

const togg = ref({
    editable: false,
    deletable: false,
    trusted: false
})
const toggleSelected = (prop) => {
    selected.value.forEach(el => {
        console.log(el, togg.value[prop])
        el.metadata[prop] = togg.value[prop]
    })
    togg.value[prop] = !togg.value[prop]
}

const getIcon = (cell_type) => {
    switch (cell_type) {
        case 'markdown':
            return 'i-ion-logo-markdown'
        case 'code':
            return 'i-mdi-language-python'
        case 'raw':
            return 'i-fluent-textbox-24-regular'
    }
}
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-row justify-between mb-6">
                <USelect v-model="selectedType" :options="cell_types" option-attribute="name"></USelect>
                <div>
                    Sélection ({{ selected.length }}):
                    <UButtonGroup>
                        <UButton label="Editable" @click="toggleSelected('editable')" />
                        <UButton label="Deletable" @click="toggleSelected('deletable')" />
                    </UButtonGroup>
                </div>
            </div>

            <UFormGroup label="Taille de l'extrait"
                description="Modifier la taille de l'extrait des cellules, pour faciliter leur identification ou gagner de la place.">
                <URange v-model="sourceSize" :min=0 :max=500 />
            </UFormGroup>
        </template>

        <UTable :rows="filteredRows" :columns="columns" v-model="selected">
            <template #metadata-data="{ row }">
                <div class="flex flex-row">
                    <UButtonGroup>
                        <UButton variant="soft" label="editable" @click="row.metadata.editable = !row.metadata.editable"
                            :color="row.metadata.editable ? 'green' : 'red'"
                            :class="row.metadata.editable ? '' : 'line-through'" />
                        <UButton variant="soft" label="deletable" @click="row.metadata.deletable = !row.metadata.deletable"
                            :color="row.metadata.deletable ? 'green' : 'red'"
                            :class="row.metadata.deletable ? '' : 'line-through'" />
                    </UButtonGroup>
                </div>
            </template>

            <template #cell_type-data="{ row }">
                <UIcon :name="getIcon(row.cell_type)" class="text-xl m-auto block" />
            </template>

            <template #cell_type-header="{ column }">
                <div class="text-center">{{ column.label }}</div>
            </template>

            <template #source-data="{ row }">
                <div class="whitespace-pre-wrap">{{ row.source.substring(0, sourceSize) }}</div>
        </template>
    </UTable>
</UCard></template>