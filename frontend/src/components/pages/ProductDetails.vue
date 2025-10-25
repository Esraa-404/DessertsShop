<template>
    <div class="container my-5">
        <div v-if="product" class="details-card">
        <img :src="product.image" class="details-img" :alt="product.name" />

        <div class="details-info">
            <h2>{{ product.name }}</h2>
            <p class="category">{{ product.category }}</p>
            <p class="price">${{ product.price.toFixed(2) }}</p>
            <p class="description">
            {{ product.description || "No description available for this item." }}
            </p>
            <router-link to="/" class="back-btn">← Back to Products</router-link>
        </div>
        </div>

        <div v-else>
        <h3>Product not found!</h3>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


import tiramisuImg from "@/assets/images/image-tiramisu-tablet.jpg";
import waffle from "@/assets/images/image-waffle-desktop.jpg";
import cremebrulee from "@/assets/images/image-creme-brulee-desktop.jpg";
import baklava from "@/assets/images/image-baklava-desktop.jpg";
import redvelvet from "@/assets/images/image-cake-desktop.jpg";
import brownie from "@/assets/images/image-brownie-desktop.jpg";
import pannacotta from "@/assets/images/image-panna-cotta-desktop.jpg";
import merngue from "@/assets/images/image-meringue-desktop.jpg";
import macaron from "@/assets/images/image-macaron-desktop.jpg";

const products = [
  { id: 1, category: "Waffle", name: "Waffle with Berries", price: 6.5, image: waffle },
  { id: 2, category: "Crème Brûlée", name: "Vanilla Bean Crème Brûlée", price: 7.0, image: cremebrulee },
  { id: 3, category: "Tiramisu", name: "Classic Tiramisu", price: 5.5, image: tiramisuImg },
  { id: 4, category: "Baklava", name: "Pistachio Baklava", price: 4.0, image: baklava },
  { id: 5, category: "Cake", name: "Red Velvet Cake", price: 4.5, image: redvelvet },
  { id: 6, category: "Brownie", name: "Salted Caramel Brownie", price: 3.0, image: brownie },
  { id: 7, category: "Panna Cotta", name: "Vanilla Panna Cotta", price: 12.0, image: pannacotta },
  { id: 8, category: "Pie", name: "Lemon Meringue Pie", price: 12.0, image: merngue },
  { id: 9, category: "Macaron", name: "Macaron Mix of Five", price: 12.0, image: macaron },
];

const route = useRoute()
const product = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  product.value = products.find(p => p.id === id)
})
</script>

<style>
.details-card {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.details-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.details-info {
  max-width: 500px;
}

.price {
  font-size: 20px;
  color: hsl(14, 86%, 42%);
  font-weight: bold;
  margin: 10px 0;
}

.back-btn {
  display: inline-block;
  margin-top: 15px;
  color: #fff;
  background: hsl(14, 86%, 42%);
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.back-btn:hover {
  opacity: 0.9;
}
</style>
