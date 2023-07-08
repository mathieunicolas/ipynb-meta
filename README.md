# IPYNB - meta

Cet outil permet facilement de modifier toutes les métadonnées d'un notebook.
Il permet également de modifier deux métadonnées stratégiques pour les cellules :

- editable - true : elle peut être modifiée ; false : elle ne peut pas être modifiée
- deletable - true : elle peut être supprimée ; false : elle ne peut pas être supprimée

## Développement
Le développement est réalisé avec le framework [Nuxt](https://nuxt.com), et les modules suivants :

- [Nuxtlabs UI](https://ui.nuxtlabs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [VueUse](https://vueuse.org)

## Fonctionnement
Le composant `DropZone` permet de gérer l'upload du fichier grâce au composable [useDropZone()](https://vueuse.org/core/useDropZone/#usedropzone). Il combine également un `<input type="file">` dont le CSS est modifié pour recouvrir toute la dropzone, et être à une opacité égale à 0, afin qu'il soit cliquable mais invisible.

Une fois le fichier chargé, son contenu est récupéré dans la variable `fileRef`, dont la clé `cells` est utilisée pour afficher le tableau des cellules, et la clé `metadata` pour la zone de texte au-dessus.

La gestion du filtre des cellules et de leur sélection est assurée par des [propiétés calculées](https://fr.vuejs.org/guide/essentials/computed.html#writable-computed) fournies par le framework [VueJS](https://vuejs.org): 
- `filteredRows` correspond aux cellules qui sont filtrées grâce au sélecteur de type (cellules Markdown, Code, Texte brut), par défaut elles sont toutes présentes
- `selectedRows` est une propriété calculée correspondant aux cellules qui sont sélectionnées. Elle est utilisée pour appliquer un changement de métadonnées à plusieurs cellules à la fois

Pour les métadonnées du fichier, elles sont également traitées via une propriété calculée, contenant une fonction `get()` ainsi qu'une fonction `set()`.
- la fonction `get()` est utilisée pour lire et afficher le contenu des métadonnées : elle utilise la fonction `JSON.stringify()` pour transformer l'objet javascript en chaîne de caractères, présente dans la zone de texte
- la fonction `set()` est utilisée pour appliquer les  modifications apportées : elle utilise `JSON.parse()` pour transformer la chaîne de caractères en objet javascript et maintenir la structure de données
## Contribuer
Toutes les contributions sont les bienvenues ! N'hésitez pas à me contacter si vous voulez vous renseigner sur le framework Nuxt.