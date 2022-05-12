<template>
  <div class="raymond-home d-flex justify-center align-center flex-column">
    <h2 class="mb-16">Accueil</h2>
    <div class="d-flex justify-center align-center mx-10">
      <router-link to="/raymond/teacher">Rechercher un professeur</router-link>
    </div>
  </div>
</template>

<script>
import RaymondTeacherSearch from "@/components/raymond/RaymondTeacherSearch";

export default {
  name: 'RaymondHome',
  components: {RaymondTeacherSearch},
}
</script>