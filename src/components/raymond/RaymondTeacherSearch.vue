<template>
  <div class="raymond-search-bar">
    <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        rounded
        solo
        validate-on-blur
        cache-items
        item-text="Description"
        item-value="API"
        label="Rechercher un professeur"
        placeholder="Commencez à écrire pour rechercher parmi les professeurs"
        prepend-icon="mdi-magnify"
        return-object
    >
      <template v-slot:item="{ item }">
        <v-list-item link :to="'/raymond/teacher/' + item.mail">{{ item.displayName }}</v-list-item>
      </template>
    </v-autocomplete>
    <v-expand-transition>
      <v-list
          v-if="model"
          class="red lighten-3"
      >
        <v-list-item
            v-for="(field, i) in fields"
            :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description = entry.displayName.length > this.descriptionLimit
            ? entry.displayName.slice(0, this.descriptionLimit) + '...'
            : entry.displayName

        return Object.assign({}, entry, {Description})
      })
    },
  },

  watch: {
    search(val) {
      // Items have already been requested
      if (this.isLoading) return

      clearTimeout(this._timerId);

      this._timerId = setTimeout(() => {


        this.isLoading = true

        // Lazily load input items
        fetch('/api/raymond/teacher/search?search=' + val)
            .then(res => res.json())
            .then(res => {
              const {count, entries} = res
              this.count = count
              this.entries = entries
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
      }, 300);
    },
  },
}
</script>