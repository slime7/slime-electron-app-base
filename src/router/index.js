import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout/Layout';
import Home from '@/views/Home';
import About from '@/views/About';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes,
});

export default router;
