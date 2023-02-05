<script setup>
import DropZone from './components/DropZone.vue'
</script>

<template>
  <main>
    <h1>Modification d'un fichier IPYNB</h1>
    <p style="text-align: center">
      <em><a href="https://github.com/mathieunicolas/ipynb-meta">source</a></em> -
      <em><a href="https://github.com/nuxt-mathieunicolas/ipynb-meta/blob/main/LICENSE">licence MIT</a></em> -
      <em><a href="mailto: contact@nsi.rocks">contact</a></em>
    </p>
    <h2>Mode d'emploi</h2>
    <p>Glisser un fichier IPYNB dans la zone de dépôt, puis modifier les métadonnées associées à chaque cellule, ou à toutes les cellules en une seule fois. Il est également possible d'appliquer un changement aux cellules sélectionnées. Pour sélectionner une cellule, cliquer dessus.</p>
    <p>Les métadonnées modifiables pour chaque cellule sont <strong>(dans cet ordre)</strong>:</p>
    <ul>
      <li>editable</li>
      <li>deletable</li>
      <li>trusted</li>
    </ul>
    <DropZone />
  </main>
</template>

<style scoped>
main {
  width: 80%;
  margin: auto;
}

ul {
  list-style-position: inside;
  margin-left: 1rem;
}

h1 {
  text-align: center;
}

h2 {
  margin: 1rem 0;
}
</style>