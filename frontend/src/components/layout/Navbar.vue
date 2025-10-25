<template>
  <nav class="navbar">
    <h1 class="logo">🍰 Dessert Shop</h1>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>

      <!-- روابط الإدارة تظهر فقط عند تسجيل الدخول -->
      <li v-if="isLoggedIn"><router-link to="/add-product">Add Product</router-link></li>
      <li v-if="isLoggedIn"><router-link to="/edit-product">Edit Product</router-link></li>

      <!-- Login / Logout -->
      <li v-if="isLoggedIn">
        <a href="#" @click.prevent="logout">Logout</a>
      </li>
      <li v-else>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem("user")
  window.addEventListener("storage", () => {
    isLoggedIn.value = !!localStorage.getItem("user")
  })
})

function logout() {
  localStorage.removeItem("user")
  isLoggedIn.value = false
  router.push("/login")
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #333;
}
</style>
