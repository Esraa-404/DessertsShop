<template>
  <div class="product-list-container">
    <h2>Select a Product to Edit</h2>

    <div v-if="products.length">
      <ul class="product-list">
        <li v-for="product in products" :key="product.id">
          <img v-if="product.image" :src="`http://127.0.0.1:8000${product.image}`" alt="Product" />
          <div class="info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }} EGP</p>
            <button @click="goToEdit(product.id)">Edit</button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else>Loading products...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])

onMounted(async () => {
  const res = await fetch('http://127.0.0.1:8000/products/')
  if (res.ok) {
    products.value = await res.json()
  }
})

function goToEdit(id) {
  router.push(`/edit-product/${id}`)
}
</script>

<style scoped>
.product-list-container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff0f5;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.product-list img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.product-list .info {
  flex: 1;
  margin-left: 1rem;
  text-align: left;
}

button {
  padding: 0.4rem 0.8rem;
  background-color: #ff7e5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
