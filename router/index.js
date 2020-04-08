import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/properties',
    name: 'Properties',
    component: () => import ('../views/Properties'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/properties/new',
    name: 'AddProperty',
    component: () => import ('../views/AddProperty'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/properties/:id',
    name: 'ZProperty',
    props: true,
    component: () => import ('../components/properties/ZProperty'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import ('../views/SignUp')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import ('../views/SignIn')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
      if (!store.state.user) {
          next({
              path: '/sign-in'
          });
      } else {
          next();
      }
  } else {
      next();
  }
});
export default router;
