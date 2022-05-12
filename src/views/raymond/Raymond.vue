<template>
  <div class="raymond">
    <page-title class="mb-16">Raymond</page-title>
    <transition
        name="slide-x-reverse-transition"
        mode="out-in"
        appear
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
  name: "Raymond",
  components: {
    PageTitle
  }
}
</script>

<style scoped>
.raymond {
  width: 100%;
  height: 100%;
}
</style>