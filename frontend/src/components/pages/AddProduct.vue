<template>
  <div class="product-form-container">
    <h2>Add New Product</h2>
    <form @submit.prevent="addProduct">
      <input v-model="name" placeholder="Product Name" required />
      <input v-model="price" type="number" placeholder="Price" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      
      <!-- حقل الصورة -->
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview" />

      <button type="submit">Add Product</button>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const price = ref('')
const description = ref('')
const image = ref('')
const previewImage = ref('')
const message = ref('')

// عند رفع الصورة
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      image.value = e.target.result
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function addProduct() {
  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('price', price.value)
    formData.append('description', description.value)
    if (image.value) formData.append('image', image.value)

    const res = await fetch('http://127.0.0.1:8000/products/add/', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      message.value = 'Product added successfully!'
      name.value = ''
      price.value = ''
      description.value = ''
      image.value = ''
      previewImage.value = ''
      setTimeout(() => router.push('/'), 1000)
    } else {
      message.value = 'Error adding product'
    }
  } catch (err) {
    console.error(err)
    message.value = 'Failed to connect to server'
  }
}

</script>

<style scoped>
.product-form-container {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff0f5;
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.preview {
  display: block;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #ff7e5f;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #feb47b;
}

.success {
  color: green;
  margin-top: 1rem;
}
</style>
