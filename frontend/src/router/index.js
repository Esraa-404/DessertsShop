// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/pages/Home.vue'
import ConfirmOrder from '@/components/modal/ConfirmOrder.vue'
import NotFound from "@/components/pages/NotFound.vue";
import Login from '@/components/pages/Login.vue'
import AddProduct from '@/components/pages/AddProduct.vue'
import EditProduct from '@/components/pages/EditProduct.vue'
import ProductDetails from '@/components/pages/ProductDetails.vue'
import CheckoutOrder from '@/components/modal/CheckoutOrder.vue'
import EditProductList from '@/components/pages/EditProductList.vue'


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/checkout', name: 'CheckoutOrder', component: CheckoutOrder }, 
    { path: '/confirm', name: 'ConfirmOrder', component: ConfirmOrder },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
    { path: '/login', name: 'Login', component: Login }, 
    { path: '/add-product', name: 'AddProduct', component: AddProduct ,
        meta: { requiresAuth: true }  },
    { path: '/edit-product', name: 'EditProductList', component: EditProductList, meta: { requiresAuth: true } },

    { path: '/edit-product/:id', name: 'EditProduct', component: EditProduct, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound }
    
]

const router = createRouter({
    history: createWebHistory('/desseerts/'), 
    routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') // لو في مستخدم داخل بالفعل

if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // لو الصفحة محتاجة تسجيل دخول وهو مش داخل → روح للوجين
} else {
    next() // كمل عادي
}
})


export default router
