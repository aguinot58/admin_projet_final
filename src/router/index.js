import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home/index.vue';
import AddProduct from '../components/AddProduct/index.vue';
import EditProduct from '../components/EditProduct/index.vue';
import PageNotFound from '../components/PageNotFound/index.vue';
import FeaturedProducts from '../components/FeaturedProducts/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      { path:'/',component: Home },
      { path:'/products/new', component: AddProduct },
      { path:'/product/:id/edit', component: EditProduct },
      { path:'/products/featured', component: FeaturedProducts },
      { path:'/:catchAll(.*)', component: PageNotFound},
  ]
})

export default router