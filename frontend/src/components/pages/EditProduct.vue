<template>
  <div class="edit-product-page">
    <div class="form-card">
      <h2 class="title">Edit Product</h2>

      <form v-if="product" @submit.prevent="updateProduct" class="product-form">
        <label>Product Name</label>
        <input v-model="product.name" type="text" required />

        <label>Price</label>
        <input v-model="product.price" type="number" required />

        <label>Description</label>
        <textarea v-model="product.description" rows="3"></textarea>

        <button type="submit" class="update-btn">Update Product</button>
      </form>

      <p v-else class="loading">Loading...</p>
      <p v-if="message" :class="message.includes('✅') ? 'success-message' : 'error-message'">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const message = ref('')

// تحميل بيانات المنتج عند الدخول للصفحة
onMounted(async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/products/${route.params.id}/`)
    if (!res.ok) throw new Error('Failed to load product')
    product.value = await res.json()
    console.log('Loaded product:', product.value)
  } catch (err) {
    console.error(err)
    message.value = '❌ Error loading product.'
  }
})

// تحديث المنتج
async function updateProduct() {
  try {
    const res = await fetch(`http://127.0.0.1:8000/products/update/${product.value.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.value.name,
        price: product.value.price,
        description: product.value.description
      })
    })

    if (!res.ok) throw new Error('Error updating product')
    message.value = '✅ Product updated successfully!'
    setTimeout(() => router.push('/edit-products'), 800)
  } catch (err) {
    console.error(err)
    message.value = '❌ Error updating product.'
  }
}
</script>

<style scoped>
.edit-product-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #fafafa;
  min-height: 100vh;
}

.form-card {
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
}

.title {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: 600;
  font-size: 14px;
  color: #555;
}

input, textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #ff7b00;
}

.update-btn {
  background-color: #ff7b00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.update-btn:hover {
  background-color: #e56e00;
}

.loading {
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.success-message {
  text-align: center;
  color: green;
  margin-top: 15px;
}

.error-message {
  text-align: center;
  color: red;
  margin-top: 15px;
}
</style>
