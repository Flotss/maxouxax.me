import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/projects',
    name: 'Projets',
    component: () => import('../views/Projects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const BASE_TITLE = "MAXOUXAX — "

router.beforeEach((to, from, next) => {
  document.title = BASE_TITLE + to.name;
  NProgress.start();
  next();
});

router.afterEach(to => {
  NProgress.done();
});

export default router
