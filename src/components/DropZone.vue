<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>()
const fileRef = ref()
const metadatas = ['editable', 'deletable', 'trusted']
const dispMeta = ref(false)
const batchMetaEdit = ref('editable')
const batchValueEdit = ref(true)
const batchSelecEdit = ref('all')
const selected = ref([])
const filename = ref()

const countSelected = computed(() => {
  let count = 0
  for (let i = 0; i < selected.value.length; i++) {
    if (selected.value[i] == true) {
      count++
    }
  }
  return count
})

watch(selected, (newSelected) => {
  console.log(newSelected)
  if (newSelected.find(el => el === true) === undefined) {
    batchSelecEdit.value = 'all'
  } else {
    batchSelecEdit.value = 'selected'
  }
}, { deep: true })
function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  for (let i = 0; i < files.length; i++) {
    filename.value = files[i].name
    files[i].text().then(value => fileRef.value = JSON.parse(value)).then(value => selected.value = fileRef.value.cells.map(x => false))
  }
}

function metadata(cell, md) {
  return cell.metadata[md];

}

const download = (filename, text) => {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function toggle(cell, md) {
  if(cell.metadata.hasOwnProperty(md)) {
    cell.metadata[md] = !cell.metadata[md]
  } else {
    cell.metadata[md] = false
  }
}

function allCellMeta(select, metadata, value) {
  if(select === 'all') {
    for (let i = 0; i < fileRef.value.cells.length; i++) {
      fileRef.value.cells[i].metadata[metadata] = value
    }
  } else if (select === 'selected') {
    for (let i = 0; i < fileRef.value.cells.length; i++) {
      if(selected.value[i] === true) {
        fileRef.value.cells[i].metadata[metadata] = value
      }
    }
  }

}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div>
    <div  v-if="fileRef === undefined" ref="dropZoneRef" class="dropzone" :class="isOverDropZone ? 'over-drop' : 'not-over-drop'">
      <div>Déposer votre fichier IPYNB ici</div>
    </div>
    <div v-if="fileRef !== undefined" class="file-wrapper">
      <h2>Télécharger le fichier modifié</h2>
      <div>
        <label for="filename">Nom du fichier :</label>
        <input id="filename" v-model="filename" style="width: 100%; font-family: monospace; border: 0; border-left: 3px solid rgba(46, 204, 113, 0.60); padding-left: 4px; font-size: 1rem;" />
      </div>
      <div @click="download(filename, JSON.stringify(fileRef))" class="download">
        Télécharger {{ filename }}
      </div>

      <h2 @click="dispMeta = !dispMeta" style="cursor: pointer;">{{ dispMeta ? '↑ Masquer ↑' : '↓ Afficher ↓' }} les méta-données du notebook</h2>
      <div v-if="dispMeta" style="border-left: 3px solid rgba(46, 204, 113, 0.60); padding-left: 1rem;">
        <pre style="font-family: monospace" contenteditable="true" @focusout="event => fileRef.metadata = event.target.innerHTML">{{ fileRef.metadata }}</pre>
      </div>

      <div>
        <h2>Modifier les métadonnées des cellules</h2>
        <div style="margin-bottom: 1rem; display: flex; flex-direction: row; justify-content: space-around; align-items: flex-start;">
          <label for="selection">Cellules : </label>
          <select v-model="batchSelecEdit" id="selection" style="padding: 2px;">
            <option value="all">Toutes</option>
            <option value="selected">Sélectionnées ({{ countSelected }})</option>
          </select>

          <label for="metadata">Métadonnée : </label>
          <select v-model="batchMetaEdit" id="metadata" style="padding: 2px;">
            <option v-for="opt in metadatas" :value="opt">{{ opt }}</option>
          </select>
          <label for="value">Valeur : </label>

          <select v-model="batchValueEdit" id="value" style="padding: 2px;">
            <option v-for="val in [true, false]" :value="val">{{ val }}</option>
          </select>
          <div @click="allCellMeta(batchSelecEdit, batchMetaEdit, batchValueEdit)" class="editbtn"></div>
        </div>
      </div>

      <div class="cells-wrapper">
        <div v-for="(cell, index) in fileRef.cells" class="cell" :class="{ 'selected': selected[index]}" :key="index">
          <div class="cell-type" :class="cell.cell_type"></div>
          <div class="cell-source" @click="selected[index] = !selected[index]">
            {{ cell.source }}
          </div>
          <div class="properties-wrapper">
            <div class="prop" :class="'prop-' + metadata(cell, md)" v-for="md in metadatas" @click="toggle(cell, md)">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-wrapper {
  display: flex;
  flex-direction: column;
}

.cells-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.cell {
  border-radius: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background-color: #eee;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 5rem;
}

.cell:hover {
  background-color: #ddd;
}

.selected {
  background-color: #ccc;
}

.selected:hover {
  background-color: #bbb;
}

.properties-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-start;
}

.download {
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
  background-color: rgba(46, 204, 113, 0.60);
  border-radius: 0.5rem;
  cursor: pointer;
  align-self: flex-start;
}

.download:hover {
  background-color: rgba(46, 204, 113, 0.40);
}

.dropzone {
  width: 80%;
  height: 8rem;
  margin: 2rem auto;
  border: 1px dashed black;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.over-drop {
  background-color: rgba(0, 128, 0, 0.26);
}

.not-over-drop {
  background-color: rgba(0, 51, 128, 0.26);
}

.cell-type {
  border-radius: 1rem;
  min-width: 30px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cell-source {
  padding: 0.5rem;
  font-family: monospace;
  overflow-y: scroll;
  flex-grow: 2;
}

.raw {
  background-color: #f1c40f;
}

.raw::before {
  content: 'RAW';
}
.markdown {
  background-color: #2ecc71;
}

.markdown::before {
  content: 'MD'
}

.code {
  background-color: #3498db;
}

.code::before {
  content: 'PY'
}

.prop {
  width: 50px;
  height: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1px;
  cursor: pointer;
  text-align: center;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.prop:hover {
  filter: opacity(60%);
}

.prop-true {
  background-color: rgba(0, 190, 0, 0.50);
}

.prop-true::before {
  content: "TRUE";
}

.prop-false {
  background-color: rgba(200, 0, 0, 0.50);
}

.prop-false::before {
  content: "FALSE";
}

.prop-undefined {
  background-color: rgba(0, 0, 0, 0.30);
}

.prop-undefined::before {
  content: "UNDEF";
}

h2 {
  margin: 1rem 0;
}

.editbtn {
  width: 3rem;
  height: 2rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: rgba(46, 204, 113, 0.72);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
}

.editbtn::before {
  content: '>>';
}
</style>
