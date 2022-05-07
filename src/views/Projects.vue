<template>
  <div class="projects">
    <transition
      name="slide-x-transition"
      mode="out-in"
      appear
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Projects",
};
</script>	

<style scoped>
.projects {
  width: 100%;
  height: 100%;
}
</style>