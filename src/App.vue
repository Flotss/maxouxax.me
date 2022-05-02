<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
      <v-container fill-height fluid>
        <transition
          name="slide-x-reverse-transition"
          mode="out-in"
          appear
          @beforeLeave="beforeLeave"
          @enter="enter"
          @afterEnter="afterEnter"
        >
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CSSMetaProperties from "@/components/CSSMetaProperties.vue";

export default {
  name: "App",
  data() {
    return {
      prevHeight: 0,
    };
  },
  computed: {
    breadCrumbsItems() {
      let items = [];
      let routePath = this.$route.path;
      let routeParts = routePath.split("/");
      routeParts = routeParts.filter((part) => part !== "");
      if (routeParts.length >= 1) {
        items.push({
          text: "Accueil",
          disabled: false,
          to: "/",
        });
        routeParts.forEach((part, index) => {
          let partRoute = this.$router.options.routes.find(
            (route) => route.path == "/" + part
          );
          let name = partRoute ? partRoute.name : part;
          let routeTo = partRoute ? partRoute.path : "/" + routeParts.slice(0, index + 1).join("/");
          items.push({
            text: name,
            disabled: routeParts[routeParts.length - 1] == part,
            to: routeTo,
            exact: true
          });
        });
      }
      return items;
    },
  },
  components: {
    Footer,
    Header,
    CSSMetaProperties
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = null;
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  min-height: 100%;
  padding: 0 !important;
}
a {
  text-decoration: none;
}
html {
  height: 100%;
  overflow-x: hidden;
  background-color: black;
  scroll-behavior: smooth;
}
body {
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
* {
  margin: 0;
  padding: 0;
}
</style>