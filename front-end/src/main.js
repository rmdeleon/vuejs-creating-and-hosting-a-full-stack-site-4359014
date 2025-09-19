import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import NotFoudPage from './pages/NotFoudPage.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDuRVpoe1EFngDC23mcK_9FHISJmB2GHYs",
  authDomain: "vue-site-bdaf3.firebaseapp.com",
  projectId: "vue-site-bdaf3",
  storageBucket: "vue-site-bdaf3.firebasestorage.app",
  messagingSenderId: "685575162786",
  appId: "1:685575162786:web:6e7f717c04be01443980fb"
};
// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/cart',
      component: ShoppingCartPage,
    },
    {
      path: '/products',
      component: ProductsPage,
    },
    {
      path: '/products/:productId',
      component: ProductDetailPage,
    },
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoudPage
    }
  ]
}))
.mount('#app')
